const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/', upload.array('photos'), (req, res) => {
  try {
    const { tip } = req.body;
    const photos = req.files.map(file => `/uploads/${file.filename}`);
    res.status(201).json({ tip, photos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to share experience' });
  }
});
module.exports = router;