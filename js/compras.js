// Array de productos
const productos = {
    producto1: {
        nombre: 'Shazam! Fury of the Gods',
        precio: '1000',
        descripcion: 'Billy Batson y sus hermanos adoptivos Freddy, Mary, Pedro, Eugene y Darla, también dotados de superpoderes, tienen que enfrentarse a las tres hijas de Atlas: Hespera, Kalypso y Anthea.',
        srcImg: '../img/shazam_cartelera.jpg'
    },
    producto2: {
        nombre: 'Ant-Man and the Wasp: Quantumania',
        precio: '1000',
        descripcion: 'Los superhéroes Scott y Cassie Lang, Hope van Dyne y sus padres, se encuentran accidentalmente atrapados en el reino cuántico y deben enfrentarse a un nuevo enemigo, Kang el Conquistador.',
        srcImg: '../img/antman_cartelera.jpg'
    },
    producto3: {
        nombre: 'The Whale',
        precio: '1000',
        descripcion: 'Un profesor de inglés, un tipo solitario que sufre obesidad mórbida, intenta restablecer el contacto con su hija en busca de perdón.',
        srcImg: '../img/thewhale_cartelera.jpg'
    },
}
// Se captura el template de los productos
const templateProd = document.getElementById('template-prod').content
const contenedorProd = document.querySelector('.contenedor-productos')
const fragment = document.createDocumentFragment()

// TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
Object.values(productos).forEach(producto => {
    templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
    templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
    templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
    templateProd.querySelector('.contenedor-img .imagen_carrito').setAttribute('alt', producto.nombre)
    templateProd.querySelector('.contenedor-img .imagen_carrito').setAttribute('src', producto.srcImg)
    const clone = templateProd.cloneNode(true)
    fragment.appendChild(clone)
})
contenedorProd.appendChild(fragment)

// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {}
const templateTabla = document.getElementById('agregar-producto-al-carro').content
const tbodyCarrito = document.getElementById('carrito-body')
const fragmentTabla = document.createDocumentFragment()
const templateFoot = document.getElementById('tfooter').content
const tfootCarrito = document.getElementById('footer')

contenedorProd.addEventListener('click', e => {

    if (e.target.textContent === "Agregar") {
        setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
})
const setCarrito = e => {
    const pivoteCarrito = {
        nombre: e.querySelector('.div-info .nombre-prod').textContent,
        precio: e.querySelector('.div-precio-boton .precio').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(pivoteCarrito.nombre)) {
        carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
        carrito[pivoteCarrito.nombre] = { ...pivoteCarrito }
    }
    pintarTabla(carrito)
}

const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach(objeto => {
        const cloneTabla = templateTabla.cloneNode(true)
        cloneTabla.getElementById('producto').textContent = objeto.nombre
        cloneTabla.getElementById('cant').textContent = objeto.cantidad
        cloneTabla.getElementById('precio-uni').textContent = objeto.precio
        let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
        cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
        fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
}
const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
        const total = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0)
        templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
        const cloneFoot = templateFoot.cloneNode(true)
        fragment.appendChild(cloneFoot)
        tfootCarrito.appendChild(fragment)
        //Boton Vaciar carrito
        const botonVaciar = document.getElementById('vaciar-tabla')
        botonVaciar.addEventListener('click', () => {
            carrito = {}
            pintarTabla(carrito)
            pintarFooter()
        })

    }
}
//Botones aumentar y disminuir cantidades

tbodyCarrito.addEventListener('click', e => {

    if (e.target.classList.contains('button')) {
        aumentarDisminuir(e.target)
    }
})
const aumentarDisminuir = boton => {
    if (boton.textContent === '+') {
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent
        Object.values(carrito).forEach(elemento => {
            if (elemento.nombre === indicador) {
                carrito[elemento.nombre].cantidad++
            }
        })
    }
    if (boton.textContent === '-') {
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent
        Object.values(carrito).forEach(elemento => {
            if (elemento.nombre === indicador) {
                carrito[elemento.nombre].cantidad--
                if (carrito[elemento.nombre].cantidad === 0) {
                    delete carrito[elemento.nombre]
                }
            }
        })
    }
    pintarTabla(carrito)
    pintarFooter()
}

const finalizarCompra = document.querySelector('#finalizarCompra')

// Simulamos el envio de un mail con la compra
async function Enviomail() {
    const { value: email } = await Swal.fire({
        icon: 'warning',
        title: 'Ingrese un mail',
        input: 'email',
        text: 'Le enviaremos un link de pago con los datos de la compra para abonar a través de Mercado Pago. Una vez confirmada la compra recibirá un voucher para canjear al presentarse en el cine',
        inputPlaceholder: 'Ingrese un mail válido'
    })
    if (email) {
        Swal.fire({
            icon: 'sucess',
            title: 'Envio exitoso',
            text: 'Link enviado con exito',
        })
    }
}

finalizarCompra.addEventListener('click', e => {
    
    let conteo = []
    for (let elemento in carrito) {
        conteo.push(elemento)
    }

    if (conteo.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacío',
            text: 'No hay items en el carrito',
        })
    }
    else {
        Enviomail()
    }
})