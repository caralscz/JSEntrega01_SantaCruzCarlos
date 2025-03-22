/**
 * 
 * Java script para pagina hbCambioDeDivisas.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz
 *
 * @description Entrega1. JS desde hbCambiodeDivisas.html -  Proyecto de Home banking
 * 
 * Función sistema de Compra y Venta de Monedas
 * 
 * Este script permite realizar operaciones de compra y venta de 
 * monedas extranjeras (Dólar y Euro) utilizando Pesos Argentinos (AR$).
 * 
 * Proceso:
 * 1. Obtiene las tasas de cambio desde elementos HTML
 * 2. Permite al usuario seleccionar la moneda con la que desea operar
 * 3. Permite elegir entre comprar o vender dicha moneda
 * 4. Solicita la cantidad a operar
 * 5. Calcula e informa el monto final en Pesos Argentinos
 * 
 **/

// Función principal que inicia el sistema de compra/venta de divisas
function iniciarSistemaMonedas() {
    // 1. Obtener las tasas de cambio desde los elementos HTML
    const tasasMonedas = obtenerTasasCambio();
    
    // 2. Mostrar las tasas actuales al usuario y     
    //    solicitar la moneda con la que se desea operar
    const monedaElegida = solicitarMoneda(tasasMonedas);
    
    // Verificar si el usuario canceló la operación
    // de ser así, no continuamos con el proceso
    if (!monedaElegida) return;
    
    // 3. Solicitar el tipo de operación (compra o venta)
    const tipoOperacion = solicitarTipoOperacion();
    
    // Verificar si el usuario canceló la operación
    // de ser así, no continuamos con el proceso
    if (!tipoOperacion) return;
    
    // 4. Solicitar la cantidad que el usuario desea comprar o vender
    const cantidad = solicitarCantidad(monedaElegida, tipoOperacion);
    
    // Verificar si el usuario canceló la operación
    // de ser así, no continuamos con el proceso
    if (!cantidad) return;
    
    // 5. Calcular el resultado final de la operación
    calcularResultado(monedaElegida, tipoOperacion, cantidad, tasasMonedas);
}

/**
 * Obtiene las tasas de cambio desde los elementos HTML
 * @returns {Object} Objeto con las tasas de compra y venta para Dólar y Euro
 *
 * Sintaxis de objetos: 
 * La sintaxis { clave1: valor1, clave2: valor2, ... } se utiliza para crear objetos literales.
 * clave1, clave2, etc., son los nombres de las propiedades.
 * valor1, valor2, etc., son los valores asignados a esas propiedades.
 * En la función obtenerTasasCambio(), creamos un objeto que tiene dos propiedades: dolar y euro. 
 * Cada una de estas propiedades es, a su vez, otro objeto con las propiedades compra y venta.
 **/
function obtenerTasasCambio() {
    return {
        dolar: {
            compra: parseFloat(document.getElementById("idCompraDolar").innerText),
            venta: parseFloat(document.getElementById("idVentaDolar").innerText)
        },
        euro: {
            compra: parseFloat(document.getElementById("idCompraEuro").innerText),
            venta: parseFloat(document.getElementById("idVentaEuro").innerText)
        }
    };
}

/**
 * 
 * Muestra las tasas actuales de compra y venta al usuario y en la consola
 * Solicita al usuario que elija con qué moneda desea operar
 * @returns {string|null} La moneda elegida ('dolar' o 'euro') o null si cancela
 * 
 */
function solicitarMoneda(tasas) {
    /**
    * @param {Object} tasas - Objeto con las tasas de cambio
    **/
    console.log("? Tasas actuales de cambio:");
    console.log(`Dólar - Compra: AR$ ${tasas.dolar.compra.toFixed(2)} | Venta: AR$ ${tasas.dolar.venta.toFixed(2)}`);
    console.log(`Euro - Compra: AR$ ${tasas.euro.compra.toFixed(2)} | Venta: AR$ ${tasas.euro.venta.toFixed(2)}`);

    let valorMonedas = "Bienvenido al servicio de compra/venta de monedas\n\n" +
        "Tasas actuales:\n" +
        `Dólar - Compra: AR$ ${tasas.dolar.compra.toFixed(2)} | Venta: AR$ ${tasas.dolar.venta.toFixed(2)}\n` +
        `Euro - Compra: AR$ ${tasas.euro.compra.toFixed(2)} | Venta: AR$ ${tasas.euro.venta.toFixed(2)}\n`;

    let opcion;
    let moneda = null;
    
    do {
        opcion = prompt(valorMonedas + "¿Con qué moneda desea operar?\n1. Dólar\n2. Euro\nIngrese el número correspondiente:");
        
        // Si el usuario cancela, retornamos null
        if (opcion === null) return null;
        
        opcion = opcion.trim();
        
        // Uso de switch para determinar la moneda según la opción elegida
        switch (opcion) {
            case "1":
                moneda = "dolar";
                break;
            case "2":
                moneda = "euro";
                break;
            default:
                alert("Opción no válida. \nPor favor, ingrese 1 para Dólar o 2 para Euro.");
                break;
        }
    } while (!moneda);
    
    return moneda;
}

/**
 * Solicita al usuario que elija el tipo de operación
 * @returns {string|null} El tipo de operación ('compra' o 'venta') o null si cancela
 */
function solicitarTipoOperacion() {
    let opcion;
    let operacion = null;
    
    do {
        opcion = prompt("¿Qué operación desea realizar?\n1. Comprar\n2. Vender\n\nIngrese el número correspondiente:");
        
        // Si el usuario cancela, retornamos null
        if (opcion === null) return null;
        
        opcion = opcion.trim();
        
        // Uso de switch para determinar la operación según la opción elegida
        switch (opcion) {
            case "1":
                operacion = "compra";
                break;
            case "2":
                operacion = "venta";
                break;
            default:
                alert("Opción no válida. \nPor favor, ingrese 1 para Comprar o 2 para Vender.");
                break;
        }
    } while (!operacion);
    
    return operacion;
}

/**
 * 
 * Solicita al usuario la cantidad de moneda para la operación
 * @param {string} moneda - La moneda elegida ('dolar' o 'euro')
 * @param {string} operacion - El tipo de operación ('compra' o 'venta')
 * @returns {number|null} La cantidad de moneda o null si cancela
 * 
 */
function solicitarCantidad(moneda, operacion) {
    let cantidadStr;
    let cantidad = 0;
    const monedaNombre = moneda === "dolar" ? "Dólares" : "Euros";
    
    do {
        cantidadStr = prompt(`Ingrese la cantidad de ${monedaNombre} que desea ${operacion === "compra" ? "comprar" : "vender"}:`);
        
        // Si el usuario cancela, retornamos null
        if (cantidadStr === null) return null;
        
        cantidadStr = cantidadStr.trim();
        cantidad = parseFloat(cantidadStr);
        
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingrese un valor numérico válido mayor que cero.");
            cantidad = 0;
        }
    } while (cantidad <= 0);
    
    return cantidad;
}

/**
 * 
 * Calcula e informa el resultado final de la operación
 * @param {string} moneda - La moneda elegida ('dolar' o 'euro')
 * @param {string} operacion - El tipo de operación ('compra' o 'venta')
 * @param {number} cantidad - La cantidad de moneda para la operación
 * @param {Object} tasas - Objeto con las tasas de cambio
 * 
 */
function calcularResultado(moneda, operacion, cantidad, tasas) {
    let montoTotal = 0;
    let tasa = 0;
    let monedaNombre = "";
    
    // Determinar la moneda y su nombre para la presentación
    switch (moneda) {
        case "dolar":
            monedaNombre = "Dólares";
            tasa = operacion === "compra" ? tasas.dolar.venta : tasas.dolar.compra;
            break;
        case "euro":
            monedaNombre = "Euros";
            tasa = operacion === "compra" ? tasas.euro.venta : tasas.euro.compra;
            break;
    }
    
    // Calcula el monto total en pesos argentinos
    montoTotal = cantidad * tasa;
    
    // Preparar mensaje según tipo de operación
    let mensaje = "";
    if (operacion === "compra") {
        mensaje = `Para comprar ${cantidad} ${monedaNombre}, deberá depositar AR$ ${montoTotal.toFixed(2)}`;
    } else { // venta
        mensaje = `Por vender ${cantidad} ${monedaNombre}, recibirá AR$ ${montoTotal.toFixed(2)}`;
    }
    
    // Mostrar el resultado final al usuario
    console.log("? Resultado de operación:");
    console.log(mensaje);   
    document.getElementById("valorPesosArg").innerText = mensaje;
    alert(`Resumen de operación:\n\n${mensaje}`);
    
    return montoTotal;
}

/**
 * 
 * Ejecutar el sistema cuando se carga la página
 *
*/
iniciarSistemaMonedas();