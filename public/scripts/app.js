$(() => {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/users/:user_id/maps"
  }).done((maps) => {
    for(map of maps) {
      $("<div>").text(user.name).appendTo($("body"));
      console.log(map);
    }
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/users/:user_id/maps/:map_id/pins"
  }).done((pins) => {
    for(pin of pins) {
      $("<div>").text(user.name).appendTo($("body"));
      console.log(pin);
    }
  });;
});
