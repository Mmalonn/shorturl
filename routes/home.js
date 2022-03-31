const express=require('express');
const { leerUrls } = require('../controllers/homeController');
const router=express.Router();





router.get("/",leerUrls)


module.exports = router;
