const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3798;

// Parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

// Static file
app.use(express.static("public"));

// Template engine
app.engine(
  "hbs",
  expressHbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", expressHbs);

// Database connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the db
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`Connection ID: ${connection.threadId}`);
});

// Routes
const routes = require("./server/routes/user");
app.use("", routes);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
