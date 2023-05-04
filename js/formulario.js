var error = [];

function validar() {

    error = [];

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let mensaje = document.getElementById("mensaje").value;
    
    //Expresiones regulares
    const ExpRegLetras = new RegExp('^[A-ZÑÁÉÍÓÚ]+$', 'i');
    const ExpRegNumeros = new RegExp('^[0-9]+$');
    const ExpRegLetrasNumerosEspacios = new RegExp('^[ A-ZÑÁÉÍÓÚ0-9]+$', 'i');
    const ExpRegEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // Agregamos con push al array "error" los distintos errores que surgen del control
    if (nombre == null || nombre.length == 0 || ExpRegLetras.test(nombre) == false) {
        error.push('nombre');
    }

    if (apellido == null || apellido.length == 0 || ExpRegLetras.test(apellido) == false) {
        error.push('apellido');
    }

    if (email == null || email.length == 0 || ExpRegEmail.test(email) == false) {
        error.push('email');
    }

    if (phone == null || phone.length == 0 || ExpRegNumeros.test(phone) == false) {
        error.push('phone');
    }

    if (mensaje == null || mensaje.length == 0 || ExpRegLetrasNumerosEspacios.test(mensaje) == false) {
        error.push('mensaje');
    }
}

function enviarFormulario() {
    
    let texto = '';

    validar();

    if (error.length == 0) {
        alert("Formulario enviado correctamente, gracias.");
        document.formulario.submit();
    } else {
        for (i = 0; i < error.length; i++) {
            switch (error[i]) {
                case 'nombre':
                    texto = 'El campo Nombre es vacío o contiene un caracter inválido. <BR>';
                    break;
                case 'apellido':
                    texto = texto + 'El campo Apellido es vacío o contiene un caracter inválido. <BR>';
                    break;
                case 'email':
                    texto = texto + 'El campo Email es vacío o contiene un formato inválido. <BR>';
                    break;
                case 'phone':
                    texto = texto + 'El campo Teléfono es vacío o contiene un caracter inválido. <BR>';
                    break;
                case 'mensaje':
                    texto = texto + 'El campo Mensaje no puede ser vacío.';
                    break;
            }
        }
        Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            html: texto,
            width: 400,
        })
    }
}