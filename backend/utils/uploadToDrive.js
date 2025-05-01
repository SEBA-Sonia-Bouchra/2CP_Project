const fs = require('fs');
const { google } = require('googleapis');

const uploadToGoogleDrive = async (filePath, projectTitle, mimeType) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_API_KEYFILE,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const driveService = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: `${projectTitle}.${mimeType === 'application/pdf' ? 'pdf' : 'html'}`,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Must be set in .env
  };

  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };

  const file = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return file.data.id;
};

module.exports = uploadToGoogleDrive;
