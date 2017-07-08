const Game = require('../models/games');

module.exports = {
  list: function(req, res) {
    Game.find({}).then(results => {
      console.log('results', results);
      res.render('game/list', {model: results});
    });
  },
  detail: function(req, res) {
    let id = req.params.id;
    Game.findOne({_id: id}).then(game => {
      res.render('game/detail', {model: game});
    });
  },
  delete: function(req, res) {
    let id = req.params.id;
    Game.deleteOne({_id: id}).then(() => {
      res.redirect('/');
    });
    console.log('this is the delete method');
  },
};
