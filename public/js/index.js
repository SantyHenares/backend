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
        <a id="${elem._id}" class="btn btn-primary">Agregar al carrito</a>
      </div>
    </div>`;
    container.appendChild(div);
    const btnAgregar = document.getElementById(elem._id);
    btnAgregar.addEventListener("click", () => addCart(elem._id));
  });
};

listadoDeProductos("product-container", "/api/products");
listadoDeProductos("realtime-container", "/api/products");
listadoDeProductos("mockingproduct-container", "/mocking");

// Sign up form

const elementExists = (id) => document.getElementById(id) !== null;

elementExists("signup") &&
  document.getElementById("signup").addEventListener("click", function () {
    const myForm = document.getElementById("myForm");
    const formData = new FormData(myForm);
    const data = Object.fromEntries(formData);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });

// Login form

elementExists("send") &&
  document.getElementById("send").addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });

// Finalizar compra

const finalizarCompra = () => {
  //dar ticket, sacar los productos con stock del carrito e ir a inicio
};
