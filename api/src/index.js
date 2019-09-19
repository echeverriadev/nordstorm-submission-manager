require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RouteLoader = require("./routes");
const logRequest = require("./middlewares/logRequest");
const cookieParser = require("cookie-parser");
let app = express();

const port = process.env.PORT;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FIS_WEB_BASE_URL,
    credentials: true
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

app.use(logRequest);
app = RouteLoader.load(app);

let nodeHost = process.env.NODE_HOST;

app.listen(port, nodeHost, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
