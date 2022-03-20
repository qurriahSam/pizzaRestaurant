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
    gluttenFree: 300,
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
    let total = 0;

    function Receipt(price, crust, toppings, size, amount) {
      this.price = price;
      this.crust = crust;
      this.toppings = toppings;
      this.size = size;
      this.amount = amount;
    }

    let getChoice = (menuChoice) => {
      menuChoice.map((choice) => {
        userChoices.push($(`#${choice}Select`).val());
      });
      validateChoice(userChoices);
    };

    let validateChoice = (userChoices) => {
      userChoices.map((choice) => {
        if (choice == "" || choice == "0") {
          isValid = false;
        }
      });
      errorReport(isValid);
    };

    let errorReport = (isValid) => {
      if (!isValid) {
        $("#message").text("Kindly fill all Sections.");
      } else {
        getTotal(userChoices);
      }
    };

    let getTotal = (choicesArr) => {
      let tots = 0;
      for (let i = 0; i < choicesArr.length - 1; i++) {
        tots += prices[choicesArr[i]];
      }
      total = tots * parseInt(choicesArr[3]);
    };
    getChoice(menuChoice);

    let [size, toppings, crust, amount] = userChoices;

    console.log(size, toppings, crust, amount);

    console.log(total);
  });
});
