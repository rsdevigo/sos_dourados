var express = require('express');
var router = express.Router();
var db = require('../model/db');
var Problem = require('../model/problem');
var bcrypt = require('bcrypt');
const passport = require('passport');
var fetch = require('isomorphic-fetch');

/* GET users listing. */
router.get('/problems/:filter', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new Problem(db);
  try {
    model.listAll(req.user.id, function(error, results, fields) {
      if (error) throw error;
      if (req.params.filter != 'Todas') {
        results = results.filter(function(result){
          return result.states[0].nome_est_rec == req.params.filter;
        });
      }
      res.send(results);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});

router.get('/problem/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new Problem(db);
  try {
    model.find.by.id(req.params.id, function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Houve um erro com a requisição', error: true});
  }
});


const _getGeoCode = async (address) => {
    address = encodeURI(address);
    try {
      let result = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+process.env.GOOGLE_MAPS_API_KEY);
      if (result.status != 200) throw result;
      result = await result.json();
      if (result.status == "OK") {
        return {
          local_lat: result.results[0].geometry.location.lat,
          local_long: result.results[0].geometry.location.lng
        }
      } else {
        return {
          local_lat: 0.0,
          local_long: 0.0
        }
      }
    } catch(e) {
      return {
        local_lat: 0.0,
        local_long: 0.0
      }
    }
};

//Pegar a geolocalizacao com o geocoding
router.post('/problem', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let model = new Problem(db);
  let address = `${req.body.endereco}, ${req.body.numero}, ${req.body.bairro}`;
  _getGeoCode(address).then((coord) => {
    let problem = {
      endereco: req.body.endereco,
      bairro: req.body.bairro,
      numero: req.body.numero,
      descricao: req.body.descricao,
      id_usuario: req.user.id,
      id_midia: req.body.id_midia,
      ...coord
    };
    let categories = req.body.categorias;
    try {
      model.create(problem, categories, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    } catch (e) {
      console.log(e);
      res.send({message: 'Houve um erro com a requisição', error: true});
    }
  });
});

module.exports = router;
