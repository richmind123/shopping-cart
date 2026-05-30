import "./style.css";
import { createIcons, icons } from "lucide";

// ── Headphone Products List ──
const headphoneProducts = [
  {
    name: "Wireless Earbuds IPX8",
    price: 89,
    description: "Organic Cotton, fairtrade certified",
    img: "./Images/wireless earbuds.png",
    thumbnails: ["./Images/wireless earbuds.png"],
    colors: ["#1f2937", "#f87171", "#86efac"],
    stock: 12,
    specs: {
      brand: "Generic",
      model: "Wireless Earbuds IPX8",
      releaseDate: "2023",
      modelNumber: "IPX8-TWS",
      headphoneType: "In-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "6",
      numDrivers: "1",
      waterResistant: "Yes",
      weight: "45",
      batteryLife: "8",
    },
  },
  {
    name: "AirPods Max",
    price: 559,
    description: "A perfect balance of high-fidelity audio",
    img: "./Images/airpod max-min.png",
    thumbnails: ["./Images/airpod max-min.png"],
    colors: ["#f87171", "#1f2937", "#86efac", "#e5e7eb", "#1e3a5f"],
    stock: 12,
    specs: {
      brand: "Apple",
      model: "AirPods Max Wireless Headphones",
      releaseDate: "December 2020",
      modelNumber: "AirPods Max",
      headphoneType: "Over-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "40",
      numDrivers: "1",
      waterResistant: "No",
      weight: "385",
      batteryLife: "20",
    },
  },
  {
    name: "Bose BT Earphones",
    price: 289,
    description: "Table with air purifier, stained veneer/black",
    img: "./Images/Bose BT Earphones.png",
    thumbnails: ["./Images/Bose BT Earphones.png"],
    colors: ["#1f2937", "#e5e7eb"],
    stock: 8,
    specs: {
      brand: "Bose",
      model: "Bose BT Earphones",
      releaseDate: "2022",
      modelNumber: "BOSE-BT-EP",
      headphoneType: "In-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "8",
      numDrivers: "1",
      waterResistant: "Yes",
      weight: "60",
      batteryLife: "6",
    },
  },
  {
    name: "VIVEFOX Headphones",
    price: 39,
    description: "Wired Stereo Headsets With Mic",
    img: "./Images/VIVEFOX Headphones.png",
    thumbnails: ["./Images/VIVEFOX Headphones.png"],
    colors: ["#f87171", "#1f2937"],
    stock: 20,
    specs: {
      brand: "VIVEFOX",
      model: "VIVEFOX Wired Stereo",
      releaseDate: "2022",
      modelNumber: "VFX-WH01",
      headphoneType: "Over-Ear",
      connectivity: "Wired",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "40",
      numDrivers: "1",
      waterResistant: "No",
      weight: "220",
      batteryLife: "N/A",
    },
  },
  {
    name: "JBL TUNE 600BTNC",
    price: 59,
    description: "Premium Bone Conduction Open Ear Bluetooth",
    img: "./Images/JBL TUNE 600BTNC.png",
    thumbnails: ["./Images/JBL TUNE 600BTNC.png"],
    colors: ["#1f2937", "#f87171", "#fbbf24"],
    stock: 15,
    specs: {
      brand: "JBL",
      model: "JBL TUNE 600BTNC",
      releaseDate: "2021",
      modelNumber: "TUNE600BTNC",
      headphoneType: "On-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "32",
      numDrivers: "1",
      waterResistant: "No",
      weight: "160",
      batteryLife: "12",
    },
  },
  {
    name: "TAGRY Bluetooth",
    price: 109,
    description: "Bluetooth 5.3 wireless headphones",
    img: "./Images/TAGRY Bluetooth.png",
    thumbnails: ["./Images/TAGRY Bluetooth.png"],
    colors: ["#1f2937", "#e5e7eb"],
    stock: 10,
    specs: {
      brand: "TAGRY",
      model: "TAGRY Bluetooth 5.3",
      releaseDate: "2023",
      modelNumber: "TAGRY-BT53",
      headphoneType: "Over-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "40",
      numDrivers: "1",
      waterResistant: "No",
      weight: "250",
      batteryLife: "60",
    },
  },
  {
    name: "Monster MNFLEX",
    price: 89,
    description: "Flex Active Noise Cancelling Bluetooth",
    img: "./Images/Monster MNFLEX.png",
    thumbnails: ["./Images/Monster MNFLEX.png"],
    colors: ["#1f2937", "#f87171"],
    stock: 7,
    specs: {
      brand: "Monster",
      model: "Monster MNFLEX ANC",
      releaseDate: "2022",
      modelNumber: "MNFLEX-ANC",
      headphoneType: "Over-Ear",
      connectivity: "Wireless",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "40",
      numDrivers: "1",
      waterResistant: "No",
      weight: "270",
      batteryLife: "22",
    },
  },
  {
    name: "Mpow CH6",
    price: 569,
    description: "Kids Headphones",
    img: "./Images/Mpow CH6.png",
    thumbnails: ["./Images/Mpow CH6.png"],
    colors: ["#60a5fa", "#f87171", "#86efac"],
    stock: 18,
    specs: {
      brand: "Mpow",
      model: "Mpow CH6 Kids",
      releaseDate: "2021",
      modelNumber: "CH6-KIDS",
      headphoneType: "Over-Ear",
      connectivity: "Wired",
      microphone: "Yes",
      driverType: "Dynamic",
      driverSize: "40",
      numDrivers: "1",
      waterResistant: "No",
      weight: "180",
      batteryLife: "N/A",
    },
  },
];

// Save products list to localStorage for product.js to use
localStorage.setItem("headphoneProducts", JSON.stringify(headphoneProducts));

// Open Product Page
window.openProduct = function (index) {
  const product = headphoneProducts[index];
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "/shopping-cart/product.html";
};

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

  // Category Dropdown Toggle
  const categoryBtn = document.getElementById("category-btn");
  const dropdown = document.getElementById("category-dropdown");

  if (categoryBtn && dropdown) {
    categoryBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      const isClickInsideDropdown = dropdown.contains(e.target);
      const isClickOnButton = categoryBtn.contains(e.target);
      if (!isClickInsideDropdown && !isClickOnButton) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // Search
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
        const matches = productsCatalog.filter((product) =>
          product.name.toLowerCase().includes(query),
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
});






// Mobile hamburger toggle
const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
const mobileNavPanel = document.getElementById('mobile-nav-panel');
hamburgerBtn.addEventListener('click', () => {
  mobileNavPanel.classList.toggle('open');
});

// Category toggle inside mobile nav
const mobileCategoryToggle = document.getElementById('mobile-category-toggle');
const mobileCategoryPanel = document.getElementById('mobile-category-panel');
const catChevron = document.getElementById('cat-chevron');
mobileCategoryToggle.addEventListener('click', () => {
  mobileCategoryPanel.classList.toggle('open');
  catChevron.style.transform = mobileCategoryPanel.classList.contains('open') ? 'rotate(180deg)' : '';
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburgerBtn.contains(e.target) && !mobileNavPanel.contains(e.target)) {
    mobileNavPanel.classList.remove('open');
  }
});
