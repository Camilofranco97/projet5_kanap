// recupérer les produits dans le localstorage
let selectedProducts = JSON.parse(localStorage.getItem("product"));

let productsLocalStorage = [];
let cartItems = document.getElementById("cart__items");
console.log(selectedProducts);
let orderId = "";

//recupération de l'article avec l'api
async function displayProductInfo(id) {
  const result = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (res) => res.json()
  );

  return result;
}

async function start() {
  // afficher un panier vide
  if (selectedProducts.length == 0) {
    let title = (document.querySelector("h1").textContent = "Panier Vide");

    // afficher les produits selectionnés
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
    }
    cartItems.innerHTML = showItemsAtLocalStorage;
    sumProducts();
  }
}

function generateEventListener() {
  let inputNumber = document.querySelectorAll(".itemQuantity");
  for (const input of inputNumber) {
    input.addEventListener("click", (e) =>
      changeQuantity(input.value, e.target.id)
    );
  }

  // ecouter le bouton supprimer
  let removeBtn = document.querySelectorAll(".deleteItem");
  for (const btn of removeBtn) {
    btn.addEventListener("click", (e) => clickToDelete(e.target.id));
  }
}
// modifier la quantité du produit
let totalSelectedProducts = selectedProducts.length;

function productNewQuantity() {
  let inputNumber = document.querySelectorAll(".itemQuantity");
  for (const input of inputNumber) {
    input.addEventListener("click", (e) => {
      console.log(input.value);
    });
  }
}

function changeQuantity(productQuantity, id) {
  // modifier la quantité
  console.log("quantity", productQuantity, id);
  let localStorageproducts = [...selectedProducts];
  console.log(localStorageproducts);
  let filterProduct = localStorageproducts.filter(
    (product) => product.id == id
  )[0];
  filterProduct.productQuantity = productQuantity;
  console.log(filterProduct);
  localStorage.setItem("product", JSON.stringify(localStorageproducts));
}

// Supprimer un article
function clickToDelete(id) {
  selectedProducts.splice(id, 1);
  localStorage.setItem("product", JSON.stringify(selectedProducts));
  let removeCard = document.querySelectorAll(".cart__item");
  for (const displayOff of removeCard) {
    displayOff.addEventListener("click", (e) => {
      displayOff.style.display = "none";
    });
  }
}

// récupérer les prix des produits et les additionner
async function sumProducts() {
  let totalPrice = document.getElementById("totalPrice");
  let totalCart = 0;
  for (const selectedProduct of selectedProducts) {
    const myData = await displayProductInfo(selectedProduct.productId);

    console.log("hey", totalCart);
    totalCart = Number(
      totalCart + myData.price * selectedProduct.productQuantity
    );
  }
  totalPrice.innerHTML = `${totalCart}`;
}

function sumArticles() {
  let totalQuantity = document.getElementById("totalQuantity");
  let totalArticle = [];
  let inputNumber = document.querySelectorAll(".itemQuantity");
  for (const number of inputNumber) {
    totalArticle.push(parseInt(number.value));
  }
  console.log(totalArticle);
  const totalSumQuantity = totalArticle.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  totalQuantity.innerHTML = totalSumQuantity;
}

await start();
generateEventListener();
await sumProducts();
sumArticles();

// -------------------------------------------------Formulaire------------------------------------------------
// Récuperation des données

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
  console.log(contact);

  // vérifications de données

  // prénom
  function regExpFirstName() {
    const firstNameForm = contact.firstName;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(firstNameForm)) {
      console.log("ok firstName");
      return true;
    } else {
      console.log("Ko firstName");
      style.color = red;
    }
  }
  //Nom
  function regExpLastName() {
    const lastNameForm = contact.lastName;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(lastNameForm)) {
      console.log("ok lastName");
      return true;
    } else {
      console.log("Ko lastName");
    }
  }

  //ville
  function regExpCity() {
    const cityForm = contact.city;

    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(cityForm)) {
      console.log("ok city");
      return true;
    } else {
      console.log("ko city");
    }
  }

  // adresse
  function regExpEmail() {
    const emailForm = contact.email;
    if (
      /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(emailForm)
    ) {
      console.log("ok email");
      return true;
    } else {
      console.log("ko email");
    }
  }
  // email
  function regExpAddress() {
    const addressForm = contact.address;
    if (/^[a-zA-Z0-9.,-_ ]{5,100}[ ]{0,2}$/.test(addressForm)) {
      console.log("ok adress");
      return true;
    } else {
      console.log("ko adress");
    }
  }

  // vérification de données en cas d'erreur
  if (
    regExpFirstName() &
    regExpLastName() &
    regExpCity() &
    regExpEmail() &
    regExpAddress()
  ) {
    //envoyer les données au localstorage
    console.log("formulaire ok");
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    alert("Merci de vérifier vos données dans le formulaire");
  }

  //envoyer les données vers un serveur ---------------------------------------------------------------------

  let product = JSON.parse(localStorage.getItem("product"));
  let sendForm = {
    contact,
    product,
  };
  console.log(sendForm);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(sendForm),
  });
});
