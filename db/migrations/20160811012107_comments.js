
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('comment_id').primary();
    table.text('description');
    table.integer('rating');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('user_id');
    table.foreign('user_id').references('users.user_id')
    table.integer('map_id');
    table.foreign('map_id').references('maps.map_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
