const mongoose=require("mongoose");
const {schema}=mongoose;

const userSchema=new schema({
    userName:{
        type: String,
        lowercase:true,
        required:true
    },
    email:{
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true
    },
    tokenConfirm:{
        type:String,
        default:null
    },
    cuentaConfirmada:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("User", userSchema);
