const Url = require("../models/Url");
const {nanoid}=require("nanoid");

const leerUrls=async(req,res)=>{
    const urls=[
        {origin: "www.google.com/ruta1", shortURL:"ruta1"},
        {origin: "www.google.com/ruta2", shortURL:"ruta2"},
        {origin: "www.google.com/ruta3", shortURL:"ruta3"},
        {origin: "www.google.com/ruta4", shortURL:"ruta4"}
    ]
    res.render("home",{urls:urls});
};

const agregarUrl=async(req,res)=>{
    const {origenUrl}=req.body
    try{
        const url = new Url({origin: origenUrl, shortURL:nanoid(8)})
        await url.save();
        res.redirect("/");
    } catch(error){
        console.log(error)
        res.send("error algo fallo")
    }
};

module.exports={
    leerUrls,
    agregarUrl,
}
