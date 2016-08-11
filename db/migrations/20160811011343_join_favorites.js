
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table) {
    table.increments('favorite_id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('users.user_id')
    table.integer('map_id');
    table.foreign('map_id').references('maps.map_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
