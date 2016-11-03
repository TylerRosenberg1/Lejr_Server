const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../config/config.js");
const bcrypt = require("bcrypt");

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
  signin: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) {
        res.send({error: err});
      } else {
        if (!user) {
          res.send({error: "Incorrect username or password"});
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, matched) {
            if (err) {
              res.send({error: "Incorrect username or password"});
            } else {
              var token = jwt.sign({_id: user._id}, secret);
              res.json({user: {username: user.username, _id: user._id}, token: token});
            }
          })
        }
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
