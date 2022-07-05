window.onload = () => {
  loadProducts();
};

async function loadProducts() {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("p") || 1;
  const resp = await fetch(`/products?page=${page}`);
  const result = await resp.json();
  console.log(result);
}
