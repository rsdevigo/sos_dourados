var express = require('express');
var router = express.Router();
var db = require('../model/db');
var User = require('../model/user');
var bcrypt = require('bcrypt');
const passport = require('passport');

/* GET users listing. */
router.get('/users', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new User(db);
  try {
    model.findAll(function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});

router.get('/user', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new User(db);
  try {
    model.find.by.id(req.user.id, function(error, results, fields) {
      if (error) throw error;
      if (results.length == 0) throw error;
      res.send(results[0]);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});

router.post('/user', function(req, res, next) {
  var user = {
    email: req.body.email,
    senha: req.body.password,
    nome: req.body.nome
  };
  let model = new User(db);
  try {
    model.find.by.email(user.email, function(error, results, fields){
      if (results.length == 0 ) {
        bcrypt.genSalt(10, function(err, salt){
          if(err) throw err;
          bcrypt.hash(user.senha, salt, (err, hash) => {
            if(err) throw err;
            user.senha = hash;
            model.create(user, function(error, results, fields) {
              if (error) throw error;
              res.send({message: 'Usuário cadastrado com sucesso'});
            });
          });
        });
      } else {
        res.send({message: 'Email já cadastrado', error: true});
      }
    })
    
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com o cadastro', error: true});
  }
});

module.exports = router;
