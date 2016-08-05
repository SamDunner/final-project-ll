exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex('maps').insert({map_id: 1, title: 'Food trucks', location: 'Vancouver', longitude: 49.2827, latitude: -123.1207, privacy: true, published: true}),
        knex('maps').insert({map_id: 2, title: 'Coffee shops', location: 'London', longitude: 51.5074, latitude: -0.1278, privacy: true, published: false}),
        knex('maps').insert({map_id: 3, title: 'Theatres', location: 'New York', longitude: 40.7128, latitude: -74.0059, privacy: false, published: true})
      ]);
    });
};




