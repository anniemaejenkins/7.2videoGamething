
const Game = require('../models/games');

module.exports = {
  list: function(req, res) {
    Game.find({}).then(results => {
      console.log('results', results);
      res.render("game/list", {model: results});

    });
  }
};
