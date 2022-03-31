const mongoose=require("mongoose");
const {nanoid}=require("nanoid");
const {Schema}=mongoose;

const urlSchema= new Schema({
    origin:{
        type:String,
        unique:true,
        required:true
    },
    shortURL:{
    type:String,
    unique:true,
    default:nanoid(6)
    }
})