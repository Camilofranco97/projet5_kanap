const windowTitle = document.querySelector("title");
const item = document.querySelector("item");
const image = document.querySelector(".imgProduct");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const btnAddToCart = document.getElementById("addToCart");

const getUrl = new URLSearchParams(window.location.search);
const id = getUrl.get("id");

//recupération de l'article avec l'api
function displayProductInfo() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      const data = async () => {
        const productData = await res.json();

        windowTitle.textContent = productData.name;
        image.src = productData.imageUrl;
        image.alt = productData.altTxt;
        title.textContent = productData.name;
        price.textContent = productData.price;
        description.textContent = productData.description;
      };

      data();
    })
    .catch(function (err) {
      console.log(err);
    });
}

displayProductInfo();

function addToCart(product) {
  //function pour la quantité et la couleur
  function productQuantity() {
    const quantity = document.getElementById("quantity");
    return parseInt(quantity.value);
  }

  function productColor() {
    const colorSelect = document.getElementById("colors");
    return colorSelect.value;
  }

  //si la couleur ou la quantité ne sont pas selectionnées mettre un message d'alert

  if (productColor() == "") {
    return alert("Vous n'avez pas sélectionné la couleur du canapé!");
  } else if (productQuantity() == 0 || productQuantity() < 0) {
    return alert("Veuillez définir le nombre d'article !");
  }

  function localSotorageContent() {
    const productsInLocalStorage = JSON.parse(localStorage.getItem("product"));
    return productsInLocalStorage;
  }

  function updateProductToCart(
    productTargeted,
    productsInLocalStorage,
    productQuantity
  ) {
    const newLocaleStorage = [...productsInLocalStorage];
    console.log("test", newLocaleStorage);
    const newProduct = newLocaleStorage.find(
      (element) => element.id === productTargeted.id
    );
    console.log("new", newProduct);
    newProduct.productQuantity = newProduct.productQuantity + productQuantity;
    console.log("je dois update", newProduct);

    localStorage.setItem("product", JSON.stringify(newLocaleStorage));
  }

  function addProductInLocalStorage(productOptions, productsInLocalStorage) {
    const newLocaleStorage = productsInLocalStorage
      ? [...productsInLocalStorage]
      : [];
    console.log("productOptions", productOptions);
    newLocaleStorage.push(productOptions);
    localStorage.setItem("product", JSON.stringify(newLocaleStorage));
  }

  function sendMyProductToCart(productOptions, productsInLocalStorage) {
    //console.log("productOptions", productOptions);
    const { id, productColor, productQuantity } = productOptions;
    const productTargeted =
      productsInLocalStorage &&
      productsInLocalStorage.find(
        (element) => element.id === id && element.productColor === productColor
      );
    //console.log("productsInLocalStorage", productsInLocalStorage);
    if (productTargeted && productTargeted.productColor === productColor) {
      console.log("production", productQuantity);
      updateProductToCart(
        productTargeted,
        productsInLocalStorage,
        productQuantity
      );
    } else {
      addProductInLocalStorage(productOptions, productsInLocalStorage);
      alert("Votre produit a été bien ajouté au panier!");
    }
  }
  const myLocalStorage = localSotorageContent();
  // produit choisi
  const productOptions = {
    id: id + "_" + productColor(),
    productId: id,
    productColor: productColor(),
    productQuantity: productQuantity(),
  };
  console.log(myLocalStorage, productOptions);
  sendMyProductToCart(productOptions, myLocalStorage);
}
btnAddToCart.addEventListener("click", (e) => {
  e.preventDefault();
  addToCart();
});