var express = require('express');
var router = express.Router();
var Problem = require('../model/problem');
var bcrypt = require('bcrypt');
const passport = require('passport');

/* GET users listing. */
router.get('/problems/:filter', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new Problem(res.locals.connection);
  
  try {
    model.listAll(req.user.id, function(error, results, fields) {
      if (error) throw error;
      if (req.params.filter != 'Todas') {
        results = results.filter(function(result){
          return result.states[0].nome_est_rec == req.params.filter;
        });
      }
      console.log(results);
      res.send(results);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});

router.get('/problem/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new Problem(res.locals.connection);
  
  try {
    model.find.by.id(1, function(error, results, fields) {
      if (error) throw error;
      console.log(results);
      results.photo = 'lampada.jpg';
      res.send(results);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});

module.exports = router;
