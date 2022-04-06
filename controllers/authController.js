
const bcrypt = require("bcryptjs/dist/bcrypt");
const {nanoid}=require("nanoid");
const User = require("../models/User");
const {validationResult}=require("express-validator");



const loginForm=(req,res)=>{
    res.render("login");
}


const loginUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash("mensajes",errors.array());
        return res.redirect("/auth/login");
    }
    const {userName,password}=req.body;
    try{
        const user=await User.findOne({userName:userName});
        if(!user) throw new Error ("no existe el usuario");
        if (!user.cuentaConfirmada) throw new Error("falta confirmar la cuenta");
        if (!(await user.comparePassword(password))) throw new Error("contraseña incorrecta");
        req.login(user,function(err){
            if(err) throw new Error("error al crear la sesion");
            return res.redirect("/");
        })
    }catch(error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/auth/login")
    }
}


const registerForm=(req,res)=>{
    res.render("register");
}

const registerUser= async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash("mensajes",errors.array());
        return res.redirect("/auth/register");
    }
    const {userName,email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if (user) throw new Error ("ya existe usuario");
        user = new User({userName,email,password, tokenConfirm:nanoid()});
        await user.save();
        return res.redirect("/auth/login")
    }catch(error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/auth/register")
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
        req.flash("mensajes",{msg:"cuenta verificada, ya puedes ingresar"});
        return res.redirect("/auth/login");
    }catch (error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/auth/login")
    }
}

const cerrarSesion=(req,res)=>{
    req.logout()
    return res.redirect("/auth/login");
}



module.exports={
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
    cerrarSesion
}