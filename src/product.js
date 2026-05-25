import "./style.css";
import { createIcons, icons } from "lucide";

document.addEventListener("DOMContentLoaded", () => {
  createIcons({ icons });

  // ── Category Dropdown ──
  const categoryBtn = document.getElementById("category-btn");
  const dropdown = document.getElementById("category-dropdown");

  if (categoryBtn && dropdown) {
    categoryBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !categoryBtn.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // ── Search ──
  const productsCatalog = [
    {
      name: "Laptop sleeve MacBook",
      price: "$59.00",
      img: "./Images/laptop-sleeve.png",
    },
    { name: "AirPods Max", price: "$559.00", img: "./Images/airpods.png" },
    {
      name: "Flower Laptop Sleeve",
      price: "$39.00",
      img: "./Images/flower-sleeve.png",
    },
    {
      name: "Supreme Water Bottle",
      price: "$19.00",
      img: "./Images/water-bottle.png",
    },
    {
      name: "MacBook pro 13",
      price: "$1099.00",
      img: "./Images/macbook-pro.png",
    },
    {
      name: "HomePod mini",
      price: "$59.00",
      img: "./Images/homepod-orange.png",
    },
    { name: "Ipad Mini", price: "$539.00", img: "./Images/ipad-mini.png" },
  ];

  const searchInput = document.getElementById("search-input");
  const searchPanel = document.getElementById("search-results-panel");
  const searchContainer = document.getElementById("search-container");
  const liveResultsContainer = document.getElementById("live-search-results");
  const trendingBox = document.getElementById("trending-box");
  const resultsHeading = document.getElementById("results-heading");

  function renderSearchResults(filteredItems) {
    if (filteredItems.length === 0) {
      liveResultsContainer.innerHTML = `
        <div class="text-sm text-gray-400 text-center py-4">No matching items found</div>
      `;
      return;
    }

    liveResultsContainer.innerHTML = filteredItems
      .map(
        (product) => `
      <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group">
        <img src="${product.img}" alt="${product.name}" class="w-10 h-10 object-contain bg-gray-50 rounded-lg" />
        <div class="flex-1">
          <p class="font-semibold text-sm text-gray-800 group-hover:text-green-700 transition-colors">${product.name}</p>
          <p class="text-gray-500 text-xs">${product.price}</p>
        </div>
        <i class="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-all" data-lucide="arrow-up-left"></i>
      </div>
    `,
      )
      .join("");

    if (window.lucide) lucide.createIcons();
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query === "") {
        trendingBox.classList.remove("hidden");
        resultsHeading.textContent = "Suggested Products";
        renderSearchResults(productsCatalog.slice(0, 3));
      } else {
        trendingBox.classList.add("hidden");
        resultsHeading.textContent = "Matching Results";
        const matches = productsCatalog.filter((p) =>
          p.name.toLowerCase().includes(query),
        );
        renderSearchResults(matches);
      }
    });

    searchInput.addEventListener("focus", () => {
      searchPanel.classList.remove("hidden");
      if (searchInput.value.trim() === "") {
        renderSearchResults(productsCatalog.slice(0, 3));
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchContainer.contains(e.target)) {
        searchPanel.classList.add("hidden");
      }
    });

    document.querySelectorAll(".trending-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        searchInput.value = tag.textContent;
        searchInput.focus();
        searchInput.dispatchEvent(new Event("input"));
      });
    });
  }

  // ── Product ──
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    window.location.href = "./headphones.html";
    return;
  }

  let quantity = 1;
  let selectedColor = product.colors?.[0] || null;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById("product-price").textContent =
    product.price.toFixed(2);
  document.getElementById("stock-count").textContent = product.stock || 12;
  document.getElementById("breadcrumb-name").textContent = product.name;

  const mainImg = document.getElementById("main-image");
  mainImg.src = product.img;
  mainImg.alt = product.name;

  const thumbnailsContainer = document.getElementById("thumbnails");
  const imgs = product.thumbnails?.length ? product.thumbnails : [product.img];
  imgs.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = product.name;
    thumb.className = `w-20 h-20 object-contain bg-gray-100 rounded-xl p-2 cursor-pointer border-2 ${i === 0 ? "border-green-700" : "border-transparent"}`;
    thumb.addEventListener("click", () => {
      mainImg.src = src;
      document
        .querySelectorAll("#thumbnails img")
        .forEach((t) =>
          t.classList.replace("border-green-700", "border-transparent"),
        );
      thumb.classList.replace("border-transparent", "border-green-700");
    });
    thumbnailsContainer.appendChild(thumb);
  });

  const colorSelector = document.getElementById("color-selector");
  if (product.colors?.length) {
    product.colors.forEach((color, i) => {
      const btn = document.createElement("button");
      btn.className = `w-9 h-9 rounded-full border-4 ${i === 0 ? "border-green-700" : "border-transparent"} transition-all`;
      btn.style.backgroundColor = color;
      btn.addEventListener("click", () => {
        selectedColor = color;
        document
          .querySelectorAll("#color-selector button")
          .forEach((b) =>
            b.classList.replace("border-green-700", "border-transparent"),
          );
        btn.classList.replace("border-transparent", "border-green-700");
      });
      colorSelector.appendChild(btn);
    });
  }

  window.changeQty = function (change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById("qty-display").textContent = quantity;
  };

  window.addToCart = function () {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.name === product.name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity, selectedColor });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  window.buyNow = function () {
    window.addToCart();
    alert("Proceeding to checkout!");
  };

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll("section, footer");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => observer.observe(el));
});
