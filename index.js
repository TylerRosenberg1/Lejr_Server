// EXPRESS SETTINGS
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
app.listen(port);

// MONGOOSE CONNECTION SETTINGS
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lejr');

// BODY PARSER SETTINGS
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// JWT-EXPRESS SETTINGS
const expressJwt = require("express-jwt");
const secret = require("./config/config");
// app.use('/api', expressJwt({secret: secret}));

// CONTROLLER IMPORTS
const UserController = require("./controllers/user.controller");

// ROUTE IMPORTS
app.post("/user/signup", UserController.create);
app.get("/api/user/:id", UserController.show);
