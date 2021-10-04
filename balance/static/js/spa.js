const listaMovimientosRequest = new XMLHttpRequest()
const cambiaMovimientosRequest = new XMLHttpRequest()
const root_host = "http://localhost:5000/api/v1.0/"

function respuestaAltaMovimiento() {
    if (this.readyState === 4 && this.status === 200) {

        const form = document.querySelector("#formulario-movimiento")
        form.classList.add("inactivo")
    

        const url = `${root_host}movimientos`
        listaMovimientosRequest.open("GET", url, true)
        listaMovimientosRequest.onload = muestraMovimientos
        listaMovimientosRequest.send()
    } else {
        alert("Se ha producido un error en el alta")
    }
}

function muestraMovimientos() {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const movimientos = respuesta.movimientos
        const tabla = document.querySelector("#tabla-datos")
        let innerHTML = ""

        for (let i=0; i < movimientos.length; i++) {
            innerHTML = innerHTML +
            `<tr>
                <td>${movimientos[i].fecha}</td>
                <td>${movimientos[i].concepto}</td>
                <td>${movimientos[i].ingreso_gasto}</td>
                <td>${movimientos[i].cantidad}</td>
            </tr>`
        }
        console.log(innerHTML)
        tabla.innerHTML = innerHTML

    } else {
        alert("Se ha producido un error en la consulta de movimientos")
    }

}

function hazVisibleForm(ev) {
    ev.preventDefault()

    const form = document.querySelector("#formulario-movimiento")
    form.classList.remove("inactivo")
}

function altaMovimiento(ev) {
    ev.preventDefault()

    const fecha = document.querySelector("#fecha").value
    const concepto = document.querySelector("#concepto").value
    const ingreso_gasto = document.querySelector('input[name="ingreso_gasto"]:checked').value
    const cantidad = document.querySelector("#cantidad").value

    json = {"fecha": fecha, "concepto": concepto, "ingreso_gasto": ingreso_gasto, "cantidad": cantidad}

    const url = `${root_host}movimiento`
    cambiaMovimientosRequest.open("POST", url, true)
    cambiaMovimientosRequest.setRequestHeader("Content-Type", "application/json")
    cambiaMovimientosRequest.onload = respuestaAltaMovimiento
    cambiaMovimientosRequest.send(JSON.stringify(json))
}

window.onload = function() {
    const url = `${root_host}movimientos`
    listaMovimientosRequest.open("GET", url, true)
    listaMovimientosRequest.onload = muestraMovimientos
    listaMovimientosRequest.send()

    const btnNuevo = document.querySelector("#btn-alta")
    btnNuevo.addEventListener("click", hazVisibleForm)

    const btnEnviar = document.querySelector("#btn-enviar")
    btnEnviar.addEventListener("click", altaMovimiento)

}
