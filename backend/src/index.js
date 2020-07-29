const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(routes);

app.listen(3000, () => console.log("The server is listening on port 3000"));
