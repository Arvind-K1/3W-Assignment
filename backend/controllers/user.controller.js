import cloudinary from '../config/cloudinary.js';
import User from '../models/user.model.js';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {AppError} from '../utils/appError.js';

export const uploadImages = asyncHandler( async (req, res) => {
    const { name, socialHandle } = req.body;
    const uploadedImages = [];

    for(const file of req.files){
        const result = await cloudinary.uploader.upload(file.path);
        uploadedImages.push(result.secure_url);
    }

    const user = new User({ name , socialHandle, images: uploadImages });

    if(!user){
        return next(new AppError("User not created",500))
    }
    await user.save();

    res.status(201).json({
        status: 'success',
        data: user
    })
})