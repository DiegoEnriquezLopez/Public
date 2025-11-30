let editando = null;

function cargarProductos(force = false) {

    const url = force
        ? `http://localhost:3000/api/productos?cache=${Date.now()}`
        : "http://localhost:3000/api/productos";

    fetch(url, { cache: "no-store" })
        .then(res => res.json())
        .then(lista => {
            const tabla = document.getElementById("tablaProductos");
            tabla.innerHTML = "";

            lista.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>$${p.price}</td>
                        <td>${p.category}</td>
                        <td>${p.img}</td>

                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editar(${p.id})">
                                Editar
                            </button>
                        </td>

                        <td>
                            <button class="btn btn-danger btn-sm" onclick="eliminar(${p.id})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });

            editando = null;
        });
}

cargarProductos();

function guardarProducto() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    if (!name || !price || !img || !category || !description) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const producto = { name, price, img, category, description };

    if (editando !== null) {
        fetch(`http://localhost:3000/api/productos/${editando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })
        .then(() => {
            alert("Producto actualizado");
            resetForm();
            cargarProductos(true); 
        });
        return;
    }

    fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    .then(() => {
        alert("Producto agregado");
        resetForm();
        cargarProductos(true); 
    });
}

function editar(id) {
    fetch(`http://localhost:3000/api/productos/${id}`)
        .then(res => res.json())
        .then(p => {
            editando = id;

            document.getElementById("tituloForm").innerText = "Editar Producto";
            document.getElementById("btnGuardar").innerText = "Guardar Cambios";

            document.getElementById("name").value = p.name;
            document.getElementById("price").value = p.price;
            document.getElementById("img").value = p.img;
            document.getElementById("category").value = p.category;
            document.getElementById("description").value = p.description;
        });
}

function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Producto eliminado");

        resetForm();
        editando = null;

        setTimeout(() => {
            cargarProductos(true); 
        }, 200);
    });
}

function resetForm() {
    editando = null;

    document.getElementById("tituloForm").innerText = "Agregar Producto";
    document.getElementById("btnGuardar").innerText = "Guardar Producto";

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
}
