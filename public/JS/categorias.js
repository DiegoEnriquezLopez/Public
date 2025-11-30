function cargarCategoria(nombreCategoria) {

  fetch("http://localhost:3000/api/productos")
    .then(res => res.json())
    .then(productos => {

      const cont = document.getElementById("productosCategoria");
      cont.innerHTML = ""; // limpiar

      const filtrados = productos.filter(p => p.category === nombreCategoria);

      filtrados.forEach(p => {

        cont.innerHTML += `
          <div class="col-md-3 mb-4">
            <div class="card h-100 shadow-sm">

              <img src="Assets/${p.img}" class="card-img-top" alt="${p.name}">

              <div class="card-body d-flex flex-column">

                <h5 class="card-title">${p.name}</h5>

                <p class="card-text descripcion-corta">${p.description}</p>

                <p class="precio text-success fw-bold">$${p.price}</p>

                <span class="badge bg-info categoria mb-2">${p.category}</span>

                <button class="btn btn-primary btn-agregar">
                  Agregar al carrito
                </button>

              </div>
            </div>
          </div>
        `;
      });

    })
    .catch(err => console.error("Error cargando productos:", err));
}
