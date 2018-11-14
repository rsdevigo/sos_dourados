'use strict'

var Model = require('./model');

class User extends Model {
    constructor(db) {
      super(db, 'users');
    }

    email (email, callback) {
      this._find('email', email, callback);
    }

    id (id, callback) {
      this._find('id', id, callback);
    }

  }

  module.exports = User;