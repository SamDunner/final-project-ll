
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pin_content', function(table) {
    table.increments('content_id').primary();
    table.text('content');
    table.text('image_url');
    table.integer('pin_id');
    table.foreign('pin_id').references('pins.pin_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pin_content');
};
