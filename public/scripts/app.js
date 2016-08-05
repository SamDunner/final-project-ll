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
    url: "/users/:id/maps"
  }).done((maps) => {
    for(map of maps) {
      $("<div>").text(user.name).appendTo($("body"));
      console.log(map);
    }
  });;
});
