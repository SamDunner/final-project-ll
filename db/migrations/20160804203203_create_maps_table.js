exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('map_id').primary();
    table.string('title');
    table.string('location');
    table.float('latitude');
    table.float('longitude');
    table.boolean('privacy');
    table.boolean('published')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
