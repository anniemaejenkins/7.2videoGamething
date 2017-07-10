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
  edit: function(req, res) {
    console.log('request', req.body);
    let id = req.params.id;
    Game.findOne({_id: id}).then(function(game){
      //console.log('input', req.body.title);
      game.title = req.body.title;
      game.year = req.body.release.year;
      game.country = req.body.release.country;
      game.save();
      res.redirect('/');
    });
    // Game.update({_id: id}).then(newGame => {
    //   newGame.title = req.body.title;
    // });
  }
};
