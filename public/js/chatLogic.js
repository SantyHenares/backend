let chatBox = document.getElementById("chatBox");

let user;
Swal.fire({
  title: "Inicia sesion!",
  text: "Ingresa tu nombre de usuario",
  input: "text",
  confirmButtonText: "Cool",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "Debe ingresar un nombre de usuario";
    }
  },
}).then((result) => {
  if (result.value) {
    user = result.value;
    io().emit("new-user", { user: user, id: io().id });
  }
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      io().emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

io().on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";

  data.forEach((elem) => {
    message += `
   
      <div class="chat-message">
      <div class="message-bubble">
        <div class="message-sender">${elem.user}</div>
        <p>${elem.message}</p>
        </div>
      </div>
    `;
  });

  log.innerHTML = message;
});

io().on("new-user-connected", (data) => {
  if (data.id !== io().id)
    Swal.fire({
      text: `${data.user} se ha conectado al chat`,
      toast: true,
      position: "top-end",
    });
});

function firstLoad() {
  let log = document.getElementById("messageLogs");

  fetch("/messages")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let message = "";

      data.forEach((elem) => {
        message += `
      <div class="chat-message">
        <div class="message-bubble">
          <div class="message-sender">${elem.user}</div>
          <p>${elem.message}</p>
        </div>
      </div>
      `;
      });

      log.innerHTML = message;
    });
}

firstLoad();
