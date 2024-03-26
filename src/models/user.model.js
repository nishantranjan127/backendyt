import mongoose,{Schema} from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    fullname:{
        type:string,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:string,
        required:true,
       
    },
    coverImage:{
        type:string,
        
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:string,
        required:[true,'it is required'],
       
    },
    refreshToke:{
        type:string
    }

},
{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}



export const user=mongoose.model("User",userSchema)