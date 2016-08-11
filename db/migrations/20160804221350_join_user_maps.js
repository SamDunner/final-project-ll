
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_maps', function(table) {
    table.increments('user_map_id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('users.user_id')
    table.integer('map_id');
    table.foreign('map_id').references('maps.map_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_maps');
};
