mostrarMenus()

function agregar(){
let menu = {
    numero:document.getElementById("numero").value,
    pp:document.getElementById("pp").value,
    sp:document.getElementById("sp").value,
    pos:document.getElementById("pos").value,
    precio:document.getElementById("precio").value
}
fetch('/api/nuevoMenu',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(menu)
}).then(res=>res.json()).then(res=>{
    document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
    res.error
    ?  (document.getElementById('feedback').style.color = 'red')
    : (document.getElementById('feedback').style.color = 'green')
setTimeout(()=>{
    document.getElementById('feedback').innerHTML=``
}, 2000)
mostrarMenus()   
document.getElementById("numero").value = ""
document.getElementById("pp").value = ""
document.getElementById("sp").value = ""
document.getElementById("pos").value = ""
document.getElementById("precio").value = ""

})

}

function mostrarMenus(){
    fetch('/api/menus').then(res=>res.json()).then(res=>{
        let html =""
        res.results.forEach(menu => {
            html += `<tr><td>${menu.numero}</td><td>${menu.pp}</td><td>${menu.sp}</td><td>${menu.pos}</td><td>${menu.precio}</td></tr>`
        });
        document.getElementById('menus').innerHTML = `<table><tr><th>Nº Menú</th><th>Primero</th><th>Segundo</th><th>Postre</th><th>P.V.P.</th></tr>${html}</table>`
    })
}