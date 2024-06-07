import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';
import os from 'os';
import mkdirp from 'mkdirp';

const foodRouter = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(os.tmpdir(), 'uploads'); // Updated path
mkdirp.sync(uploadDir); // Create the uploads directory if it doesn't exist

// Image Storage Engine (Saving Image to /tmp/uploads folder & rename it)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
