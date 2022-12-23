

mostrarMenus()

function agregar() {
    let menu = {
        numero: document.getElementById("numero").value,
        pp: document.getElementById("pp").value,
        sp: document.getElementById("sp").value,
        pos: document.getElementById("pos").value,
        precio: document.getElementById("precio").value
    }

    if(menu.numero.length > 0 && menu.pp.length > 0 && menu.sp.length > 0 && menu.pos.length > 0 && menu.precio.length > 0){
    fetch('/api/nuevoMenu', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menu)
    }).then(res => res.json()).then(res => {
        feedback(res.error, res.mensaje)
        document.getElementById("numero").value = ""
        document.getElementById("pp").value = ""
        document.getElementById("sp").value = ""
        document.getElementById("pos").value = ""
        document.getElementById("precio").value = ""

    })
    }else{
        feedback(true, "El formulario debe estar completo")
    }

}

function mostrarMenus() {
    fetch('/api/menus').then(res => res.json()).then(res => {
        let html = ""
        res.results.forEach(menu => {
            html += `<tr><td>${menu.numero}</td><td>${menu.pp}</td><td>${menu.sp}</td><td>${menu.pos}</td><td>${menu.precio}</td><td><button type="button" onclick="borrar(${menu.numero})">Borrar</button></td></tr>`
        });
        document.getElementById('menus').innerHTML = `<table><tr><th>Nº Menú</th><th>Primero</th><th>Segundo</th><th>Postre</th><th>P.V.P.</th></tr>${html}</table>`
    })
};

function borrar(numero) {
    fetch('api/borrarMenu', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ numero })
    }).then(res => res.json()).then(res => {
        feedback(res.error, res.mensaje)
    })
};

function feedback(error, mensaje) {
    document.getElementById('feedback').innerHTML = `<p>${mensaje}</p>`
    error
        ? (document.getElementById('feedback').style.color = 'red')
        : (document.getElementById('feedback').style.color = 'green')
    setTimeout(() => {
        document.getElementById('feedback').innerHTML = ``
    }, 2000)
    mostrarMenus()
  

}