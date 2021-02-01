var express = require('express');
var router = express.Router();
var db = require('../model/db');
var Midia = require('../model/midia');
var bcrypt = require('bcrypt');
const passport = require('passport');
var multer  = require('multer');
var path = require('path');
var uuid4 = require('uuid4');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/photos/')
    },
    filename: function (req, file, cb) {
      cb(null, uuid4() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage });

/* GET users listing. */
router.post('/midia', passport.authenticate('jwt', {session: false}), upload.single('photo'), function(req, res, next) {
    let model = new Midia(db);
    let midia = {
        tipo_midia: 1,
        tamanho_midia: req.file.size,
        nome_arquivo: req.file.filename
    }
    try {
        model.create(midia, function(error, results, fields) {
            if (error) throw error;
            res.send({midia: {id: results.insertId}});
        });
      } catch (e) {
        console.log(e);
        res.send({message: 'Houve um erro com a requisição', error: true});
      }
});

module.exports = router;