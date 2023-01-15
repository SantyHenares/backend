const socket = io();

socket.on("products", () => {
  listadoDeProductos();
});

const ContainerProductos = document.getElementById('product-container');

const listadoDeProductos = async () => {
  const resp = await fetch('../products.json')
  const data = await resp.json()

  data.forEach(elem => {
      const div = document.createElement('div');
      div.classList.add('col-sm-3');
      div.innerHTML = `<div class="card mb-4" style="width: 18rem;">
      <img src="${elem.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="card-text">$${elem.price}</p>
        <a href="#" class="btn btn-primary">Ir a comprar</a>
      </div>
    </div>`
    ContainerProductos.appendChild(div);
  });
}

listadoDeProductos();

