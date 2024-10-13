import User from '../models/user.model.js';
import asyncHandler from '../middlewares/asyncHandler.middleware.js';

import {AppError} from '../utils/appError.js';

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7*24*60*60*1000,
    httpOnly: true
};

const register = asyncHandler( async (req, res) => {
    const { name, email, password, socialHandle} = req.body;
    
    if(!name || !email || !password || !socialHandle){
        return next(new AppError('Please fill all the fields',400));
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        return next(new AppError('Email already exists',400));
    }

    const user = await User.create({
        name,
        email,
        password,
        socialHandle
    });

    if(!user){
        return next(new AppError('Failed to create user',500));
    }

    await user.save();

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User registered Successfully',
        user
    })
});

const login = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new AppError('Please fill all the fields',400));
    }

    const user = await User.findOne({email}).select('+password');

    if (!(user && (await user.comparePassword(password)))) {
        return next(
          new AppError('Email or Password do not match or user does not exist', 401)
        );
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token',token,cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User logged in successfully',
        user
    })
    
});

const getUsers = asyncHandler( async (req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            message: 'Access denied'
        })
    }

    const users = await User.find({});
    res.status(200).json({
        success: true,
        data: users
    });
});

export {
    register,
    login,
    getUsers
}