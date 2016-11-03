const User = require("../models/user.model");
const Bet = require("../models/user.model");

module.exports = {
  create: function(req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          res.send({error: err})
        } else {
          user.bets.unshift({
            friendName: req.body.friendName,
            betName: req.body.betName,
            amount: req.body.amount
          });
          user.save(function(err) {
            if (err) {
              res.send({error: err});
            } else {
              res.json(user.bets[0]);
            }
          })
        }
      })
  },
  update: function(req, res) {
    User.findOneAndUpdate({
      _id: req.params.id,
      'bets._id': req.params.betId
    }, {'bets.$.status': "completed", 'bets.$.outcome': req.params.outcome}, function(err, response) {
      if (err) {
        res.send({error: err});
      } else {
        res.json(response);
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: req.params.id,
      'bets._id': req.params.betId
    }, { $pull: {'bets': {_id: req.params.betId } } }, function(err, response) {
      if (err) {
        res.send({error: err});
      } else {
        res.status(200).send();
      }
    })
  }
}
