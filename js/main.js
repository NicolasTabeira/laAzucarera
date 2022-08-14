//variables
let galeriaCarrito = document.querySelector('.galeria');
let containerCarrito = document.querySelector('.cardItems');
let precioTotal = document.querySelector('.price-total');
let finalizarCompra = document.querySelector('.finCompra')
let carroLleno = document.querySelector('.productosCarrito')

let carrito = [];
let totalCard = 0;




//funciones


loadEventsListener();
revisarCarrito();



function revisarCarrito(){
    if (localStorage.getItem('item') === null) {
        carrito = [];
    }else{
        cargarStorage();
    }
}


function loadEventsListener(){
    galeriaCarrito.addEventListener('click', addProduct);

    containerCarrito.addEventListener('click', deleteProduct);

    finalizarCompra.addEventListener('click', terminarCompra)

}
function cargarStorage() {
    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('item'));
        totalCard = JSON.parse(localStorage.getItem('suma'));
        loadHtml();
    })
    
}


function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn')) {    
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
    
}

function deleteProduct(e) {
    if (e.target.classList.contains('deleteProduct')) {  
        const deleteId = e.target.getAttribute('data-id');

        carrito.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = Number(value.precio) * Number(value.amount);                
                if (totalCard > 0) {
                    totalCard = totalCard - priceReduce;
                    loadHtml();
                } else {
                    totalCard = 0;
                }
            }
        })
        carrito = carrito.filter(product => product.id !== deleteId);

    }
    loadHtml();
}

function terminarCompra () {
    carrito = [];
    localStorage.clear();
    totalCard = 0;
    loadHtml();
}


function readTheContent(product){
    const infoProduct = {
        titulo: product.querySelector('.card-title').textContent,
        precio: product.querySelector('span').textContent,
        amount: 1,
        id: product.querySelector('a').getAttribute('data-id')
    }

    totalCard = totalCard + Number(infoProduct.precio);

    const exist = carrito.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = carrito.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;                                
            }else {
                return product;
            }
        });
        carrito = [...pro];
    }else{
        carrito = [...carrito, infoProduct];
    }
    loadHtml();
}

function loadHtml() {
    clearHtml();
    carrito.forEach(product => {
        const {titulo, precio, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <h5 class="card-title">${titulo}</h5>
            <p classs="card-text" id="precio">$ ${precio}</p>
            <p>cantidad: ${amount}</p>
            <span class="btn deleteProduct" data-id="${id}">X</span>
        `;

        

        containerCarrito.appendChild(row);

        
        
    });
    
    precioTotal.innerHTML =  totalCard;
    sincLocalStorage();
    
    
}


//para evitar que se vuelva a agregar un producto ya existente en el carrito
function clearHtml() {
    containerCarrito.innerHTML = '';
}

//sincronizacion del local storage
function sincLocalStorage() {
    localStorage.setItem('item', JSON.stringify(carrito));
    localStorage.setItem('suma', JSON.stringify(totalCard));    
}

//alert de adicion al carrito
function captarBotones(){
    let btns = document.querySelectorAll('.btn-toastify');
    for (const button of btns) {
        button.addEventListener('click', () => {
            Toastify({
                text: 'Se añadio al carrito.',
                duration: 3000
            }) .showToast();
        })
    }

}
//fetch para cargar productos en el html


let obtenerProductos = async () => {
    try {
        let response = await fetch("../productos.json");
        let data = await response.json();
        mostrarProductos(data);
    }
    catch(error) {
        console.log(error)
    }
}

obtenerProductos(); 

let mostrarProductos = (productos) => {
    productos.forEach((producto, indice) => {
        let card= 
        `
        <div class="card card${indice+1}" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body item">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p classs="card-text" id="precio">$ <span>${producto.precio}</span></p>
            <a href="#" class="btn btn-toastify btn-primary" data-id="${producto.id}">Añadir al carrito</a>
        </div>
        </div>
        `;
        galeriaCarrito.innerHTML+=card;
    });
    captarBotones();
}