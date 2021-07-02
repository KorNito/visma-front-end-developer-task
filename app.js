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
    const storedPizzas = [
      {
        name: "Pizza1",
        price: 1.0,
        heat: 2,
        toppings: ["tomato, cheese"],
        photo: "",
      },
      {
        name: "Pizza2",
        price: 2.0,
        heat: 3,
        toppings: ["cheese, salami"],
        photo: "",
      },
    ];

    const pizzas = storedPizzas;

    pizzas.forEach((pizza) => UI.addPizza(pizza));
  }

  static addPizza(pizza) {
    const pizzaList = document.querySelector(".pizza-list");

    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza");

    const pizzaLi = document.createElement("li");
    pizzaLi.classList.add("pizza-item");

    pizzaLi.innerHTML = `
        <p>${pizza.name}<p/>
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

document.addEventListener("DOMContentLoaded", UI.displayPizzas);

document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector(".name-input").value;
  const price = document.querySelector(".price-input").value;
  const heat = document.querySelector(".heat-input").value;
  const toppings = document.querySelector(".toppings-input").value;
  const photo = document.querySelector(".photo-input").value;

  const pizza = new Pizza(name, price, heat, toppings, photo);

  UI.addPizza(pizza);

  UI.clearFormInputs();
});

document.querySelector(".pizza-list").addEventListener("click", (event) => {
  UI.removePizza(event.target);
});
