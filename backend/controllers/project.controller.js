const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const { generatePDF, generateHTML } = require('../utils/fileGenerator');

// OAuth2 client setup for Google
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google Auth Route: Step 1 - Redirect to Google Auth
exports.googleAuth = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Needed to get a refresh token as well
    scope: ['https://www.googleapis.com/auth/drive.file'], // Google Drive scope
  });
  console.log('Redirecting to Google Auth URL:', authUrl);  // Debugging
  res.redirect(authUrl);
};

// Google Auth Callback: Step 2 - Get Access Token
exports.googleAuthCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.log('❌ Missing authorization code');
    return res.status(400).send('Missing authorization code');
  }

  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens); // Store the access token

    // Optionally, store the token in your database or session
    console.log('✅ OAuth successful. Tokens:', tokens); // Debugging

    res.json({ message: 'OAuth successful', tokens });
  } catch (err) {
    console.error('❌ Error during OAuth2 callback:', err);
    res.status(500).send('OAuth2 callback error');
  }
};

// Helper function to refresh the access token if it has expired
const refreshAccessToken = async () => {
  try {
    const { tokens } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(tokens);  // Set refreshed credentials
    console.log('✅ Token refreshed successfully:', tokens);  // Debugging
    return tokens;
  } catch (err) {
    console.error('❌ Failed to refresh access token:', err);
    throw new Error('Failed to refresh access token');
  }
};

// Download Project File (PDF/HTML)
exports.downloadProject = async (req, res) => {
  const { projectId, fileType } = req.params;

  console.log('➡️ Download route hit with:', projectId, fileType);

  // Validate the project ID
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    console.log('❌ Invalid project ID');
    return res.status(400).send('Invalid project ID');
  }

  try {
    // Retrieve project from the database
    const project = await Project.findById(projectId);
    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).send('Project not found');
    }

    console.log('✅ Project found:', project.title);

    // Generate file path based on file type (PDF or HTML)
    let filePath, mimeType;
    if (fileType === 'pdf') {
      filePath = await generatePDF(project); // Ensure it's resolved correctly
      mimeType = 'application/pdf';
    } else if (fileType === 'html') {
      filePath = await generateHTML(project); // Ensure it's resolved correctly
      mimeType = 'text/html';
    } else {
      console.log('❌ Invalid file type');
      return res.status(400).send('Invalid file type. Use "pdf" or "html".');
    }

    console.log('📁 Generated file at:', filePath);

    // Check if the file exists before download
    if (!fs.existsSync(filePath)) {
      console.log('❌ File not found at:', filePath);
      return res.status(500).send('File not found');
    }

    // Serve the generated file for download
    res.download(filePath, path.basename(filePath), (err) => {
      if (err) {
        console.error('❌ Error during file download:', err.message);
        return res.status(500).send('Download error');
      }

      // Clean up the file after serving it
      fs.unlink(filePath, () => {});
    });

  } catch (error) {
    console.error('❌ Error in downloadProject:', error.message);
    return res.status(500).send('Server error');
  }
};

// Upload the file to Google Drive
exports.uploadToUserDrive = async (req, res) => {
  const { projectId, fileType } = req.params;
  const { access_token } = req.body;

  // Check if the access token is provided in the request
  if (!access_token) {
    console.log('❌ Access token not provided');
    return res.status(401).send('Access token required');
  }

  // Set the OAuth2 credentials for Google API client
  oauth2Client.setCredentials({ access_token });

  try {
    // Check if the token is expired
    if (oauth2Client.credentials.expiry_date <= Date.now()) {
      console.log('❌ Access token expired, refreshing...');
      const refreshedTokens = await refreshAccessToken();
      oauth2Client.setCredentials(refreshedTokens);
    }

    // Retrieve the project from the database
    const project = await Project.findById(projectId);
    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).send('Project not found');
    }

    // Generate the file content (PDF or HTML)
    let filePath;
    if (fileType === 'pdf') {
      filePath = await generatePDF(project); // Ensure it's resolved correctly
    } else if (fileType === 'html') {
      filePath = await generateHTML(project); // Ensure it's resolved correctly
    } else {
      return res.status(400).send('Invalid file type. Use "pdf" or "html".');
    }

    const mimeType = fileType === 'pdf' ? 'application/pdf' : 'text/html';

    console.log('📁 Uploading file from path:', filePath);

    // Check if the file exists before uploading
    if (!fs.existsSync(filePath)) {
      console.log('❌ File not found at:', filePath);
      return res.status(500).send('Generated file not found');
    }

    // Create a Google Drive instance
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Upload the file to Google Drive
    const file = await drive.files.create({
      resource: { name: `${project.title}.${fileType}` },
      media: { mimeType, body: fs.createReadStream(filePath) },
      fields: 'id',
    });

    console.log('✅ File uploaded successfully. File ID:', file.data.id); // Debugging

    // Clean up the local file after uploading
    fs.unlink(filePath, () => {});

    // Send the response with the Google Drive link
    res.json({
      message: 'File uploaded to Google Drive successfully',
      publicUrl: `https://drive.google.com/file/d/${file.data.id}/view`,
    });
  } catch (err) {
    console.error('❌ Upload to Google Drive failed:', err);
    res.status(500).send('Upload failed');
  }
};
