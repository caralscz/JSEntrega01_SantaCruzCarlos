/** ========================================================
 * 
 * Java script para pagina index.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz
 *
 * @description Entrega1. JS desde index.html - Proyecto de Home banking
 *  
 * Funciones ejecutadas desde la página index.html
 * 
 *  Funciones implementadas:
 *  1) @function ValidarUnUsuario() es la principal que inicia el sistema desde la página index.html
 *  2) En la funcion IngresarUsuarioPassword() se pide el nombre de usuario y password    
 *  3) luego en la function VerificoUsuarioPassword verifica que sean correctos
 *  4) Si son correctos se habilitan los botones de los servicios
 *         y si son incorrectos se deshabilitan
 *  5) Habilitará dos servicios bancarios: 
 *     - Servicio de Cambio de divisas es la que está implementada y 
 *     - Servicio de Caja de ahorro que está pendiente
 * 
 * ======================================================== **/

function IngresarUsuarioPassword() {
    /** ======================================================== 
     * @function IngresarUsuarioPassword
     * @description Ingreso de nombre de usuario y password
     * @returns {boolean} true si el usuario y password son correctos, false si no lo son
     *
     * Se ingresa a esta función desde ValidarUnUsuario() 
     *
     * y se sale de ella cuando el usuario ingresa correctamente su nombre de usuario y password
     * o cuando se intenta 3 veces y no lo logra
     *
     * ======================================================== **/
    // muestro usuarios y password válidos
    console.log("? Usuarios y password posibles:");
    console.log(`
        "u1", "p1" 
        "usuario1", "password1" 
        "usuario2", "password2" 
        `);

    for (let i = 0; i < 3; i++) {       // contamos los intentos de ingreso

        // ingreso de usuario y password
        let jsUsuario = prompt("Ingrese su nombre de usuario");
        // Si el usuario cancela, retornamos false
        if (jsUsuario === null) return false;

        let jsPassword = prompt("Ingrese su password");
        // Si el usuario cancela, retornamos false
        if (jsPassword === null) return false;

        // Si el usuario presiona "OK" y el usuario y password son correctos
        // entonces se sale de la función
        if (confirm(`Usted ingresó:

          Usuario: ${jsUsuario}
          Password: ${jsPassword}
        `
            // voy a verificar que el usuario y password sean correctos
        ) && VerificoUsuarioPassword(jsUsuario, jsPassword)) {
            // Si el usuario y password son correctos
            // Muestro en el HTML los valores ingresados por el usuario
            MuestroValoresEnHTML(jsUsuario, jsPassword);
            return (true); // todo bien, usuario y password correctos

        } else {
            // Si el usuario presiona "Cancelar" o el usuario y password son incorrectos
            // entonces se le informa y se le pide que ingrese nuevamente
            alert(`Por favor, ingrese nuevamente su nombre de usuario y password
            
            Intento ${i + 1} de 3

          `);
        }
    } // Fin del for ***

    // Si se intentó 3 veces y no pudo ingresar correctamente
    if (i => 3) {
        return (false); // no pudo ingresar susario/password correctas
    }

} // Fin de la función IngresarUsuarioPassword

function VerificoUsuarioPassword(jsUsuario, jsPassword) {
    /** ======================================================== 
     *
     * @function VerificoUsuarioPassword
     * @description Verificación de usuario y password
     * @param {string} jsUsuario - El nombre de usuario ingresado
     * @param {string} jsPassword - La contraseña ingresada  
     * @returns {boolean} true si el usuario y password son correctos, false si no lo son
     * 
     * Viene desde la función IngresarUsuarioPassword
     * y luego de presionar el botón "OK"
     * En ese caso debo verificar que el usuario y password ingresados 
     * sean correctos
     *
     * ========================================================
     * 
     * cargo la tabla con los usuarios y password válidos
     * esto debería hacerlo una sola vez en el programa y no cada vez 
     * que se llame a la función
     * 
    **/

    let tbUsuarioPw = [];
    tbUsuarioPw[0] = ["usuario1", "password1"];
    tbUsuarioPw[1] = ["usuario2", "password2"];
    tbUsuarioPw[2] = ["usuario3", "password3"];
    tbUsuarioPw[3] = ["usuario4", "password4"];
    tbUsuarioPw[4] = ["u1", "p1"];

    // recorro la tabla de usuarios y password válidos
    for (let i = 0; i < tbUsuarioPw.length; i++) {
        if (jsUsuario === tbUsuarioPw[i][0] && jsPassword === tbUsuarioPw[i][1]) {
            return true;    // usuario y password correctos
        }
    }
    return false;

} // Fin de la función VerificoUsuarioPassword
// ======================================================== 


function MuestroValoresEnHTML(jsUsuario, jsPassword) {
    // ======================================================== 
    //
    //  Muestro en el HTML los valores ingresados por el usuario
    //
    // ========================================================
    //
    //  Viene desde la función ValidarUnUsuario
    //  Se ingresa a esta función si hace click en el botón "OK" y 
    //     el usuario y password son correctos
    //
    // ========================================================        
    // nombre de usuario

    let txtNombreU = document.getElementById("idNombreUsuario");
    txtNombreU.textContent = jsUsuario; // Coloca el valor del nombre de usuario

    // password
    let txtPassw = document.getElementById("idClave");
    txtPassw.textContent = jsPassword; // Coloca el valor de la password

} // Fin de la función MuestroValoresEnHTML


function HabilitarServicios(siHabilitar) {
    // ========================================================
    //
    //  Se usa desde la funcion ValidarUnUsuario() para habilitar o deshabilitar
    //  los servicios dependiendo si se identificó bien o no el usuario
    //
    // ========================================================
    let serviciosDiv = document.getElementById("idServicios");
    if (siHabilitar) {
        serviciosDiv.style.display = "block";
    } else {
        serviciosDiv.style.display = "none";
    }
} // Fin de la función HabilitarServicios


// Función principal que inicia el sistema desde la página index.html
function ValidarUnUsuario() {
    /** ======================================================== 
    *
    * @function ValidarUnUsuario
    * @description Validación de usuario y password
    * 
    * Ingresamos aquí desde la página index.html como respuesta al evento click
    *    en el ícono de ingresar, en la parte superior derecha de la pagina
    *           (Es una puerta con una flecha hacia adentro)
    *    o en el botón "Ingresar un usuario"
    * 
    * Se pide el nombre de usuario y password y
    * si son correctos se habilitan los botones de los servicios
    *
    * ======================================================== **/
    if (IngresarUsuarioPassword()) {

        // Hago visible los botones de ingresar a los servicios
        HabilitarServicios(true);

        // Todo ok. Borro el mensaje inicial, ya no es necesario
        // document.getElementById("idcontenedorAviso").style.display = "none";
        mostrarOcultarAviso(true);
    }
    else {
        // deshabilito el link para que NO pueda ingresar a los servicios
        HabilitarServicios(false);
        // Muestro el mensaje inicial, para que lea de nuevo el mensaje
        // document.getElementById("idcontenedorAviso").style.display = "block";
        mostrarOcultarAviso(true);
        // Muestro el mensaje de error al usuario
        alert(`
            
            Usuario y password incorrectos
            No puede ingresar al sistema

               `);
    }; // Fin del if

} // Fin de la función ValidarUnUsuario

function mostrarOcultarAviso(condicion) {
    let aviso = document.getElementById("idcontenedorAviso");
    console.log("aviso.style.display", condicion);
    if (condicion) {
        aviso.style.display = "none"; // Ocultar el aviso
    } else {
        aviso.style.display = "block"; // Mostrar el aviso
    }
}

function Inicio() {
    // ======================================================== 
    //
    // Se ejecuta al cargar la página index.html
    // Solo se deshabilitan los servicios hasta que se identifique el usuario
    // Las funciones de identificacion de usuario se inicia desde la pagina HTML
    //
    // ======================================================== 
    HabilitarServicios(false);
} // Fin de la función Inicio

// ejecucion inicial al cargar la pagina 
Inicio();