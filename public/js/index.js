// WebSocket

const socket = io();

socket.on("productsRealTime", () => {
  listadoDeProductos(ContainerRealTime);
});

// Get File

const getFile = async (path) => {
  const response = await fetch(path).then((res) => {
    return res.json();
  });
  return response;
};

// Products

const listadoDeProductos = async (containerId, dataList) => {
  const container = document.getElementById(containerId);
  const data = await getFile(dataList);

  data.forEach((elem) => {
    const div = document.createElement("div");
    div.classList.add("col-sm-3");
    div.innerHTML = `<div class="card mb-4" style="width: 15rem;">
      <img src="${elem.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="card-text">$${elem.price}</p>
        <a href="/products/${elem._id}" class="btn btn-primary">Agregar al carrito</a>
      </div>
    </div>`;
    container.appendChild(div);
    // const btnAgregar = document.getElementById(elem._id);
    // btnAgregar.addEventListener("click", () => addCart(elem._id));
  });
};

listadoDeProductos("product-container", "/api/products");
listadoDeProductos("realtime-container", "/api/products");
listadoDeProductos("mockingproduct-container", "/mocking");

// Finalizar compra

const finalizarCompra = () => {
  //dar ticket, sacar los productos con stock del carrito e ir a inicio
};
