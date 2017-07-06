const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {type: String, required: true},
  release: [{
    year: {type: Number, required: true},
    country: {type: String, required: true}
  }]

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
