const renderData = document.getElementById("renderData");
const btnLoadMore = document.getElementById("loadMoreBtn");

let page = 1;
const postsPerPage = 2;
const loadLinks = async () => {
  const paginateURL = `http://localhost:8080/api/products?limit=${postsPerPage}&page=${page}`;
  const allProductsULR = `http://localhost:8080/api/products`;

  const { products } = await fetch(paginateURL).then((res) => res.json());
  console.log(products.payload);
  const htmlString = products.payload
    .map(
      (product) =>
        `
        <a href="/api/products/${product._id}">
    
        <div class="container-Logo">
          <img class="logo" alt="logoShop" src="/images/cellPhoneLogo.png" />
        </div>
        <div class="info">
        <p>${product.name}</p>
        <p>$ ${product.price}</p>
        </div>
      
        </a>
        `
    )
    .join("");
  if (renderData) {
    renderData.innerHTML += htmlString;
  }
};

btnLoadMore.addEventListener("click", () => {
  page++;
  console.log(page, "page");
  loadLinks();
});

loadLinks();
