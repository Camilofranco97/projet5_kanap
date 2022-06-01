// Function to retrive the order ID from the link and them injet back into the confirmation page.
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
