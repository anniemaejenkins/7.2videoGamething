
const Game = require('../models/games');

module.exports = {
  edit: function(req, res) {
    let id = req.params.id;
    Game.update({_id: id}).then(newGame => {
      newGame.title = req.body.title;

  });
}
};
//added another controller because adding an edit button seemed to make it delete as well.
