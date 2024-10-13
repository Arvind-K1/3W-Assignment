import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    socialHandle: {
        type: String,
        required: true,
    },
    images: [String],
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select : false
    }
},{
    timestamps: true
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods = {
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generateJWTToken: function(){
        return jwt.sign({
            id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        });
    },
}

const User = mongoose.model('User',userSchema);

export default User;