const bcrypt = require("bcryptjs/dist/bcrypt");
const {nanoid}=require("nanoid");
const User = require("../models/User");
const {validationResult}=require("express-validator");


const loginForm=(req,res)=>{
    res.render("login");
}
const registerForm=(req,res)=>{
    res.render("register");
}

const registerUser= async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    const {userName,email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if (user) throw new Error ("ya existe usuario");
        user = new User({userName,email,password, tokenConfirm:nanoid()});
        await user.save();
        res.json("usuario "+userName+" creado")
    }catch(error){
        res.send(error.message);
    }
}

const confirmarCuenta=async(req,res)=>{
    const {token}=req.params;
    try{
        const user=await User.findOne({tokenConfirm:token});
        if(!user) throw new Error("no existe el token");
        user.cuentaConfirmada=true;
        user.tokenConfirm=null;
        await user.save();
        res.redirect("/auth/login");
    }catch (error){
        res.send(error.message);
    }
}

const login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    const {userName,password}=req.body;
    try{
        const user=await User.findOne({userName:userName});
        if(!user) throw new Error ("no existe el usuario");
        if (!user.cuentaConfirmada) throw new Error("falta confirmar la cuenta");
        if (!(await user.comparePassword(password))) throw new Error("contraseña incorrecta");
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.send(error.message);
    }
}

module.exports={
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    login
}