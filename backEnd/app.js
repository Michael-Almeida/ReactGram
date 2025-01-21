require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//solve cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Remover a barra no final
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//Routes
const router = require("./routes/Router.js");
app.use(router);

// upload diretory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB conection
require("./config/db.js");

// Config JSON and Form data response

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`App rodando na port ${port}`));
