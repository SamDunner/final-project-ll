exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('location');
    table.float('latitude');
    table.float('longitude');
    table.boolean('privacy');
    table.boolean('published')
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.integer('user_id');
    table.foreign('user_id').references('users.id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
