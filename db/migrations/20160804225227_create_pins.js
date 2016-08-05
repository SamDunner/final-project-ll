exports.up = function(knex, Promise) {
  return knex.schema.createTable('pins', function (table) {
    table.increments('pin_id').primary();
    table.string('title');
    table.string('description');
    table.string('rating');
    table.float('latitude');
    table.float('longitude');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.integer('map_id');
    table.foreign('map_id').references('maps.map_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins');
};
