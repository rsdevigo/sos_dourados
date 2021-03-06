var express = require('express');
var db = require('../model/db');
var User = require('../model/user');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET home page. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var user = {
    email: req.body.email,
    senha: req.body.password,
  };
  let model = new User(db);
  try {
    model.find.by.email(user.email, function(error, results, fields) {
      if (error) throw error;
      if (results.length != 0) {  
        bcrypt.compare(user.senha, results[0].senha).then(function(isMatch) {
            if (isMatch) {
              const payload = {
                id: results[0].id,
                email: user.email
              };
              jwt.sign(payload, 'secret', { expiresIn: 36000 }, (err, token) => {
                if (err) res.status(500).json({ error: true, message: err });
                res.json({token: token });
              }); 
            } else {
              res.status(401).send({message: 'Senha não confere', error: true});
            }
        });
      } else {
        res.status(401).send({message: 'Email não cadastrado', error: true});
      }
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com o login', error: true});
  }
});

module.exports = router;
