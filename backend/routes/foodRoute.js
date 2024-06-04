import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
// Import required modules for handling the temporary directory
import path from 'path';
import os from 'os';
import mkdirp from 'mkdirp';

const foodRouter = express.Router();

// Ensure the upload directory exists
// Changes: Set the upload directory to use os.tmpdir() and ensure the directory exists
const uploadDir = path.join(os.tmpdir(), 'uploads');
mkdirp.sync(uploadDir); // Create the uploads directory if it doesn't exist

// Image Storage Engine (Saving Image to /tmp/uploads folder & rename it)
const storage = multer.diskStorage({
    // Changes: Set the destination to the writable temporary directory
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    // Use the current timestamp combined with the original filename for unique filenames
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
