const Url = require("../models/Url");
const {nanoid}=require("nanoid");

const leerUrls=async(req,res)=>{
    try{
        const urls=await Url.find().lean();
        res.render("home",{urls:urls});
    }catch(error){
        console.log(error);
        res.send("fallo algo...");

    }
    
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

const eliminarUrl=async(req,res)=>{
    const {id}=req.params;
    try{
        await Url.findByIdAndDelete(id);
        res.redirect("/")
    } catch(error){
        console.log(error);
        res.send("algo salio mal");
    }
}

const editarUrlForm=async(req,res)=>{
    const {id}=req.params;
    try{
        const url=await Url.findById(id).lean();
        res.render("home",{url});
    }catch (error){
        console.log(error);
        res.send("algo salio mal");
    }
};

const editarUrl=async(req,res)=>{
    const {id}=req.params;
    const {origenUrl}=req.body;
    try{
        await Url.findByIdAndUpdate(id, {origin:origenUrl});
        res.redirect("/");
    }catch (error){
        console.log(error);
        res.send("algo salio mal");
    }
};

const redireccionamiento=async(req,res)=>{
    const {shortURL} = req.params;
    try{
        const urlDB=await Url.findOne({shortURL: shortURL});
        res.redirect(urlDB.origin);
    }catch (error){
        console.log(error);
        res.send("algo salio mal");
    }
}





module.exports={
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento   
};