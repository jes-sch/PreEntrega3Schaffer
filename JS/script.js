const btnCalcular = document.getElementById("btnCalcular"),
resultadosFinales1Element = document.getElementById("ResultadosFinales1"),
resultadosFinales2Element = document.getElementById("ResultadosFinales2"),
resultadosFinales3Element = document.getElementById("ResultadosFinales3"),
resultadosFinales4Element = document.getElementById("ResultadosFinales4"),
resultadosFinales5Element = document.getElementById("ResultadosFinales5"),
btnRecuperarUltimo = document.getElementById("btnCalcular"),
inputPrecioContado = document.getElementById("inputPrecioContado");

function calcular() {

    let precioContado = document.getElementById("inputPrecioContado").value;
    let precioCuotas = document.getElementById("inputPrecioCuotas").value;
    let inflacion = document.getElementById("inputValorInflacion").value;
    let cantidadCuotas = document.getElementById("inputCantidadCuotas").value;

    guardarEnStorage("precioContado",precioContado);
    guardarEnStorage("precioCuotas",precioCuotas);
    guardarEnStorage("inflacion",inflacion);
    guardarEnStorage("cantidadCuotas",cantidadCuotas);

    alert(recuperareStorage("cantidadCuotas"));

    const arrayCuotas = [];

    let precioCuotasAjustado = 0;

    for (let index = 0; index < cantidadCuotas; index++) {
        let cuota = index + 1;
        arrayCuotas[index] = ((precioCuotas / cantidadCuotas) / ((1+(inflacion/100)) ** cuota));
        precioCuotasAjustado+=arrayCuotas[index];
    }

    let mejorOpcion;

    if (precioContado>precioCuotasAjustado) {
        mejorOpcion = "Te conviene comprar EN CUOTAS";
    }else{
        mejorOpcion = "Te conviene comprar AL CONTADO";
    }

    //Creo mi objeto resultadosFinales:

    const resultadosFinales = {
        mejorOpcion: mejorOpcion,
        cuotaAjustadaHoy: precioCuotasAjustado,
        precioContado: precioContado,
        precioCuotas: precioCuotas,
        valorCadaCuota: precioContado / cantidadCuotas,
        inflacion: inflacion,
        cuotas: arrayCuotas,
    };

    //MODAL: muestro los resultados finales en un modal:

    resultadosFinales1Element.innerHTML = resultadosFinales.mejorOpcion;
    resultadosFinales2Element.innerHTML = "Sumatoria de las cuotas ajustadas a valor de hoy: " +resultadosFinales.cuotaAjustadaHoy;
    resultadosFinales3Element.innerHTML = "Precio contado: " +resultadosFinales.precioContado;
    resultadosFinales4Element.innerHTML = "Precio cuotas: " +resultadosFinales.precioCuotas;
    resultadosFinales5Element.innerHTML = "Monto de cada cuota: " +resultadosFinales.cuotas;

    //TO DO: recorrer cada item de cuotas, para mostrarlo como columna:

    for (let i = 0; i < resultadosFinales.cuotas.length; i++) {
        const cuota = resultadosFinales.cuotas[i];
        alert(cuota);
    }
}

/* function RecuperarUltimo(){
    inputPrecioContado.value = recuperareStorage("precioContado");
} */

//Guardo en Storage:

function guardarEnStorage(key, value) {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key,value);
}

//Recupero del Storage:

function recuperareStorage(key) {
    return localStorage.getItem(key);
    //return sessionStorage.getItem(key);
}

btnCalcular.addEventListener('click', () => {
    calcular();
});

/* btnRecuperarUltimo.addEventListener('click', () => {
    RecuperarUltimo();
}); */