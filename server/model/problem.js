'use strict'

var Model = require('./model');
var _ = require('underscore');

class Problem extends Model {
    constructor(db) {
      super(db, 'reclamacao');
    }

    create (problem, categories, callback) {
      var self = this;
      this.db.query('INSERT INTO '+this.name+' SET ?', problem, function(error, results, fields) {
        if (error) return callback(error, results);
        let problemId = results.insertId;
        var done = _.after(Object.keys(categories).length, function () {
          callback(error, results);
        });

        self.db.query('INSERT INTO reclamacao_estado_reclamacao SET ?', {id_reclamacao : problemId, id_estado_reclamacao : 1}, (error, results, fields) => {
          Object.keys(categories).forEach(key => {
            if (categories[key]) {
              self.db.query('INSERT INTO categoria_reclamacao SET ?', {id_reclamacao : problemId, id_categoria : key}, (error, results, fields) => {
                done();
              });
            } else {
              done();
            }
          })
        });
      });
    }

    listAll (user_id, callback) {
      var self = this;
      this.db.query('SELECT * FROM reclamacao WHERE id_usuario = ? ORDER BY reclamacao_criado_em DESC;', [user_id], function(error, results, fields) {
        if (error) return callback(error, results);
        var done = _.after(results.length, function () {
          callback(error, results);
        });
        if (results.length == 0) {
          return callback(error, results);
        }
        results.forEach(result => {
          self.db.query('SELECT * FROM categoria_reclamacao LEFT JOIN categoria ON categoria_reclamacao.id_categoria = categoria.id WHERE id_reclamacao = ?;', [result.id], function(error, results, fields) {
            result.categories = [];
            for (var i = 0; i < results.length; i++ ){
              result.categories.push(results[i].nome_categoria);
            }
            self.db.query('SELECT * FROM reclamacao_estado_reclamacao LEFT JOIN estado_reclamacao ON reclamacao_estado_reclamacao.id_estado_reclamacao = estado_reclamacao.id WHERE id_reclamacao = ? ORDER BY reclamacao_estado_reclamacao_criado_em DESC', [result.id], function(error, results) {
              result.states = results;
              self.db.query('SELECT * FROM midia WHERE id = ? LIMIT 1', [result.id_midia], (error, results, fields) => {
                if(results.length != 0) {
                  result.photo = results[0].nome_arquivo;
                }
                done();
              })
              
            });
          });
        });
      });
    }

    id (id, callback) {
      var self = this;
      console.log(id);
      this._find('id', id, function(error, results, fields) {
        if (error) return callback(error, results);
        var result = results[0];
        self.db.query('SELECT * FROM categoria_reclamacao LEFT JOIN categoria ON categoria_reclamacao.id_categoria = categoria.id WHERE id_reclamacao = ?;', [result.id], function(error, results, fields) {
          result.categories = [];
          for (var i = 0;i < results.length; i++ ){
            result.categories.push(results[i].nome_categoria);
          }
          self.db.query('SELECT * FROM reclamacao_estado_reclamacao LEFT JOIN estado_reclamacao ON reclamacao_estado_reclamacao.id_estado_reclamacao = estado_reclamacao.id WHERE id_reclamacao = ? ORDER BY reclamacao_estado_reclamacao_criado_em DESC', [result.id], function(error, results) {
            result.states = results;
            self.db.query('SELECT * FROM midia WHERE id = ? LIMIT 1', [result.id_midia], (error, results, fields) => {
              if(results.length != 0) {
                result.photo = results[0].nome_arquivo;
              }
              callback(error, result, fields);
            })
          });
        });
      });
    }

  }

  module.exports = Problem;