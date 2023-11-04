
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

const upload = multer({ dest: '/tmp' });

const handler = nextConnect()
  .use(upload.single('resume'))
  .post(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume file uploaded.' });
    }

    const filePath = path.join('/tmp', req.file.filename);
    let parsedText;

    try {
      if (req.file.mimetype === 'application/pdf') {
        // If the file is a PDF, use pdf-parse to extract text
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        parsedText = data.text;
      } else {
        // For other file types, read as plain text
        parsedText = fs.readFileSync(filePath, 'utf8');
      }

      // TODO: Here, you would likely want to further process the extracted text
      // or store it in your database.

      // Make sure to delete the file after parsing to avoid clutter
      fs.unlinkSync(filePath);

      res.status(200).json({ message: 'Resume uploaded and parsed', text: parsedText });
    } catch (error) {
      // In case of an error, ensure we delete the temp file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(500).json({ message: 'Error parsing the resume', error: error.message });
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
