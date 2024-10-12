import express from "express";
import multer from "multer";

import { register, login, getUsers } from '../controllers/auth.controller.js';
import { uploadImages } from '../controllers/user.controller.js';
import { isLoggedIn } from "../middlewares/auth.middleware.js";


// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now()+'-'+file.originalname),
});

const upload = multer({ storage });

//routes
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/upload', isLoggedIn, upload.array('images', 10), uploadImages);
router.get('/users', isLoggedIn, getUsers);

export default router;