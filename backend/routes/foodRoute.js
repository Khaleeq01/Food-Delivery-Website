import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '/tmp/uploads'; // Use /tmp directory
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Your other route handlers using the upload middleware
// Example:
router.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

export default router;
