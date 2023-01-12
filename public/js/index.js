const socket = io();

socket.on("messages", (data) => {
  render(data);
});

// const data = await productManager.getProducts();
socket.emit("new-message", data);

function render(data) {
  const html = data
    .map((elem) => {
      return `<div class="card" style="width: 18rem;">
      <img src="${elem.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="card-text">${elem.description}</p>
        <p class="card-text">${elem.price}</p>
        <a href="#" class="btn btn-primary">Ir a comprar</a>
      </div>
    </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

