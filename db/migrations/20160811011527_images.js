
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', function(table) {
    table.increments('image_id').primary();
    table.text('image_url');
    table.integer('pin_id');
    table.foreign('pin_id').references('pins.pin_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
