const db = require('./dbConfig.js');

  function find() {
    return db('notes');
  }
  
  function findById(id) {
    return db('notes')
      .where({ id: Number(id) })
      .first();
  }
  
  function insert(user) {
    return db('notes')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
  
  function update(id, user) {
    return db('notes')
      .where('id', Number(id))
      .update(user);
  }
  
  function remove(id) {
    return db('notes')
      .where('id', Number(id))
      .del();
  }

  module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
  };