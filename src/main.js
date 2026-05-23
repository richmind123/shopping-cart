import "./style.css";
import { createIcons, icons } from "lucide";

document.addEventListener("DOMContentLoaded", () => {
  createIcons({ icons });

  // Card Snap Slider with Loop
  const slider = document.getElementById("deals-slider");

  if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const getCardWidth = () => {
      const firstCard = slider.querySelector(".deals-card");
      return firstCard ? firstCard.offsetWidth + 24 : 0;
    };

    const getMaxScroll = () => slider.scrollWidth - slider.clientWidth;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    slider.addEventListener("mouseup", () => {
      if (!isDown) return;
      isDown = false;
      const cardWidth = getCardWidth();
      const moved = slider.scrollLeft - scrollLeft;

      if (moved > 50) {
        if (slider.scrollLeft >= getMaxScroll() - 50) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft = scrollLeft + cardWidth;
        }
      } else if (moved < -50) {
        if (slider.scrollLeft <= 50) {
          slider.scrollLeft = getMaxScroll();
        } else {
          slider.scrollLeft = scrollLeft - cardWidth;
        }
      } else {
        slider.scrollLeft = scrollLeft;
      }
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX);
    });

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchend", () => {
      const cardWidth = getCardWidth();
      const moved = slider.scrollLeft - scrollLeft;

      if (moved > 50) {
        if (slider.scrollLeft >= getMaxScroll() - 50) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft = scrollLeft + cardWidth;
        }
      } else if (moved < -50) {
        if (slider.scrollLeft <= 50) {
          slider.scrollLeft = getMaxScroll();
        } else {
          slider.scrollLeft = scrollLeft - cardWidth;
        }
      } else {
        slider.scrollLeft = scrollLeft;
      }
    });

    slider.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX);
    });
  }

  // Filter Products
  window.filterProducts = function (category) {
    const cards = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach((btn) => {
      btn.classList.remove("bg-green-800", "text-white", "border-green-800");
    });
    event.target.classList.add(
      "bg-green-800",
      "text-white",
      "border-green-800",
    );

    cards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Parallax Effect
  const parallaxBg = document.getElementById("parallax-bg");
  if (parallaxBg) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const section = parallaxBg.closest("section");
      const sectionTop = section.offsetTop;
      const offset = (scrollY - sectionTop) * 0.3;
      parallaxBg.style.transform = `scale(1.1) translateY(${offset}px)`;
    });
  }

  // Scroll Reveal Animation
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

// Category Dropdown Toggle
const categoryBtn = document.getElementById("category-btn");
const dropdown = document.getElementById("category-dropdown");

categoryBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Stops the click from instantly triggering the document listener below
  dropdown.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  // Check if the click was inside the dropdown menu OR on the category button
  const isClickInsideDropdown = dropdown.contains(e.target);
  const isClickOnButton = categoryBtn.contains(e.target);

  // If the user clicked outside of BOTH, safely hide the menu
  if (!isClickInsideDropdown && !isClickOnButton) {
    dropdown.classList.add("hidden");
  }
});

// 1. Array data matching your actual product grid items
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
  { name: "HomePod mini", price: "$59.00", img: "./Images/homepod-orange.png" },
  { name: "Ipad Mini", price: "$539.00", img: "./Images/ipad-mini.png" },
];

// 2. DOM Elements
const searchInput = document.getElementById("search-input");
const searchPanel = document.getElementById("search-results-panel");
const searchContainer = document.getElementById("search-container");
const liveResultsContainer = document.getElementById("live-search-results");
const trendingBox = document.getElementById("trending-box");
const resultsHeading = document.getElementById("results-heading");

// 3. Render function to build rows dynamically
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
      <i class="w-4 h-4 text-gray-300 group-hover:text-gray-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" data-lucide="arrow-up-left"></i>
    </div>
  `,
    )
    .join("");

  // Re-run lucide to render arrow icons inside dynamically generated rows
  if (window.lucide) lucide.createIcons();
}

// 4. Input listener to filter array content on keypress
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query === "") {
    // Show trending tags block, hide results header, render all items as suggestions
    trendingBox.classList.remove("hidden");
    resultsHeading.textContent = "Suggested Products";
    renderSearchResults(productsCatalog.slice(0, 3)); // show first 3 items by default
  } else {
    // User is typing: hide trending block, search full list
    trendingBox.classList.add("hidden");
    resultsHeading.textContent = "Matching Results";

    const matches = productsCatalog.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
    renderSearchResults(matches);
  }
});

// 5. Visibility Focus Event Controls
searchInput.addEventListener("focus", () => {
  searchPanel.classList.remove("hidden");
  // Trigger default layout if empty upon initial focus
  if (searchInput.value.trim() === "") {
    renderSearchResults(productsCatalog.slice(0, 3));
  }
});

document.addEventListener("click", (e) => {
  if (!searchContainer.contains(e.target)) {
    searchPanel.classList.add("hidden");
  }
});

// 6. Make Trending Tags clickable to instantly trigger searches
document.querySelectorAll(".trending-tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    searchInput.value = tag.textContent;
    searchInput.focus();
    // Dispatch an input event to force the list calculation programmatically
    searchInput.dispatchEvent(new Event("input"));
  });
});

// Direct Page Redirect Logic for Category Panel
document.addEventListener("DOMContentLoaded", () => {
  // 1. Find the Headphone card inside the Category dropdown list
  // Note: We use a text-based search to find the card safely regardless of your layout structure
  const categoryCards = document.querySelectorAll(
    "#category-dropdown a, #category-dropdown div, .dropdown-content div",
  );

  categoryCards.forEach((card) => {
    if (card.textContent.includes("Headphone")) {
      // Make the entire card pointer-interactive
      card.style.cursor = "pointer";

      // 2. Direct click handler -> goes straight to the page!
      card.addEventListener("click", (e) => {
        e.preventDefault(); // Stop any conflicting link bugs
        window.location.href = "headphones.html";
      });
    }
  });
});
