//! selecting the elements
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoppingCart");

/**
 * ! bills to hold data , getItem is to get items from localStorage and if blank it become an empty
 */

let bills = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */
let calculation = () => {
  const cartIcon = document.querySelector("#cartAmount");
  let totalItems = bills.map((items) => items.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = totalItems;
};

calculation();

/**
 * ! Generates the Cart Page with product cards
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

let generateCartItems = () => {
  if (bills.length !== 0) {
    return (shoppingCart.innerHTML = bills
      .map((x) => {
        let { id, item } = x;
        let search = shoppingData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="fa fa-close"></i>
          </div>
          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="fa fa-minus"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="fa fa-plus"></i>
            </div>
          </div>
          <h3>$ ${item * price}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="home-btn">Back to Home</button>
        </a>
        `;
  }
};

generateCartItems();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = bills.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    bills.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(bills));
};

/**
 * ! used to decrese the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = bills.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  bills = bills.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(bills));
};

/**
 * ! To update the number of picked items in items cart
 */

let update = (id) => {
  let search = bills.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from bills
 * =
 */

let removeItem = (id) => {
  let selectedItem = id;
  bills = bills.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(bills));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

let TotalAmount = () => {
  if (bills.length !== 0) {
    let amount = bills
      .map((x) => {
        let { id, item } = x;
        let filterData = shoppingData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

const clearCart = () => {
  bills = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(bills));
};
