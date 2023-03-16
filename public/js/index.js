const socket = io();

const ContainerProductos = document.getElementById("product-container");
const ContainerRealTime = document.getElementById("realtime-container");

socket.on("productsRealTime", () => {
  listadoDeProductos(ContainerRealTime);
});

const getFile = async (path) => {
  const response = await fetch(path).then((res) => {
    return res.json();
  });
  return response;
};

const listadoDeProductos = async (container) => {
  const data = await getFile("/products.json");

  data.forEach((elem) => {
    const div = document.createElement("div");
    div.classList.add("col-sm-3");
    div.innerHTML = `<div class="card mb-4" style="width: 18rem;">
      <img src="${elem.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="card-text">$${elem.price}</p>
        <a href="#" class="btn btn-primary">Ir a comprar</a>
      </div>
    </div>`;
    container.appendChild(div);
  });
};

listadoDeProductos(ContainerProductos);
listadoDeProductos(ContainerRealTime);

// Sign up form
const elementExists = (id) => document.getElementById(id) !== null;

elementExists("signup") &&
  document.getElementById("signup").addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { firstName, lastName, email, password };

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
