const ExcelJS = require('exceljs');
const path = require('path');

const EXCEL_FILE = path.join(__dirname, '..', 'submissions_record.xlsx');

async function getOrCreateSheet(workbook, name, columns) {
  let worksheet = workbook.getWorksheet(name);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(name);
    worksheet.columns = columns;
    worksheet.getRow(1).font = { bold: true };
  }
  return worksheet;
}

async function recordToExcel({ fullName, email, phone, message }) {
  const workbook = new ExcelJS.Workbook();
  const fs = require('fs');

  if (fs.existsSync(EXCEL_FILE)) {
    await workbook.xlsx.readFile(EXCEL_FILE);
  }

  const worksheet = await getOrCreateSheet(workbook, 'Submissions', [
    { header: 'Full Name', key: 'fullName', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Message', key: 'message', width: 50 },
    { header: 'Submitted At', key: 'submittedAt', width: 25 },
  ]);

  worksheet.addRow({
    fullName,
    email,
    phone,
    message,
    submittedAt: new Date().toLocaleString(),
  });

  await workbook.xlsx.writeFile(EXCEL_FILE);
}

const NEWSLETTER_FILE = path.join(__dirname, '..', 'newsletter_subscribers.xlsx');

async function recordNewsletterToExcel({ email }) {
  const workbook = new ExcelJS.Workbook();
  const fs = require('fs');

  if (fs.existsSync(NEWSLETTER_FILE)) {
    await workbook.xlsx.readFile(NEWSLETTER_FILE);
  }

  const worksheet = await getOrCreateSheet(workbook, 'Subscribers', [
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Subscribed At', key: 'subscribedAt', width: 25 },
  ]);

  worksheet.addRow({
    email,
    subscribedAt: new Date().toLocaleString(),
  });

  await workbook.xlsx.writeFile(NEWSLETTER_FILE);
}

module.exports = { recordToExcel, recordNewsletterToExcel };
