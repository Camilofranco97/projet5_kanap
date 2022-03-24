//recupération du contenu dans le localstorage
const selectedProducts = JSON.parse(localStorage.getItem("product"));

//affichage du produit dans le HTML
const cartItems = document.getElementById("cart__items");

//Parcourir les éléments du localstorage pour recupérer l'id du produit
const produitId = selectedProducts.forEach((element) => {
  console.log(element.productId);
  return element.productId;
});
