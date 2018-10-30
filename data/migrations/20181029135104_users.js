
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
      // assign user db values
      // auto increment primary key ID
      t.increments();
      // string username
      t.string('username', 255).notNullable().unique();
      // string password (hashed)
      t.string('password', 255).notNullable();
      // set user privileges
      t.string('privileges', 255).notNullable().defaultTo('user');
      // registration date
      t.timestamp('createdAt').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
