
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, truncates existing ID increment
  return knex('notes').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'test note title', content: 'test content 1', tags: 'test, note', user_id: '1'},
        {id: 2, title: 'test title 2', content: 'test content 2', tags: 'test', user_id: '1'},
        {id: 3, title: 'test title 3', content: 'test content 3', tags: 'test', user_id: '2'},
        {id: 4, title: 'test title 4', content: 'test content 4', tags: 'test', user_id: '2'},
      ]);
    });
};
