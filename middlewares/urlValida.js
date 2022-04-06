const { URL } = require("url");
const urlValidar = (req, res, next) => {
    try{
        const {origenUrl} = req.body;
        const urlFrontend=new URL(origenUrl);
        if(urlFrontend.origin !== "null"){
            if(
                urlFrontend.protocol==="http:"||
                urlFrontend.protocol==="https:"
                ){
                    return next();
                }
                throw new Error ("El url debe ser con protocolo https://")
        }
        throw new Error ("Url no valida");
    }catch(error){
        if (error.message ==="Invalid URL"){
            req.flash("mensajes",[{msg:"url no valida"}])
        }else{
            req.flash("mensajes", [{msg:error.message}])
        }
        return res.redirect("/");
    }
}
module.exports = urlValidar;
