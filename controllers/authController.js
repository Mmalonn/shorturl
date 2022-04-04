const loginForm=(req,res)=>{
    res.render("login");
}
const registerForm=(req,res)=>{
    res.render("register");
}

const registerUser= async(req,res)=>{
    console.log(req.body);
    try{

    }catch(error){
        res.json({error:"ocurrio un error"})
    }

}

module.exports={
    loginForm,
    registerForm,
    registerUser
}