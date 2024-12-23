const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const archiver = require('archiver');

// Create a zip archive of the mochawesome-report directory
const createZipArchive = (folderPath, outputZipPath) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Zip file created: ${outputZipPath} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.directory(folderPath, false); // Add all folder contents to the zip
    archive.finalize();
  });
};

// Send the email with the zip attachment
const sendEmail = async (subject, body, attachmentPath) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587, // 587 or 465
    secure: false,
    auth: {
      user: 'c2d89fda2ad1a5',
      pass: '151d8e760d2d7c',
    },
  });

  try {
    const mailOptions = {
      from: '"Cypress Test Reporter" <reportsender@example.com>',
      to: 'bryan.lopes89@gmail.com',
      subject: subject,
      text: body,
      attachments: attachmentPath
        ? [
            {
              filename: path.basename(attachmentPath), // Zip file name
              path: attachmentPath,
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

// Zip and send the report
(async () => {
  const reportDir = path.resolve(__dirname, '../../../mochawesome-report');
  const zipPath = path.resolve(__dirname, '../../../mochawesome-report.zip');

  if (!fs.existsSync(reportDir)) {
    console.error(`Report directory not found: ${reportDir}`);
    process.exit(1);
  }

  try {
    // Create a zip file of the report directory
    await createZipArchive(reportDir, zipPath);

    // Send the zip file via email
    const subject = 'Cypress Test Report';
    // Add more stuff to the body?
    const body = `
      Hi,

      The Cypress tests have completed. Please find the attached report for details.

      Best regards,
      Cypress Test Reporter
    `;

    await sendEmail(subject, body, zipPath);
    console.log('Report email sent successfully.');
  } catch (error) {
    console.error('Failed to process and send the report:', error);
  } finally {
    // Clean up the zip file after sending the email
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
      console.log('Temporary zip file deleted.');
    }
  }
})();
