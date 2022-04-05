const express = require("express");
const app = express();
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const {create}=require("express-handlebars");
const User = require("./models/User");
const hbs=create({
    extname:".hbs",
    partialsDir:["views/components"]
});

require("dotenv").config();
require("./database/db");

app.use(session({
    secret:"SW",
    resave:false,
    saveUninitialized:false,
    name:"SM",
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done)=>{
    done(null,{id:user._id,userName:user.userName});
});
passport.deserializeUser(async(user,done)=>{
    const userDB= await User.findById(user.id);
    return done(null,{id:userDB._id,userName:userDB.userName})
});



app.engine(".hbs",hbs.engine);
app.set("view engine", ".hbs");
app.set("views","./views");
app.use(express.urlencoded({extended:true}))
app.use("/", require('./routes/home'));
app.use("/auth", require('./routes/auth'));
app.use(express.static(__dirname + "/public"));







const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("servidor andando 😊 "+PORT);
})