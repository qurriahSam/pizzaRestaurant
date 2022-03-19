$(document).ready(function () {
  let select = ["delivery", "delicious", "affordable"];
  select.map((elem) => {
    $(`#${elem}`).click(function () {
      $(`#${elem}Text`).toggleClass("d-none");
      $(`#${elem}Img`).toggleClass("d-none");
    });
  });
});
