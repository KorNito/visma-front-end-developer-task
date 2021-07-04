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
    toppingsInputValue
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

    if (toppingsInputValue.length < 2) {
      UI.showErrorMessage(".toppings-error", "Minimum of 2 toppings required");
      return true;
    }

    return false;
  }
}

class UI {
  static displayPizzas() {
    const pizzas = Storage.getPizzas();

    pizzas.forEach((pizza) => UI.addPizzaToList(pizza));
  }

  static addPizzaToList(pizza) {
    const list = document.querySelector(".pizza-list");

    const listItem = document.createElement("li");
    listItem.classList.add("pizza");

    const pizzaPhotoImg = document.createElement("img");
    pizzaPhotoImg.classList.add("pizza-photo");
    if (pizza.photo === "") {
      pizzaPhotoImg.src = "assets/PizzaPhotos/Pizza1.jpeg";
    }
    pizzaPhotoImg.src = pizza.photo;
    pizzaPhotoImg.alt = pizza.name;
    listItem.appendChild(pizzaPhotoImg);

    const pizzaNameParagraph = document.createElement("p");
    pizzaNameParagraph.classList.add("pizza-name");
    pizzaNameParagraph.innerText = pizza.name;
    listItem.appendChild(pizzaNameParagraph);

    const pizzaPriceParagraph = document.createElement("p");
    pizzaPriceParagraph.classList.add("pizza-price");
    pizzaPriceParagraph.innerText = `Price: ${pizza.price}$`;
    listItem.appendChild(pizzaPriceParagraph);

    const pizzaHeatParagraph = document.createElement("p");
    pizzaHeatParagraph.classList.add("pizza-heat");
    pizzaHeatParagraph.innerText = "Heat: ";
    for (let i = 1; i <= pizza.heat; i++) {
      const pepperImg = document.createElement("img");
      pepperImg.classList.add("pepper-img");
      pepperImg.src = "assets/ChilliPepper/ChilliPepper.svg";
      pizzaHeatParagraph.appendChild(pepperImg);
    }
    listItem.appendChild(pizzaHeatParagraph);

    const pizzaToppingsParagraph = document.createElement("p");
    pizzaToppingsParagraph.classList.add("pizza-toppings");
    pizzaToppingsParagraph.innerText = `Toppings: ${pizza.toppings.join(", ")}`;
    listItem.appendChild(pizzaToppingsParagraph);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
  }

  static deletePizza(element) {
    if (element.classList.contains("delete-button")) {
      element.parentElement.remove();
    }
  }

  static clearInputFields() {
    const name = (document.querySelector(".name-input").value = "");
    const price = (document.querySelector(".price-input").value = "");
    const heat = (document.querySelector(".heat-input").value = 1);
    const form = document.querySelector(".form");
    const inputs = form.getElementsByTagName("input");
    for (let i = 0, max = inputs.length; i < max; i++) {
      if (inputs[i].type === "checkbox") {
        inputs[i].checked = false;
      }
    }
    const photo = (document.querySelector(".photo-input").value = "");

    UI.clearErrorMessages();
  }

  static showErrorMessage(className, message) {
    document.querySelector(className).innerText = message;
  }

  static clearErrorMessages() {
    document.querySelector(".name-error").innerText = "";
    document.querySelector(".price-error").innerText = "";
    document.querySelector(".toppings-error").innerText = "";
  }

  static deleteConfirmation(pizzaName) {
    return confirm(`Are you sure you want to delete ${pizzaName}?`);
  }

  static filterByValue(value) {
    const storedPizzas = Storage.getPizzas();
    let sortedList = [];

    switch (value) {
      case "name":
        sortedList = storedPizzas.sort(
          (a, b) => a.name.toLowerCase() - b.name.toLowerCase()
        );
        break;
      case "price":
        sortedList = storedPizzas.sort((a, b) => a.price - b.price);
        break;
      case "heat":
        sortedList = storedPizzas.sort((a, b) => a.heat - b.heat);
        break;
      default:
        sortedList = storedPizzas.sort(
          (a, b) => a.name.toLowerCase() - b.name.toLowerCase()
        );
    }

    return sortedList;
  }
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
  const form = document.querySelector(".form");
  const inputs = form.getElementsByTagName("input");
  const toppings = [];

  for (let i = 0, max = inputs.length; i < max; i++) {
    if (inputs[i].type === "checkbox" && inputs[i].checked) {
      toppings.push(inputs[i].value);
    }
  }

  const photo = document.querySelector(".photo-input").value;

  if (Validator.validateInputsOnSubmit(name, price, toppings)) {
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

    UI.addPizzaToList(pizza);

    Storage.addPizza(pizza);

    UI.clearInputFields();
  }
});

document.querySelector(".pizza-list").addEventListener("click", (event) => {
  const targetedElementPizzaName =
    event.target.parentElement.children[1].textContent;

  if (UI.deleteConfirmation(targetedElementPizzaName)) {
    UI.deletePizza(event.target);

    Storage.removePizza(targetedElementPizzaName);
  }
});

document.querySelector(".pizza-filter").addEventListener("change", (event) => {
  const filterValue = event.target.value;

  const filteredList = UI.filterByValue(filterValue);

  oldList = document.querySelector(".pizza-list");

  oldList.innerHTML = "";

  filteredList.forEach((pizza) => UI.addPizzaToList(pizza));
});
