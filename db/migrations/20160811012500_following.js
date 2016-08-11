
exports.up = function(knex, Promise) {
  return knex.schema.createTable('follows', function(table) {
    table.integer('follower_user_id');
    table.foreign('follower_user_id').references('users.user_id');
    table.integer('following_user_id');
    table.foreign('following_user_id').references('users.user_id')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follows');
};
