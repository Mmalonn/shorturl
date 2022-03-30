const express = require("express");
const app = express();
const {create}=require("express-handlebars");
const hbs=create({
    extname:".hbs",
    partialsDir:["views/components"]
});

app.engine(".hbs",hbs.engine);
app.set("view engine", ".hbs");
app.set("views","./views");



app.use("/", require('./routes/home'));
app.use("/auth", require('./routes/auth'));
app.use(express.static(__dirname + "/public"));



app.listen(5000, ()=>{
    console.log("servidor andando 😊");
})