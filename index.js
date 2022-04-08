const express = require("express");
const app = express();
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const {create}=require("express-handlebars");
const csrf = require("csurf");
const MongoStore=require("connect-mongo");
const mongoSanitize=require("express-mongo-sanitize");
const cors=require("cors");

const corsOptions={
    credentials: true,
    origin:process.env.PATHHEROKU || "*",
    methods:["GET","POST"],
}
app.use(cors(corsOptions));


const User = require("./models/User");
const clientDB = require("./database/db");

const hbs=create({
    extname:".hbs",
    partialsDir:["views/components"]
});



require("dotenv").config();
require("./database/db");

app.use(session({
    secret:process.env.SECRETSESSION,
    resave:false,
    saveUninitialized:false,
    name:process.env.SECRETNAME,
    store:MongoStore.create({
        clientPromise: clientDB,
        dbName: "myFirstDatabase"
    })
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

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}))

app.use(csrf());
app.use(mongoSanitize());

app.use((req,res,next)=>{
    res.locals.csrfToken=req.csrfToken();
    res.locals.mensajes=req.flash("mensajes");
    next();
});


app.use("/", require('./routes/home'));
app.use("/auth", require('./routes/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("servidor andando 😊 "+PORT);
})