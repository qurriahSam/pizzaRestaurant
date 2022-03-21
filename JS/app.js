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
  let total = 0;

  services.map((elem) => {
    $(`#${elem}`).click(function () {
      $(`#${elem}Text`).toggleClass("d-none");
      $(`#${elem}Img`).toggleClass("d-none");
    });
  });

  $("#deliveryCheck").change((e) => {
    if (e.target.checked) {
      $("#locationContainer").slideDown();
    } else {
      $("#locationContainer").slideUp();
    }
  });

  $("#orderSubmit").click(function (e) {
    e.preventDefault();
    let userChoices = [];
    let isValid = true;

    function Receipt(amount, crust, toppings, size, total) {
      this.amount = amount;
      this.crust = crust;
      this.toppings = toppings;
      this.size = size;
      this.total = total;
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
        alert("Kindly fill all Sections.");
      } else {
        getTotal(userChoices);
        $("#checkout").slideDown();
      }
    };

    let getTotal = (choicesArr) => {
      let tots = 0;
      for (let i = 0; i < choicesArr.length - 1; i++) {
        tots += prices[choicesArr[i]];
      }
      total += tots * parseInt(choicesArr[3]);
      outputOrder(userChoices, total);
    };

    let outputOrder = (choicesArr, total) => {
      let [size, toppings, crust, amount] = choicesArr;
      let order = new Receipt(amount, crust, toppings, size, total);

      $("#orders").prepend(`
            <tr >
              <td class="sizeOut"> ${order.size} </td>
              <td class="toppingsOut"> ${order.toppings} </td>
              <td class="crustOut"> ${order.crust} </td>
              <td class="amountOut"> ${order.amount} </td>
            </tr>
      `);

      $("#totalOut").text(total.toString());
    };

    getChoice(menuChoice);
  });

  $("#orderCheckout").click((e) => {
    e.preventDefault();
    let location = $("#userLocation").val();

    let resetter = (menuChoice) => {
      menuChoice.map((choice) => {
        $(`#${choice}Select`).val("");
      });
    };

    if (location.length > 2) {
      alert(`Your order will be delivered to ${location}`);
    } else {
      alert("Your order is being prepared");
    }
    $("#checkout").slideUp();
    resetter(menuChoice);
  });
});
