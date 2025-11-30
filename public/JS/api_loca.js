fetch("https://www.cheapshark.com/api/1.0/deals")
    .then(r => r.json())
    .then(ofertas => {

        const cont = document.getElementById("apiCheapShark");
        cont.innerHTML = "";

        ofertas.forEach(o => {

            const urlOferta = `https://www.cheapshark.com/redirect?dealID=${o.dealID}`;

            cont.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card api-card shadow-sm">

                    <img src="${o.thumb}" class="api-img">

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">${o.title}</h5>

                        <p>Antes: <del>$${o.normalPrice}</del></p>

                        <p class="text-success fw-bold">Ahora: $${o.salePrice}</p>

                        <div class="descuento-btn badge bg-danger">
                            Descuento: ${parseInt(o.savings)}%
                        </div>

                        <a href="${urlOferta}" target="_blank" 
                           class="btn btn-primary api-btn">
                           Ver oferta 🔗
                        </a>

                    </div>

                </div>
            </div>`;
        });
    });
