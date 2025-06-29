let products = [];

const list = document.getElementById("list");
const inStockFilter = document.getElementById("inStockFilter");
const categoryFilter = document.getElementById("categoryFilter");

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    categoryList();
    showList();
  });

function categoryList() {
  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function showList() {
  const selectedCategory = categoryFilter.value;
  const inStockOnly = inStockFilter.checked;

  list.innerHTML = "";

  const filtered = products.filter((p) => {
    const matchCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchStock = !inStockOnly || p.inStock;
    return matchCategory && matchStock;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p>No products found.</p>";
  } else {
    filtered.forEach((p) => {
      const inStock = p.inStock === true ? "Yes" : "No";
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<p>${p.category}</p><p>item: ${p.name}</p><p>in stock: ${inStock}</p>`;
      list.appendChild(div);
    });
  }
}

categoryFilter.addEventListener("change", showList);
inStockFilter.addEventListener("change", showList);
