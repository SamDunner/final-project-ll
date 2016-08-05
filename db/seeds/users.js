exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({user_id: 1, first_name: 'Alice', last_name: 'Smith', username: 'alicesmith', email: 'alicesmith@gmail.com', password: 'password'}),
        knex('users').insert({user_id: 2, first_name: 'John', last_name: 'Doe', username: 'johndoe', email: 'johndoe@gmail.com', password: 'password'}),
        knex('users').insert({user_id: 3, first_name: 'james', last_name: 'Jones', username: 'jamesjones', email: 'jamesjones@gmail.com', password: 'password'})
      ]);
    });
};
