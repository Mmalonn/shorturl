const express=require('express');
const { loginForm, registerForm, registerUser, confirmarCuenta, loginUser, cerrarSesion } = require('../controllers/authController');
const router=express.Router();
const {body}=require("express-validator");

router.get("/login",loginForm);
router.get("/register",registerForm);
router.get("/confirmar/:token", confirmarCuenta);


router.post("/register",[
    body("userName","ingrese un nombre valido").trim().notEmpty().escape(),
    body("email","ingrese un email valido").trim().isEmail().normalizeEmail(),
    body("password","ingrese contraseña de 6 caracteres o mas")
        .trim()
        .isLength({min:6})
        .escape()
        .custom((value, {req})=>{
            if(value !== req.body.repassword){
                throw new Error("No coinciden las contraseñas");
            }else{
                return value;
            }
        })        
],registerUser);



router.post("/login",[
    body("userName","ingrese un nombre valido").trim().notEmpty().escape(),
    body("password","ingrese contraseña de 6 caracteres o mas")
        .trim()
        .isLength({min:6})
        .escape()
], loginUser)

router.get("/logout", cerrarSesion);



module.exports = router;