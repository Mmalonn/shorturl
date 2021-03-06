
const express=require('express');
const { redirect } = require('express/lib/response');
const { leerUrls, agregarUrl, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento} = require('../controllers/homeController');
const { formPerfil, editarPerfil } = require('../controllers/perfilController');
const urlValidar = require('../middlewares/urlValida');
const verificarUsuario = require('../middlewares/verificarUsuario');
const router=express.Router();





router.get("/",verificarUsuario,leerUrls);
router.post("/",verificarUsuario,urlValidar, agregarUrl);
router.get("/eliminar/:id",verificarUsuario, eliminarUrl);
router.get("/editar/:id",verificarUsuario, editarUrlForm);
router.post("/editar/:id",verificarUsuario, urlValidar, editarUrl);

router.get("/perfil",verificarUsuario,formPerfil);
router.post("/perfil",verificarUsuario,editarPerfil);

router.get("/:shortURL", redireccionamiento);





module.exports = router;
