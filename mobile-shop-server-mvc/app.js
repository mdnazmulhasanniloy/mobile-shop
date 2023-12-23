const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment");

app.use(express.json());
app.use(cors());

const ErrorHandler = require("./middlewares/globalErrorHandler");
const UserRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", productRouter);

app.get("/", async (req, res, next) => {
  try {
    res.send(`simple maya reade server is running`);
  } catch (error) {
    throw next(error);
  }
});

// rout not defiant
app.all("*", (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

//middlewares
app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});

module.exports = app;
