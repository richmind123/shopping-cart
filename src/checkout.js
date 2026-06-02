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

  // ── Payment method toggle ──
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const cardFields = document.getElementById("card-fields");
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      cardFields.style.display = radio.value === "card" ? "flex" : "none";
    });
  });

  // ── Card number formatting ──
  const cardNumberInput = document.getElementById("card-number");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = val.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  // ── Expiry formatting ──
  const expiryInput = document.getElementById("expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
      e.target.value = val;
    });
  }

  // ── Pre-fill saved delivery info (must be declared FIRST) ──
  const savedInfo = JSON.parse(localStorage.getItem("deliveryInfo") || "null");

  // ── Delivery Box ──
  const deliveryBox = document.querySelector(".checkout-box:nth-child(2)");

  function showDeliverySummary(info) {
    deliveryBox.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Delivery Information</h2>
        <button id="edit-info-btn" class="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded-full font-semibold hover:border-green-700 hover:text-green-700 transition-colors duration-300">
          Edit
        </button>
      </div>
      <div class="flex flex-col gap-1 text-sm text-gray-700">
        <p class="font-bold text-base">${info.firstName} ${info.lastName}</p>
        <p>${info.address}, ${info.city} ${info.zip}</p>
        <p>${info.mobile}</p>
        <p>${info.email}</p>
      </div>
    `;
    document.getElementById("edit-info-btn").addEventListener("click", () => {
      showDeliveryForm(info);
    });
  }

  function showDeliveryForm(prefill = {}) {
    deliveryBox.innerHTML = `
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl font-bold">Delivery Information</h2>
        <button id="save-info-btn" class="save-info-btn bg-green-900 hover:bg-green-800 text-white text-sm px-5 py-2 rounded-full font-semibold transition-colors duration-300">
          Save Information
        </button>
      </div>
      <div class="delivery-form-grid grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">First Name*</label>
          <input id="first-name" type="text" placeholder="Type here..." value="${prefill.firstName || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Last Name*</label>
          <input id="last-name" type="text" placeholder="Type here..." value="${prefill.lastName || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div class="col-span-2">
          <label class="text-sm font-medium text-gray-700 mb-1 block">Address*</label>
          <input id="address" type="text" placeholder="Type here..." value="${prefill.address || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">City / Town*</label>
          <input id="city" type="text" placeholder="Type here..." value="${prefill.city || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Zip Code*</label>
          <input id="zip" type="text" placeholder="Type here..." value="${prefill.zip || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Mobile*</label>
          <input id="mobile" type="tel" placeholder="Type here..." value="${prefill.mobile || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1 block">Email*</label>
          <input id="delivery-email" type="email" placeholder="Type here..." value="${prefill.email || ""}" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 transition-colors" />
        </div>
      </div>
    `;

    document.getElementById("save-info-btn").addEventListener("click", () => {
      const info = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        zip: document.getElementById("zip").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("delivery-email").value.trim(),
      };

      if (!info.firstName || !info.lastName || !info.address || !info.city || !info.zip || !info.mobile || !info.email) {
        alert("Please fill in all delivery information fields.");
        return;
      }

      localStorage.setItem("deliveryInfo", JSON.stringify(info));
      showDeliverySummary(info);
    });
  }

  // Show summary if saved, else show form
  if (savedInfo && savedInfo.firstName) {
    showDeliverySummary(savedInfo);
  } else {
    showDeliveryForm();
  }

  // ── Load cart ──
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    const selected = JSON.parse(localStorage.getItem("selectedProduct") || "null");
    if (selected) {
      cart = [{ ...selected, quantity: 1 }];
    }
  }

  const cartItemsContainer = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center text-gray-400 py-8">
        <p class="text-lg">Your cart is empty.</p>
        <a href="/shopping-cart/headphones.html" class="text-green-700 underline text-sm">Browse products</a>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map((item) => `
      <div class="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
        <div class="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <img src="${item.img}" alt="${item.name}" class="w-full h-full object-contain p-2" />
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-base">${item.name}</h3>
          ${item.selectedColor ? `<p class="text-sm text-gray-500">Color: <span class="inline-block w-3 h-3 rounded-full border border-gray-300 align-middle ml-1" style="background:${item.selectedColor}"></span></p>` : ""}
          <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-base">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `).join("");
  }

  // ── Pricing ──
  let couponApplied = false;
  let couponDiscount = 0;

  function calcTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax - couponDiscount;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("discount").textContent = `-$${couponDiscount.toFixed(2)}`;
    document.getElementById("total").textContent = `≈$${total.toFixed(2)}`;
    document.getElementById("pay-btn").textContent = `Pay $${total.toFixed(2)}`;
  }

  calcTotals();

  // ── Coupon ──
  window.applyCoupon = function () {
    const code = document.getElementById("coupon-input").value.trim().toUpperCase();
    const validCoupons = { SAVE10: 0.1, SHOPCART: 0.15, WELCOME: 0.05 };

    if (validCoupons[code] && !couponApplied) {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      couponDiscount = subtotal * validCoupons[code];
      couponApplied = true;
      calcTotals();
      document.getElementById("coupon-input").classList.add("border-green-700");
      alert(`Coupon applied! You saved $${couponDiscount.toFixed(2)}`);
    } else if (couponApplied) {
      alert("A coupon has already been applied.");
    } else {
      alert("Invalid coupon code. Try: SAVE10, SHOPCART, or WELCOME");
    }
  };

  // ── Place Order ──
  window.placeOrder = function () {
    const saved = JSON.parse(localStorage.getItem("deliveryInfo") || "null");

    // Get from form if visible, else from saved
    const firstName = document.getElementById("first-name")?.value.trim() || saved?.firstName;
    const lastName = document.getElementById("last-name")?.value.trim() || saved?.lastName;
    const address = document.getElementById("address")?.value.trim() || saved?.address;
    const city = document.getElementById("city")?.value.trim() || saved?.city;
    const zip = document.getElementById("zip")?.value.trim() || saved?.zip;
    const mobile = document.getElementById("mobile")?.value.trim() || saved?.mobile;
    const email = document.getElementById("delivery-email")?.value.trim() || saved?.email;

    if (!firstName || !lastName || !address || !city || !zip || !mobile || !email) {
      alert("Please fill in all delivery information fields.");
      return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    if (paymentMethod === "card") {
      const cardNum = document.getElementById("card-number").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvc = document.getElementById("cvc").value.trim();
      if (!cardNum || !expiry || !cvc) {
        alert("Please fill in all card details.");
        return;
      }
    }

    localStorage.removeItem("cart");
    alert(`🎉 Order placed successfully! Thank you, ${firstName}!`);
    window.location.href = "/shopping-cart/index.html";
  };
});

// ── Mobile hamburger toggle ──
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const mobileCategoryToggle = document.getElementById('mobile-category-toggle');
  const mobileCategoryPanel = document.getElementById('mobile-category-panel');
  const catChevron = document.getElementById('cat-chevron');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNavPanel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNavPanel.contains(e.target)) {
        mobileNavPanel.classList.remove('open');
      }
    });
  }
  if (mobileCategoryToggle && mobileCategoryPanel) {
    mobileCategoryToggle.addEventListener('click', () => {
      mobileCategoryPanel.classList.toggle('open');
      if (catChevron) {
        catChevron.style.transform = mobileCategoryPanel.classList.contains('open') ? 'rotate(180deg)' : '';
      }
    });
  }
});