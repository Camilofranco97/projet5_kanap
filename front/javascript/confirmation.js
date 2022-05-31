// Fonction pour récupérer l'order ID dans la barre d'adresse pour le réinjecter dans le HTML de la page de confirmation
async function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  const getUrl = window.location.search;
  const getOderId = new URLSearchParams(getUrl);
  console.log(getOderId);
  const orderIdInUrl = getOderId.get("id");
  console.log(orderIdInUrl);
  idLocation.textContent = orderIdInUrl;
}
getOrderId();
