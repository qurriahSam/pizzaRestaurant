$(document).ready(function () {
  let services = ["delivery", "delicious", "affordable"];
  let menuChoice = ["size", "crust", "toppings", "quantity"];
  let prices = {
    small: 600,
    medium: 1000,
    large: 1200,
    pineapples: 100,
    cheese: 200,
    pepperoni: 300,
    stuffed: 200,
    glutenFree: 300,
    crispy: 400,
  };

  services.map((elem) => {
    $(`#${elem}`).click(function () {
      $(`#${elem}Text`).toggleClass("d-none");
      $(`#${elem}Img`).toggleClass("d-none");
    });
  });

  $("#orderSubmit").click(function (e) {
    e.preventDefault();
    let userChoices = [];
    let isValid = true;

    let getChoice = (menuChoice) => {
      menuChoice.map((choice) => {
        userChoices.push($(`#${choice}Select`).val());
      });
      validateChoice(userChoices);
    };

    let validateChoice = (userChoices) => {
      userChoices.map((choice) => {
        if (choice == "") {
          isValid = false;
        }
      });
    };

    getChoice(menuChoice);
    console.log(isValid);
  });
});
