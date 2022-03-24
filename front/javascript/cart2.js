// recupérer les produits dans le localstorage
let selectedProducts = JSON.parse(localStorage.getItem("product"));
console.log(selectedProducts);
selectedProducts.forEach((product) => {
  let products = {
    id: product.id,
    productId: product.productId,
    productColor: product.productColor,
    productQuantity: product.productQuantity,
  };
});

let id = selectedProducts.id;

// affichage de produits du panier

let cartItems = document.getElementById("cart__items");

//recupération de l'article avec l'api
async function displayProductInfo(id) {
  const result = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (res) => res.json()
  );

  return result;
}

const start = async () => {
  // afficher un panier vide

  if (selectedProducts.length === 0) {
    const emptyCart = `
    <div class="cart__item__content__titlePrice">  
    <h2>Panier vide</h2>
    </div>
    `;
    cartItems.innerHTML = emptyCart;

    // afficher les produits selectionnés
  } else {
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
          <p>${myData.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number"
             class="itemQuantity" name="itemQuantity" min="1"
             max="100" value="${selectedProduct.productQuantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <button class="deleteItem">Supprimer</button>
          </div>
        </div>
      </div>
    </article>
    `;
    }
    cartItems.innerHTML = showItemsAtLocalStorage;
  }
};

// changeQuantity();
// clickToDelete();
async function generateEventListener() {
  await start();
  // ecouter l'input pour changer la quantité
  let inputNumber = document.querySelectorAll(".itemQuantity");
  console.log(inputNumber);
  inputNumber.forEach((input) => {
    input.addEventListener("click", () => {
      console.log("run");
    });
  });
  // generer l'ensemble des eventlistener sur les boutons delete et sur les inputs
  // la fonction executé quand il y a un changement cest un callback
  // 1° l id 2° la cible

  // ecouter le bouton supprimer
  let removeBtn = document.querySelectorAll(".deleteItem");
  console.log(removeBtn);
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(product.id);
      e.preventDefault();
    });
  });
}

start();
generateEventListener();
// Modifier la quantité dans la page cart

//fonction qui prenne en paramettre l'id du produit et la quantité desiré, qui va regarder le regarder dans le localstorage le produit avec cet id
async function changeQuantity(idTargeted) {
  await start();

  // inputNumber.forEach((productNumber) => {
  //   let newValue = productNumber.value;
  //   console.log(newValue);
  // });

  // const productTargeted =
  //   selectedProducts &&
  //   selectedProducts[0].find((element) => element.id === idTargeted);
  // if (productTargeted) {
  //   console.log("camilo", productTargeted);
  // }
  // const allProducts = selectedProducts.productQuantity;
}
changeQuantity();

//fontion pour supprimer un produit
async function clickToDelete() {
  // recuperer les produits enregistré sur le localstorage
  await start();
  let removeCard = document.querySelectorAll(".cart__item");

  for (let y = 0; y < removeCard.length; y++) {
    removeCard[y].addEventListener("click", () => {
      removeCard[y].style.display = "none";
    });
  }
  for (let x = 0; x < selectedProducts.length; x++) {
    let productIdSelected = selectedProducts[x].id;
    return productIdSelected;
    console.log(productIdSelected);
  }

  selectedProducts = selectedProducts.filter(
    //afin de supprimer la valeur selectionné j'utilise la methode inverse
    (p) => p.id !== productIdSelected
  );
  console.log("hola" + selectedProducts);
  localStorage.setItem("product", JSON.stringify(selectedProducts));

  alert("article supprimé");
}
