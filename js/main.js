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
    let compra = compra.coment;
    alert (compra.value);
    
})