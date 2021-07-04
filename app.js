class Pizza {
  constructor(name, price, heat, toppings, photo) {
    this.name = name;
    this.price = price;
    this.heat = heat;
    this.toppings = toppings;
    this.photo = photo;
  }
}

class Validator {
  static validateInputsOnSubmit(
    nameInputValue,
    priceInputValue,
    heatInputValue,
    toppingsInputValue,
    photoInputValue
  ) {
    if (nameInputValue.trim() === "") {
      UI.showErrorMessage(".name-error", "Name is required");
      return true;
    } else {
      const storedPizzas = Storage.getPizzas();

      for (let i = storedPizzas.length - 1; i > -1; i--) {
        if (storedPizzas[i].name === nameInputValue.trim()) {
          UI.showErrorMessage(".name-error", "Name must be unique");
          return true;
        }
      }
    }

    if (priceInputValue.trim() === "") {
      UI.showErrorMessage(".price-error", "Price is required");
      return true;
    } else if (priceInputValue < 0.01) {
      UI.showErrorMessage(".price-error", "Price must be above 0");
      return true;
    }

    return false;
  }
}

class UI {
  static displayPizzas() {
    const pizzas = Storage.getPizzas();

    pizzas.forEach((pizza) => UI.addPizza(pizza));
  }

  static addPizza(pizza) {
    const pizzaList = document.querySelector(".pizza-list");

    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza");

    const pizzaLi = document.createElement("li");
    pizzaLi.classList.add("pizza-item");

    pizzaLi.innerHTML = `
        <p class="pizza-photo">${pizza.photo}<p/>
        <p class="pizza-name">Name: ${pizza.name}<p/>
        <p class="pizza-price">Price: ${pizza.price}$<p/>
        <p class="pizza-heat">Heat: ${pizza.heat}<p/>
        <p class="pizza-toppings">Toppings: ${pizza.toppings}<p/>
        `;
    pizzaDiv.appendChild(pizzaLi);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";
    pizzaDiv.appendChild(deleteButton);

    pizzaList.appendChild(pizzaDiv);
  }

  static showErrorMessage(className, message) {
    document.querySelector(className).innerText = message;
  }

  static clearFormInputs = () => {
    document.querySelector(".name-input").value = "";
    document.querySelector(".price-input").value = "";
    document.querySelector(".heat-input").value = 1;
    document.querySelector(".toppings-input").value = "";
    document.querySelector(".photo-input").value = "";
  };

  static removePizza = (element) => {
    if (element.classList.contains("delete-button")) {
      element.parentElement.remove();
    }
  };
}

class Storage {
  static getPizzas() {
    let pizzas;
    if (localStorage.getItem("pizzas") === null) {
      pizzas = [];
    } else {
      pizzas = JSON.parse(localStorage.getItem("pizzas"));
    }

    return pizzas;
  }

  static addPizza(pizza) {
    const pizzas = Storage.getPizzas();

    pizzas.push(pizza);

    localStorage.setItem("pizzas", JSON.stringify(pizzas));
  }

  static removePizza(name) {
    const pizzas = Storage.getPizzas();

    pizzas.forEach((pizza, index) => {
      if (pizza.name === name) {
        pizzas.splice(index, 1);
      }
    });

    localStorage.setItem("pizzas", JSON.stringify(pizzas));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayPizzas);

document.querySelector(".form").addEventListener("submit", (event) => {
  const name = document.querySelector(".name-input").value;
  const price = document.querySelector(".price-input").value;
  const heat = document.querySelector(".heat-input").value;
  const toppings = document.querySelector(".toppings-input").value;
  const photo = document.querySelector(".photo-input").value;

  const incorrectInputs = Validator.validateInputsOnSubmit(
    name,
    price,
    heat,
    toppings,
    photo
  );

  if (incorrectInputs) {
    event.preventDefault();
  } else {
    const priceAsANumber = parseFloat(price);
    const heatAsANumber = parseInt(heat);

    const pizza = new Pizza(
      name,
      priceAsANumber,
      heatAsANumber,
      toppings,
      photo
    );

    UI.addPizza(pizza);

    Storage.addPizza(pizza);

    UI.clearFormInputs();
  }
});

document.querySelector(".pizza-list").addEventListener("click", (event) => {
  let result = confirm("Are you sure to delete?");
  if (result) {
    UI.removePizza(event.target);
  }

  Storage.removePizza(
    event.target.previousElementSibling.children[0].textContent
  );
});
