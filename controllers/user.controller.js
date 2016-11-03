const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../config/config.js");

module.exports = {
  create: function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) {
        res.send({error: err});
      } else {
        var token = jwt.sign({_id: user._id}, secret);
        res.json({user: {username: user.username, _id: user._id}, token: token});
      }
    })
  },
  show: function(req, res) {
    User.findOne({
      _id: req.params.id
    })
    .populate("bets")
    .exec(function(err, user) {
      if (err) {
        res.send({error: err})
      } else {
        res.json({user: {username: user.username, _id: user._id}, bets: user.bets});        
      }
    })
  }
}
