class Pizza {
  constructor(name, price, heat, toppings, photo) {
    this.name = name;
    this.price = price;
    this.heat = heat;
    this.toppings = toppings;
    this.photo = photo;
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
        <p class="pizza-name">${pizza.name}<p/>
        <p>${pizza.price}<p/>
        <p>${pizza.heat}<p/>
        <p>${pizza.toppings}<p/>
        <p>${pizza.photo}<p/>
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
    document.querySelector(".heat-input").value = "";
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
  event.preventDefault();

  const name = document.querySelector(".name-input").value;
  const price = document.querySelector(".price-input").value;
  const heat = document.querySelector(".heat-input").value;
  const toppings = document.querySelector(".toppings-input").value;
  const photo = document.querySelector(".photo-input").value;

  if (name === "") {
    UI.showErrorMessage(".name-error", "Name is required");
  } else if (price === "") {
    UI.showErrorMessage(".price-error", "Price is required");
  } else if (toppings === "") {
    UI.showErrorMessage(".toppings-error", "Toppings are required");
  } else {
    const pizza = new Pizza(name, price, heat, toppings, photo);

    UI.addPizza(pizza);

    Storage.addPizza(pizza);

    UI.clearFormInputs();
  }
});

document.querySelector(".pizza-list").addEventListener("click", (event) => {
  UI.removePizza(event.target);

  Storage.removePizza(
    event.target.previousElementSibling.children[0].textContent
  );
});
