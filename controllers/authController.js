const loginForm=(req,res)=>{
    res.render("login");
}
const registerForm=(req,res)=>{
    res.render("register");
}

module.exports={
    loginForm,
    registerForm
}