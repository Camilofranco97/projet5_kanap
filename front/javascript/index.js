//API REQUEST
const fetchProducts = async () => {
  return fetch("http://localhost:3000/api/products").then((res) => res.json());
};

const showProducts = async () => {
  const items = document.getElementById("items");
  const products = await fetchProducts();
  const productsHtml = products.map((item) => {
    return `
        <a href="./product.html?id=${item._id}" class="productLink"> 
        <article> 
        <img src="${item.imageUrl}" alt="${item.altTxt}" class="productImage"></img>
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
        </article>
        </a> 
        `;
  });
  console.log(productsHtml);
  items.innerHTML = productsHtml.join("");
};

showProducts();
