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





app.get("/",(req,res)=>{
    const urls=[
        {origin: "www.google.com/ruta1", shortURL:"ruta1"},
        {origin: "www.google.com/ruta2", shortURL:"ruta2"},
        {origin: "www.google.com/ruta3", shortURL:"ruta3"},
        {origin: "www.google.com/ruta4", shortURL:"ruta4"}
    ]
    res.render("home",{urls:urls});

})

app.get("/login",(req,res)=>{
    res.render("login");

})
app.get("/logout",(req,res)=>{
    res.render("logout");

})
app.get("/signin",(req,res)=>{
    res.render("signin");

})


app.use(express.static(__dirname + "/public"));



app.listen(5000, ()=>{
    console.log("servidor andando 😊");
})