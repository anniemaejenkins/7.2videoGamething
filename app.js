const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const Game = require('./models/games');
const gameController = require('./controllers/gameController');
const editController = require('./controllers/editController');
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

app.get('/detail/:id', gameController.detail)
// app.get('/', gameController.edit);

app.post('/delete/:id', gameController.delete);

//
app.post('/edit/:id', gameController.edit);

//trying to update text
app.put('/detail/:id', function(req, res){
  Game.findById(req.params.id, function(err, game){
    if(err){
      res.status(500).send(err);
    }else{
      game.title = req.body.title || game.title;
      game.year = req.body.year || game.year;
      game.country = req.body.country || game.country;

      game.save(function(err, game){
        if(err){
          res.status(500).send(err);
        }
        res.send(game);
      });
    }
  });
});


//entering new game
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

//function to edit text
// function editGame(){
//   document.getElementById('title').innerHTML = 'editTitle';
// }

// const game = new Game({title: "Tales of Destiny"});
// game.save();
//
// const released = {year: 1997, country: "Japan"}
// game.release.push(released);
// game.save();

// console.log(Game);
app.listen(3000);
