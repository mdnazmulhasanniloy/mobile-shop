const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/")
  .get(userController?.getUsers)
  .post(userController?.createUsers);

router
  .route(`/:id`)
  .put(userController?.updateUser)
  .delete(userController?.deleteUser);

module.exports = router;
