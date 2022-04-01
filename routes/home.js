const express=require('express');
const { leerUrls, agregarUrl, eliminarUrl } = require('../controllers/homeController');
const urlValidar = require('../middlewares/urlValida');
const router=express.Router();





router.get("/",leerUrls);
router.post("/",urlValidar, agregarUrl);
router.get("/eliminar/:id", eliminarUrl);


module.exports = router;
