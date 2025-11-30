function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const cont = document.getElementById("carritoTarjetas");
    cont.innerHTML = "";

    let total = 0;

    carrito.forEach(p => {

        cont.innerHTML += `
            <div class="card mb-3 shadow-sm tarjeta-horizontal">

                <div class="row g-0">

                    <div class="col-md-4">
                        <img src="Assets/${p.img}" class="img-fluid rounded-start" alt="${p.name}">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">

                            <h5 class="card-title">${p.name}</h5>

                            <p class="card-text">${p.description}</p>

                            <p class="text-success fw-bold">$${p.price}</p>

                            <span class="badge bg-info categoria">${p.category}</span>

                        </div>
                    </div>

                </div>
            </div>
        `;

        total += p.price;
    });

    document.getElementById("total").textContent = "$" + total;
}

function procederPago() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Pago realizado con éxito. ¡Gracias por tu compra!");

    localStorage.removeItem("carrito");
    mostrarCarrito();
}
