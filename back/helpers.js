require('dotenv').config();
const {
  format
} = require('date-fns');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const sharp = require('sharp');
const fileUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

async function processAndSaveFile(uploadedFile) {
  const savedFileName = `${uuid.v1()}.jpg`;
  await fs.ensureDir(fileUploadPath);
  const finalFile = sharp(uploadedFile.data);
  const FileInfo = await finalFile.metadata();

  if (FileInfo.width > 100) {
    finalFile.resize(150);
  }
  if (FileInfo.height > 150) {
    finalFile.resize(150);
  }

  await finalFile.toFile(path.join(fileUploadPath, savedFileName));
  console.log('holi');
  return savedFileName;
}
async function deleteFile(imagePath) {
  await fs.unlink(path.join(fileUploadPath, imagePath));
}

function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}

function randomString(size = 20) {
  return crypto.randomBytes(size).toString('hex').slice(0, size);
}
async function sendEmail({
  email,
  title,
  content
}) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'raul_eje@hotmail.com',
    subject: title,
    text: content,
    html: `<div>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}

function formatDateToDB(date) {
  return format(date, 'MM-dd-yyyy');
}

function search(queryParams) {


  let query = `SELECT * FROM presentations`;
  const params = [];

  const {
    city,
    category,
    event
  } = queryParams;

  if (city || category || event) {
    query = `${query} WHERE`;
    const conditions = [];
    if (city) {
      conditions.push(`city=?`);
      params.push(city);
    }
    if (category) {
      conditions.push(`category=?`)
      params.push(category)
    }
    if (event) {
      conditions.push(`event=?`)
      params.push(event)
    }
    query = `${query} ${conditions.join(` AND `)}`

  }
  return {
    query,
    params
  }
}

module.exports = {
  search,
  sendEmail,
  generateError,
  randomString,
  processAndSaveFile,
  deleteFile,
  formatDateToDB
};