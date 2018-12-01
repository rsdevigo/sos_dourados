'use strict'

var Model = require('./model');
var _ = require('underscore');

class Problem extends Model {
    constructor(db) {
      super(db, 'reclamacao');
    }

    listAll (user_id, callback) {
      var self = this;
      this.db.query('SELECT * FROM reclamacao WHERE id_usuario = ? ORDER BY reclamacao_criado_em DESC;', [user_id], function(error, results, fields) {
        var done = _.after(results.length, function () {
          callback(error, results);
        })
        results.forEach(result => {
          self.db.query('SELECT * FROM categoria_reclamacao LEFT JOIN categoria ON categoria_reclamacao.id_categoria = categoria.id WHERE id_reclamacao = ?;', [result.id], function(error, results, fields) {
            result.categories = [];
            for (var i = 0;i < results.length; i++ ){
              result.categories.push(results[i].nome_categoria);
            }
            self.db.query('SELECT * FROM reclamacao_estado_reclamacao LEFT JOIN estado_reclamacao ON reclamacao_estado_reclamacao.id_estado_reclamacao = estado_reclamacao.id WHERE id_reclamacao = ? ORDER BY reclamacao_estado_reclamacao_criado_em DESC', [result.id], function(error, results) {
              result.states = results;
              done();
            });
          });
        });
      });
    }

    id (id, callback) {
      var self = this;
      console.log(id);
      this._find('id', id, function(error, results, fields) {
        var result = results[0];
        self.db.query('SELECT * FROM categoria_reclamacao LEFT JOIN categoria ON categoria_reclamacao.id_categoria = categoria.id WHERE id_reclamacao = ?;', [result.id], function(error, results, fields) {
          result.categories = [];
          for (var i = 0;i < results.length; i++ ){
            result.categories.push(results[i].nome_categoria);
          }
          self.db.query('SELECT * FROM reclamacao_estado_reclamacao LEFT JOIN estado_reclamacao ON reclamacao_estado_reclamacao.id_estado_reclamacao = estado_reclamacao.id WHERE id_reclamacao = ? ORDER BY reclamacao_estado_reclamacao_criado_em DESC', [result.id], function(error, results) {
            result.states = results;
            callback(error, result, fields);
          });
        });
      });
    }

  }

  module.exports = Problem;