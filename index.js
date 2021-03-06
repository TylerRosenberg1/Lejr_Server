// EXPRESS SETTINGS
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
app.listen(port);

// CORS SETTINGS
const cors = require("cors");
app.use(cors());

// MONGOOSE CONNECTION SETTINGS
const mongoose = require("mongoose");
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/lejr';
mongoose.connect(mongoUri);

// BODY PARSER SETTINGS
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// JWT-EXPRESS SETTINGS
const secret = require("./config/config");

// CONTROLLER IMPORTS
const UserController = require("./controllers/user.controller");
const BetController = require("./controllers/bet.controller");

// ROUTE IMPORTS
app.post("/user/signup", UserController.create);
app.post("/user/signin", UserController.signin);
app.get("/api/user/:id", UserController.show);

app.post("/api/user/:id/bet/create", BetController.create);
app.put("/api/user/:id/bet/:betId/update/:outcome", BetController.update);
app.delete("/api/user/:id/bet/:betId/destroy", BetController.destroy);
