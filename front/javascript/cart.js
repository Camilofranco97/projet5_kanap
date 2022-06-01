// take back the products from the localstorage
let selectedProducts = JSON.parse(localStorage.getItem("product"));

let productsLocalStorage = [];
let cartItems = document.getElementById("cart__items");
let orderId = "";

//take back of the article with the api and his id
async function displayProductInfo(id) {
  const result = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (res) => res.json()
  );
  return result;
}

async function start() {
  // display an empty cart
  if (selectedProducts.length == 0 || selectedProducts.length == null) {
    let title = (document.querySelector("h1").textContent = "Panier Vide");
    console.log(title);
    // display selected products
  } else {
    let title = (document.querySelector("h1").textContent = "Votre panier");
    let showItemsAtLocalStorage;
    for (const selectedProduct of selectedProducts) {
      const myData = await displayProductInfo(selectedProduct.productId);
      showItemsAtLocalStorage =
        (showItemsAtLocalStorage ? showItemsAtLocalStorage : "") +
        `
    <article class="cart__item" data-id="${selectedProduct.id}">
      <div class="cart__item__img">
        <img src="${myData.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${myData.name}</h2>
          <p class="price">${myData.price}€</p>
          <p>${selectedProduct.productColor}</p>

        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" id="${selectedProduct.id}"
             class="itemQuantity" name="itemQuantity" min="1"
             max="100" value="${selectedProduct.productQuantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <button id="${selectedProduct.id}" class="deleteItem">Supprimer</button>
          </div>
        </div>
      </div>
    </article>
    `;

      productsLocalStorage.push(selectedProduct.productId);
    }
    cartItems.innerHTML = showItemsAtLocalStorage;
  }
}

function generateEventListener() {
  let inputNumber = document.querySelectorAll(".itemQuantity");
  for (const input of inputNumber) {
    input.addEventListener("click", (e) =>
      changeQuantity(input.value, e.target.id)
    );
  }

  // listen delete button
  let removeBtn = document.querySelectorAll(".deleteItem");
  for (const btn of removeBtn) {
    btn.addEventListener("click", (e) => clickToDelete(e.target.id));
  }
}

// take back the Id of the products in a variable
const productsId = selectedProducts.map((product) =>
  product.productId.toString()
);

function productNewQuantity() {
  let inputNumber = document.querySelectorAll(".itemQuantity");
  for (const input of inputNumber) {
    input.addEventListener("click", (e) => {
      updateCartTotalPrice();
    });
  }
}

function changeQuantity(productQuantity, id) {
  // modify quantity
  let localStorageproducts = [...selectedProducts];
  let filterProduct = localStorageproducts.filter(
    (product) => product.id == id
  )[0];
  filterProduct.productQuantity = productQuantity;
  localStorage.setItem("product", JSON.stringify(localStorageproducts));
  updateCartTotalPrice();
  updateArticlesCartTotal();
}

// delete a product
function clickToDelete(id) {
  selectedProducts.splice(id, 1);
  localStorage.setItem("product", JSON.stringify(selectedProducts));
  let removeCard = document.querySelectorAll(".cart__item");
  for (const displayOff of removeCard) {
    displayOff.addEventListener("click", (e) => {
      displayOff.style.display = "none";
      console.log(displayOff);
    });
  }
  location.reload();
}

function updateCartTotalPrice() {
  let total = 0;
  const cartTotalPrice = document.querySelector("#totalPrice");
  const cartTotalItems = document.querySelectorAll(".cart__item");
  cartTotalItems.forEach((cartTotalItem) => {
    const cartItemPrice = cartTotalItem.querySelector(".price");
    const shoppingCartItemPrice = Number(
      cartItemPrice.textContent.replace("€", "")
    );
    const cartItemQuantity = cartTotalItem.querySelector(".itemQuantity");
    cartItemQuantity.addEventListener("click", (e) => {});
    const shoppingCartItemQuantity = Number(cartItemQuantity.value);
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  cartTotalPrice.innerHTML = `${total}`;
}

function updateArticlesCartTotal() {
  let total = 0;
  const cartTotalQuantity = document.querySelector("#totalQuantity");
  const cartTotalItems = document.querySelectorAll(".cart__item");
  cartTotalItems.forEach((cartTotalItem) => {
    const cartItemQuantity = cartTotalItem.querySelector(".itemQuantity");
    const shoppingCartItemQuantity = Number(cartItemQuantity.value);
    total = total + shoppingCartItemQuantity;
  });

  cartTotalQuantity.innerHTML = `${total}`;
}

await start();
generateEventListener();
updateCartTotalPrice();
updateArticlesCartTotal();

// -------------------------------------------------Form------------------------------------------------
// take back of data

const btnOrder = document.querySelector("#order");

btnOrder.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  // data verification

  // first name
  function regExpFirstName() {
    const firstNameForm = contact.firstName;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(firstNameForm)) {
      return true;
    } else {
    }
  }
  //last name
  function regExpLastName() {
    const lastNameForm = contact.lastName;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(lastNameForm)) {
      return true;
    } else {
    }
  }

  //city
  function regExpCity() {
    const cityForm = contact.city;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(cityForm)) {
      return true;
    } else {
    }
  }

  // e-mail
  function regExpEmail() {
    const emailForm = contact.email;
    if (
      /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(emailForm)
    ) {
      return true;
    } else {
    }
  }
  // adress
  function regExpAddress() {
    const addressForm = contact.address;
    if (/^[a-zA-Z0-9.,-_ ]{5,100}[ ]{0,2}$/.test(addressForm)) {
      return true;
    } else {
    }
  }

  // data verification in case of errors
  if (
    regExpFirstName() &
    regExpLastName() &
    regExpCity() &
    regExpEmail() &
    regExpAddress()
  ) {
    //send data to localstorage
    console.log("formulaire ok");
    localStorage.setItem("contact", JSON.stringify(contact));
    sendToServer();
  } else {
    alert("Merci de vérifier vos données dans le formulaire");
  }

  //send data to a server ---------------------------------------------------------------------
  function sendToServer() {
    //productsIdproducts;
    let orderId = "";
    let sendForm = {
      contact: {
        ...contact,
      },
      products: [...productsId],
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(sendForm),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      try {
        const result = await response.json();
        orderId = result.orderId;
        console.log("orderId", orderId, result);
        location.href = "confirmation.html?id=" + orderId;
        localStorage.clear();
        return result;
      } catch (e) {
        console.log(e);
      }
    });
  }
});
