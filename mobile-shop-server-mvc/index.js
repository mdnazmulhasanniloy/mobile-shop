const mongoose = require("mongoose");
const colors = require("colors");
const app = require("./app");
const { port, db_url } = require("./config");
// const moment = require("moment");
//database connection

mongoose
  .connect(db_url)
  .then(() => {
    console.log(`Database connection successful`.green.bold);
  })
  .catch((err) => console.log(`Database connection failed`.red.bold));

//server
const Port = port || 5000;

// console.log(moment().format());

app.listen(port, () => {
  console.log(`Simple mobile shop app is running on prot ${Port}`.yellow.bold);
});
