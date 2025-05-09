const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const stripHtmlTags = require('./stripHtml'); 

const downloadsPath = path.join(__dirname, '../downloads');
if (!fs.existsSync(downloadsPath)) fs.mkdirSync(downloadsPath, { recursive: true });

const sanitizeTitle = (title) => (title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'untitled');

// const generatePDF = (project) => {
//     return new Promise((resolve, reject) => {
//       const safeTitle = project.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'untitled';
//       const filePath = path.join(downloadsPath, `${safeTitle}.pdf`);
//       const doc = new PDFDocument();
  
//       const writeStream = fs.createWriteStream(filePath);
//       doc.pipe(writeStream);
  
//       doc.fontSize(25).text(project.title, { align: 'center' });
//       doc.fontSize(18).text(project.description, { align: 'center' });
  
//       project.sections.forEach((section) => {
//         doc.addPage()
//           .fontSize(20).text(`Section: ${section.title}`, { align: 'left' })
//           .fontSize(12).text(`Content: ${section.content}`, { align: 'left' })
//           .text(`Dimension: ${section.dimension}`, { align: 'left' });
//       });
  
//       doc.end();
  
//       writeStream.on('finish', () => resolve(filePath));
//       writeStream.on('error', reject);
//     });
//   };

const generatePDF = (project) => {
  return new Promise((resolve, reject) => {
    const safeTitle = project.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'untitled';
    const filePath = path.join(downloadsPath, `${safeTitle}.pdf`);
    const doc = new PDFDocument();

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(25).text(stripHtmlTags(project.title), { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(stripHtmlTags(project.description), { align: 'left' });

    project.sections.forEach((section) => {
      doc.addPage()
        .fontSize(20).text(`Section: ${stripHtmlTags(section.title)}`, { align: 'left' })
        .moveDown()
        .fontSize(12).text(`Content: ${stripHtmlTags(section.content)}`, { align: 'left' })
        .text(`Dimension: ${stripHtmlTags(section.dimension)}`, { align: 'left' });
    });

    doc.end();

    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

// const generateHTML = (project) => {
//   const safeTitle = sanitizeTitle(project.title);
//   const filePath = path.join(downloadsPath, `${safeTitle}.html`);
//   const html = `
//     <html>
//       <head><title>${project.title}</title></head>
//       <body>
//         <h1>${project.title}</h1>
//         <p>${project.description}</p>
//         <h2>Sections</h2>
//         ${project.sections.map(s => `
//           <div>
//             <h3>${s.title}</h3>
//             <p>${s.content}</p>
//             <p>Dimension: ${s.dimension}</p>
//           </div>`).join('')}
//       </body>
//     </html>`;

//   fs.writeFileSync(filePath, html, 'utf8');
//   return filePath;
// };
const generateHTML = (project) => {
  const safeTitle = sanitizeTitle(project.title);
  const filePath = path.join(downloadsPath, `${safeTitle}.html`);

  const mediaHtml = project.media.map(src => `<img src="${src}" alt="Media" style="max-width: 100%; height: auto;" />`).join('');
  const referencesHtml = project.references.map(ref => `<li>${ref.title}</li>`).join('');

  const html = `
    <html>
      <head><title>${project.title}</title></head>
      <body>
        <h1>${project.title}</h1>
        <p>${project.description}</p>

        <h2>Sections</h2>
        ${project.sections.map(s => `
          <div>
            <h3>${s.title}</h3>
            <p>${s.content}</p>
            <p><strong>Dimension:</strong> ${s.dimension}</p>
          </div>`).join('')}

        <h2>References</h2>
        <ul>${referencesHtml}</ul>
      </body>
    </html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  return filePath;
};


module.exports = { generatePDF, generateHTML };
