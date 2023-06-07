// import { sendTicket } from "../../src/config/messages/gmail";
// import { getPurchase } from "../../src/controllers/cart.controller";

// Finalizar compra

// export const finalizarCompra = (email) => {
//   const ticket = getPurchase();
//   sendTicket(email, ticket);
// };

const addToCart = async (cid, pid) => {
  try {
    if (!cid) {
      //crear carrito para el usuario.
    } else {
      const addCartProduct = await fetch(`/api/carts/${cid}/products/${pid}`, {
        method: "POST",
      });
      console.log("Producto agregado.");
    }
  } catch (err) {
    console.log(err);
  }
};
