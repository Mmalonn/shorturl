const mongoose = require("mongoose");
require("dotenv").config();

const clientDB= mongoose
    .connect(process.env.URI)
    .then((m)=>{
      console.log("Base de datos conectada");
      return m.connection.getClient();  
    })
    .catch((e)=> console.log("fallo la coneccion😢 "+ e))

    module.exports= clientDB;