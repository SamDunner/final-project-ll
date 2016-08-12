exports.up = function(knex, Promise) {
  return knex.schema.createTable('pins', function (table) {
    table.increments('pin_id').primary();
    table.string('title');
    table.integer('sort_order');
    table.string('rating');
    table.float('latitude');
    table.float('longitude');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('map_id');
    table.foreign('map_id').references('maps.map_id');
    table.integer('author_id');
    table.foreign('author_id').references('users.user_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins');
};
