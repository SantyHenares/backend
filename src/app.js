import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";
import views from "./routes/views.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import userModel from "./dao/models/user.model.js";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import inicializatePassport from "./config/passport.config.js";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ijkaujy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const socketServer = new Server(httpServer);

const environment = (async) => {
  try {
    mongoose.connect(STRING_CONNECTION, (error) => {
      if (error) {
        process.exit();
      } else {
        userModel
          .find()
          .explain("executionStats")
          .then((result) => {
            console.log("hola");
          });
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

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", views);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "http://localhost:3001/",
      "http://localhost:8080/",
    ],
  })
);
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: STRING_CONNECTION,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "lasbdljasd",
    resave: false,
    saveUninitialized: false,
  })
);
inicializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/setSignedCookie", (req, res) => {
  res.cookie("ejemplocookie", "cookie", {
    maxAge: 10000,
    httpOnly: true,
    signed: true,
  });
  res.send("cookie seteada");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Sesion finalizada");
    }
  });
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado.");
  socket.on("productsRealTime", () => {
    listadoDeProductos(ContainerRealTime);
  });
});
