const {nanoid}=require("nanoid");
const User = require("../models/User");

const loginForm=(req,res)=>{
    res.render("login");
}
const registerForm=(req,res)=>{
    res.render("register");
}

const registerUser= async(req,res)=>{
    console.log(req.body);
    const {userName,email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if (user) throw new Error ("ya existe usuario");
        user = new User({userName,email,password, tokenConfirm:nanoid()});
        await user.save();
        res.send("usuario "+userName+" creado")
    }catch(error){
        res.send(error.message);
    }

}

module.exports={
    loginForm,
    registerForm,
    registerUser
}