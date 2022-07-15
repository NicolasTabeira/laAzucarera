/* // formulario que no se si usar
const formPedido = document.getElementById('formularioPedidos');

const compra = [];

formPedido.addEventListener('submit', (e) => {
    
    e.preventDefault();

    const email = document.getElementById('email').value;
    const coment = document.getElementById('coment').value;

    const pedido = {

        email,
        coment
    }

    compra.push(pedido);
    console.log(compra);
    
}) */
//variables
let galeriaCarrito = document.querySelector('.galeria');
let containerCarrito = document.querySelector('.cardItems');
let precioTotal = document.querySelector('.price-total');

let carrito = [];
let totalCard = 0;


//funciones


loadEventsListener();
revisarCarrito();
function revisarCarrito(){
    if (localStorage.getItem('item')=== null) {
        carrito = [];
    }else{
        cargarStorage();
    }
}
function loadEventsListener(){
    galeriaCarrito.addEventListener('click', addProduct);

    containerCarrito.addEventListener('click', deleteProduct);
}
function cargarStorage() {
    
    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('item'));
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
                totalCard = totalCard - priceReduce;
            }
        })
        carrito = carrito.filter(product => product.id !== deleteId);
    }
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

        precioTotal.innerHTML =  totalCard;
        
        sincLocalStorage();
    });
    
    
}

function clearHtml() {
    containerCarrito.innerHTML = '';
}
function sincLocalStorage() {
    localStorage.setItem('item', JSON.stringify(carrito))    
}



