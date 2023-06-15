import { options } from "../options.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: options.gmail.adminGmail,
    pass: options.gmail.adminPass,
  },
});

export const sendRecoveryEmail = async (email, token) => {
  const link = `http://localhost:8080/reset-password?token=${token}`; //enlace con token

  await transporter.sendMail({
    from: "Pelis pelis pelis",
    to: email,
    subject: "email de recuperacion de contraseña",
    html: `
            <h3>Hola,</h3>
            <p>recibimos tu solicitud para recuperar la constraseña, da clic en el siguiente botón</p>
            <a href="${link}">
                <button>Restablecer contraseña</button>
            </a>
        `,
  });
};

export const sendTicket = async (email, ticket) => {
  try {
    await transporter.sendMail({
      from: "Santi Henares",
      to: email,
      subject: "Ticket de compra",
      html: `
        <h1>¡Compra realizada!</h1>
        <div>Codigo: ${ticket.code}</div>
        <div>Fecha: ${ticket.purchase_datetime}</div>
        <div>Total: $${ticket.amount}</div>
        <div>Muchas gracias y siga comprando!</div>
      `,
    });
    console.log("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
