const Url = require("../models/Url");
const {nanoid}=require("nanoid");

const leerUrls=async(req,res)=>{
    try{
        const urls=await Url.find({user:req.user.id}).lean();
        res.render("home",{urls:urls});
    }catch(error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/")

    }
    
};

const agregarUrl=async(req,res)=>{
    const {origin}=req.body
    const {shortURL}=req.body
    try{
        const url= new Url({origin:origin,shortURL: nanoid(10),user:req.user.id});
        await url.save();
        req.flash("mensajes",[{msg:"Url agregada"}]);
        res.redirect("/");
    } catch(error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/")
    }
};

const eliminarUrl=async(req,res)=>{
    const {id}=req.params;
    try{
        const url= await Url.findById(id);
        if(!url.user.equals(req.user.id)){
            throw new Error("No te corresponde esa Url")
        }
        await url.remove()
        req.flash("mensajes",[{msg:"Url eliminada"}]);
        res.redirect("/")
    } catch(error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/")
    }
}

const editarUrlForm=async(req,res)=>{
    const {id}=req.params;
    try{
        const url=await Url.findById(id).lean();
        if(!url.user.equals(req.user.id)){
            throw new Error("No te corresponde esa Url")
        }
        res.render("home",{url});
    }catch (error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/")
    }
};

const editarUrl=async(req,res)=>{
    const {id}=req.params;
    const {origin}=req.body;
    try{
        const url = await Url.findById(id);
        if(!url.user.equals(req.user.id)){
            throw new Error("No te corresponde esa Url")
        }
        await url.updateOne({origin});
        req.flash("mensajes",[{msg:"Url modificada"}]);
        return res.redirect("/")
    }catch (error){
        req.flash("mensajes",[{msg:error.message}]);
        return res.redirect("/")
    }
};

const redireccionamiento=async(req,res)=>{
    const {shortURL} = req.params;
    try{
        const urlDB = await Url.findOne({shortURL: shortURL});
        return res.redirect(urlDB.origin);
    }catch (error){
        return res.redirect("/")
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