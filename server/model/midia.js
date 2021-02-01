'use strict'

var Model = require('./model');

class Midia extends Model {
    constructor(db) {
      super(db, 'midia');
    }

    id (id, callback) {
      this._find('id', id, callback);
    }

  }

  module.exports = Midia;