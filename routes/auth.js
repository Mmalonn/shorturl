const express=require('express');
const { loginForm, registerForm, registerUser, confirmarCuenta } = require('../controllers/authController');
const router=express.Router();

router.get("/login",loginForm);
router.get("/register",registerForm);
router.post("/register",registerUser)
router.get("/confirmar/:token", confirmarCuenta);




module.exports = router;