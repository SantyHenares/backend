import __dirname from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion api de ecommerce",
      version: "1.0.0",
      description: "Definicion de endpoints para la API de mi proyecto final",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecs = swaggerJsDoc(swaggerOptions);
