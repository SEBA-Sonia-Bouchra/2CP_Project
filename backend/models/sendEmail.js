const nodemailer = require('nodemailer');

// ✅ Create the transporter once
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'binaateam.dz@gmail.com',  // ⬅️ your app Gmail here (fixed, not dynamic!)
    pass: 'ojhs numi ieoh gsxo',          // ⬅️ app password generated from Google (the one of 2steps verr)
  },
});

/**
 * Sends an email
 * @param {string[]} to - List of recipient emails
 * @param {string} subject - Email subject
 * @param {string} text - Email body (text)
 * @param {object} sender - Sender object { firstname, lastname, email }
 */

async function sendEmail(to, subject, text, sender) {
  const mailOptions = {
    from: `"${sender.firstname} ${sender.lastname}" <binaateam.dz@gmail.com>`,
    // ⬆️ Will show sender's name but really sent from your-app-email
    to: [...to].join(','),   // recipient's email (string)
    subject: subject,
    text: `${text.trim()}\n\nSender's email: ${sender.email}`,  // Optionally add sender's real email inside body
    replyTo: sender.email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    throw new Error(`Failed to send email to ${to}: ${error.message}`);
  }
}

module.exports = sendEmail;
