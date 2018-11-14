'use strict'

class Model {
  constructor(db, name) {
    this.db = db;
    this.name = name;
  }

  get find() {
    return this;
  }

  get by() {
    return this;
  }

  findAll (callback) {
    this.db.query('SELECT * FROM '+this.name, callback);
  }

  _find(field, needle, callback) {
    this.db.query('SELECT * FROM '+this.name+' WHERE '+field+' = ?', [needle], callback);
  }

  create (data, callback) {
    this.db.query('INSERT INTO '+this.name+' SET ?', data, callback);
  }

  delete (id, callback) {
    this.db.query('DELETE FROM '+this.name+' WHERE id = '+ id, data, callback);
  }

  update (data, callback) {
    this.db.query('UPDATE '+this.name+' SET ? ', data, callback);
  }
};

module.exports = Model;