require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//Routes
const router = require("./routes/Router.js");
app.use(router);

//solve cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// upload diretory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB conection
require("./config/db.js");

// Config JSON and Form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`App rodando na port ${port}`));
