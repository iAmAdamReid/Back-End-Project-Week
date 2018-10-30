
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(t){
        // set values for each note
        // auto increment ID
        t.increments();
        // set title string
        t.string('title', 255).notNullable();
        // set content string
        t.string('content', 255).notNullable();
        // set tags string (comma separated list)
        t.string('tags', 255).notNullable();
        // set completed value to false
        t.boolean('complete').notNullable().defaultTo(false);
        // set timestamp
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        // set a user ID for each note
        t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  
};
