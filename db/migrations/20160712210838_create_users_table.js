exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.string('password');
    table.timestamp('created_at');
    table.timestamp('updated_at')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
