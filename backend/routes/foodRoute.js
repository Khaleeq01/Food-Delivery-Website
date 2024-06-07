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

router.get('/list', async (req, res) => {
    try {
        const foods = await Food.find(); // Fetch all food items from the database
        res.status(200).json(foods); // Respond with the fetched food items
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food list', error });
    }
});

export default router;
