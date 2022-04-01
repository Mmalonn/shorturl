const leerUrls=async(req,res)=>{
    const urls=[
        {origin: "www.google.com/ruta1", shortURL:"ruta1"},
        {origin: "www.google.com/ruta2", shortURL:"ruta2"},
        {origin: "www.google.com/ruta3", shortURL:"ruta3"},
        {origin: "www.google.com/ruta4", shortURL:"ruta4"}
    ]
    res.render("home",{urls:urls});
}

const agregarUrl=async(req,res)=>{

};

module.exports={
    leerUrls,
    agregarUrl,
}