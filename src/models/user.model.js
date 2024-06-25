import mongoose, {Schema, SchemaType} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true,
            lowercase: true,
            trim: true, // spaces vgara remove kr dega 
            index: true
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: [true, 'fullName is required'],
            trim: true, 
            index: true
        },
        avatar:{
            type: String, //cloudinary service use krnege ,cloudinary url
            required: [true, 'avatar is required']
        },
        coverImage:{
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10) // 10 here is number of rounds
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)