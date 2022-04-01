const { URL } = require("url");
const urlValidar = (req, res, next) => {
    try{
        const {origenUrl}=req.body;
        const urlFrontend=new URL(origenUrl);
        if(urlFrontend.origin !=="null"){
            return next();
        }else {
            throw new Error ("no valida");
        }
    }catch(error){
        console.log(error);
        return res.send("url no valida");
    }
}

module.exports = urlValidar;
