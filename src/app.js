import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";
import sessionRouter from "./routes/session.js";
import userRouter from "./routes/users.js";
import views from "./routes/views.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import inicializatePassport from "./config/passport.config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { options } from "./config/options.js";
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUi from "swagger-ui-express";

//Ejecución Servidor

const PORT = options.server.port;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const socketServer = new Server(httpServer);
mongoose.set("strictQuery", false);

const environment = (async) => {
  try {
    mongoose.connect(options.mongoDB.url, (error) => {
      if (error) {
        process.exit();
      }
    });
  } catch (error) {
    error;
  }
};
environment();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(errorHandler);
// app.use(addlogger);

//Session

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: options.mongoDB.url,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),
    secret: options.server.secretSession,
    resave: false,
    saveUninitialized: false,
  })
);

//Passport

inicializatePassport();
app.use(passport.initialize());
app.use(passport.session());

//handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routes

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/", views);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/api/session", sessionRouter);
app.get("/loggerTest", (req, res) => {
  req.logger.fatal("error fatal");
  req.logger.error("mensaje de error");
  req.logger.warning("advertencia");
  req.logger.info("ruta solicitada");
  req.logger.http("mensaje de ruta");
  req.logger.debug("mensaje de prueba ignorado");
  res.send("Utilizando logger");
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//Cors

app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "http://localhost:3001/",
      "http://localhost:8080/",
    ],
  })
);

//cookies

app.use(cookieParser());
app.get("/setSignedCookie", (req, res) => {
  res.cookie("ejemplocookie", "cookie", {
    maxAge: 10000,
    httpOnly: true,
    signed: true,
  });
  res.send("cookie seteada");
});

//service

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado.");
  socket.on("productsRealTime", () => {
    listadoDeProductos(ContainerRealTime);
  });
});
