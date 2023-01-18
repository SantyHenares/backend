const socket = io();

const ContainerProductos = document.getElementById('product-container');
const ContainerRealTime = document.getElementById('realtime-container');

socket.on("productsRealTime", () => {
  listadoDeProductos(ContainerRealTime);
});

const listadoDeProductos = async (container) => {
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
    container.appendChild(div);
  });
}

listadoDeProductos(ContainerProductos);
