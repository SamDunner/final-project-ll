exports.seed = function(knex, Promise) {
  return knex('pins').del()
    .then(function () {
      return Promise.all([
        knex('pins').insert({pin_id: 1, title: 'food 1', description: 'text 1', rating: 4, longitude: 49.2827, latitude: -123.1207, map_id: 1}),
        knex('pins').insert({pin_id: 2, title: 'food 2', description: 'text 2', rating: 7, longitude: 51.5074, latitude: -0.1278, map_id: 2}),
        knex('pins').insert({pin_id: 3, title: 'food 3', description: 'text 3', rating: 9, longitude: 40.7128, latitude: -74.0059, map_id: 3})
      ]);
    });
};
