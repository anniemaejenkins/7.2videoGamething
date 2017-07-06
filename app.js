const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const Game = require('./models/games');
const gameController = require('./controllers/gameController');
const bodyParser = require('body-parser');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('vies', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/gamesdb');

app.get('/', gameController.list);

app.post('/', function(req, res){
  console.log(req.body);

  var myData = new Game(req.body);
  myData.save().then(item => {
    res.send("saved to database");
  })
  .catch(err => {
    res.status(400).send("unable to save");
  });
  res.redirect('/');
});


// const game = new Game({title: "Tales of Destiny"});
// game.save();
//
// const released = {year: 1997, country: "Japan"}
// game.release.push(released);
// game.save();

// console.log(Game);
app.listen(3000);
