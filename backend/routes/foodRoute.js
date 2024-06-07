import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer configuration
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

// Example route for file upload
router.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// Route for getting food list
router.get('/list', (req, res) => {
    // Placeholder response, replace with actual database query
    res.status(200).json({ message: 'This is the food list endpoint' });
});

export default router;
