const dotenv = require("dotenv").config();

// db info 
exports.db_url = process.env.DATABASE_URL;
exports.port = process.env.SERVER_PORT;
exports.nod_env = process.env.NODE_ENV; 

//token
exports.access_Token = process.env.ACCESS_TOKEN;

