"use strict"

console.log("funciono");

document.addEventListener("click",e=>{
    if(e.target.dataset.tocar){
        const url=`${window.location.origin}/${e.target.dataset.tocar}`

        navigator.clipboard
            .writeText(url)
            .then(()=>{
                console.log("texto copiado..");
            })
            .catch((err)=>{
                console.log("fallo al copiar..",err)
            })
    }
});
