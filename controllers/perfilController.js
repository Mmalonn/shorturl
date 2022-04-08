const path = require('path');
const formidable = require("formidable");
const Jimp=require("jimp");
const fs = require('fs');
const User = require("../models/User");


module.exports.formPerfil = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        return res.render("perfil",{user: req.user , imagen: user.imagen})

    }catch(error){
        req.flash("mensajes",[{msg:"error al leer el usuario"}]);
            return res.redirect("/perfil")

    }
}


module.exports.editarPerfil=async(req,res)=>{
    const form= new formidable.IncomingForm();
    form.parse(req, async (err,fields,files)=>{
        try{
            if(err){
                console.log(err);
                throw new Error("fallo la subida de imagen");
            }
            const file=files.myfile;
            if(file.originalFilename===""){
                throw new Error("por favor agrega una imagen");
            }
            const imageTypes=["image/jpg", "image/png", "image/jpeg"];
            if(!imageTypes.includes(file.mimetype)){
                throw new Error("por favor sube una imagen con formato jpg, jpeg o png");
            }
            if(file.size>5*1024*1024){
                throw new Error("debe ser una imagen de 5 mb o menos");
            }

            const extension=file.mimetype.split("/")[1];
            const dirFile=path.join(
                __dirname,`../public/img/perfiles/${req.user.id}.${extension}`
            );

            fs.renameSync(file.filepath,dirFile);

            const image= await Jimp.read(dirFile);
            image.resize(200,200).quality(90).writeAsync(dirFile);

            const user = await User.findById(req.user.id);
            user.imagen=`${req.user.id}.${extension}`;
            await user.save();

            req.flash("mensajes",[{msg:"Imagen subida"}]);

            return res.redirect("/perfil");

        }catch(error){
            req.flash("mensajes",[{msg:error.message}]);
            return res.redirect("/perfil")
        }
    });
}