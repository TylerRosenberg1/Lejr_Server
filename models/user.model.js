const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const BetSchema = new Schema({
  friendName: {
    type: String,
    required: true,
    max: [21, "Friend name cannot be more than 21 characters long"]
  },
  betName: {
    type: String,
    required: true,
    max: [60, "Bet name cannot be more than 60 characters long"]
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "active"
  },
  outcome: {
    type: String,
    default: null
  }
});

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "You must enter a username"],
    min: [1, "Username must be at least 1 character long"],
    max: [14, "Username cannot be more than 14 characters long"]
  },
  password: {
    type: String,
    required: [true, "You must enter a password"],
    min: [7, "Password must be at least 7 characters long"],
    max: [17, "Password cannot be more than 17 characters long"]
  },
  bets: [BetSchema]
});

UserSchema.pre("save", function(next) {
  var hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  this.password = hash;
  next();
})

module.exports = mongoose.model("User", UserSchema);
