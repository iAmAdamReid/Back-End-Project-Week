
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'dude', password: 'password'},
        {id: 2, username: 'dude2', password: 'password'},
        {id: 3, username: 'dude3', password: 'password'}
      ]);
    });
};
