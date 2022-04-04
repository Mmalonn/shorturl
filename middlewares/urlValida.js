const { URL } = require("url");
const urlValidar = (req, res, next) => {
    try{
        const {origenUrl}=req.body;
        const urlFrontEnd = new URL(origenUrl);
        if(urlFrontEnd.origenUrl !== "null"){
            if(
                urlFrontEnd.protocol==="http:"||
                urlFrontEnd.protocol==="https:"
            ){
                return next();
            }
        }
        throw new Error("no valida");

    }catch(error){
        return res.send("url no valida");
    }
}
module.exports = urlValidar;
