//! Select items
const productsContainer = document.querySelector(".products-container");

/**
 * ! bills to hold data , getItem is to get items from localStorage and if blank it become an empty
 */
const bills = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shopping cart with product cards
 * ! images, title, price, buttons, description
 */

let generateProducts = () => {
  return (productsContainer.innerHTML = shoppingData
    .map((item) => {
      const { img, id, name, desc, price } = item;
      let search = bills.find((y) => y.id === id) || [];
      return ` <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="fa fa-minus"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="fa fa-plus"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateProducts();

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

  bills = bills.filter((x) => x.items !== 0);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(bills));
};

/**
 * ! To update the number of picked items in items cart
 */

let update = (id) => {
  let search = bills.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */
let calculation = () => {
  const cartIcon = document.querySelector("#cartAmount");
  let totalItems = bills.map((items) => items.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = totalItems;
};

calculation();
