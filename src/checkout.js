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
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
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
    `
      )
      .join("");
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

  // ── Success Modal ──
  function showSuccessModal(firstName) {
    // Generate random transaction ID
    const txnId = Math.floor(1000000000 + Math.random() * 9000000000);

    const overlay = document.createElement("div");
    overlay.id = "success-overlay";
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999;
      animation: scOverlayIn 0.3s ease;
    `;

    overlay.innerHTML = `
      <style>
        @keyframes scOverlayIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scModalPop   { from { opacity: 0; transform: scale(0.8) } to { opacity: 1; transform: scale(1) } }
        @keyframes scCheckBounce{ 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.25)} 80%{transform:scale(0.92)} 100%{transform:scale(1);opacity:1} }
        @keyframes scDotFloat   { 0%{transform:translateY(0) rotate(0deg)} 100%{transform:translateY(-10px) rotate(20deg)} }
        @keyframes scRingPulse  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.18);opacity:0} }

        .sc-modal {
          background: #fff;
          border-radius: 1.75rem;
          padding: 2.75rem 2rem 2.25rem;
          max-width: 400px;
          width: 92%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(0,0,0,0.18);
          animation: scModalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        /* soft background gradient top wash */
        .sc-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 55%;
          background: linear-gradient(160deg, #ecfdf5 0%, #d1fae5 60%, #f0fdf4 100%);
          z-index: 0;
          border-radius: 1.75rem 1.75rem 60% 60% / 1.75rem 1.75rem 40% 40%;
        }

        .sc-modal-inner { position: relative; z-index: 1; }

        /* floating decorative dots */
        .sc-dot {
          position: absolute;
          border-radius: 50%;
          animation: scDotFloat 2s ease-in-out infinite alternate;
          z-index: 2;
        }

        /* check circle */
        .sc-check-wrap {
          width: 110px; height: 110px;
          margin: 0 auto 1.5rem;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .sc-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 3px solid #86efac;
          animation: scRingPulse 1.8s ease-out infinite;
        }
        .sc-check-bg {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: linear-gradient(145deg, #22c55e, #16a34a);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(22,163,74,0.35);
          animation: scCheckBounce 0.6s 0.15s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .sc-check-bg svg {
          width: 42px; height: 42px;
          stroke: #fff;
          stroke-width: 2.8;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sc-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .sc-txn {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 2rem;
          letter-spacing: 0.01em;
        }

        .sc-btn {
          display: inline-block;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          border: none;
          border-radius: 2rem;
          padding: 0.9rem 0;
          width: 100%;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
        }
        .sc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(22,163,74,0.38);
          background: linear-gradient(135deg, #15803d, #166534);
        }
        .sc-btn:active { transform: translateY(0); }
      </style>

      <div class="sc-modal">
        <!-- Decorative dots -->
        <span class="sc-dot" style="width:9px;height:9px;background:#f87171;top:22px;right:56px;animation-delay:0s;animation-duration:2.1s;"></span>
        <span class="sc-dot" style="width:6px;height:6px;background:#60a5fa;top:48px;right:28px;animation-delay:0.4s;animation-duration:1.8s;"></span>
        <span class="sc-dot" style="width:7px;height:7px;background:#a78bfa;top:26px;left:44px;animation-delay:0.7s;animation-duration:2.4s;"></span>
        <span class="sc-dot" style="width:5px;height:5px;background:#fbbf24;top:60px;left:22px;animation-delay:1s;animation-duration:2s;"></span>
        <span class="sc-dot" style="width:8px;height:8px;background:#34d399;bottom:90px;left:20px;animation-delay:0.2s;animation-duration:2.3s;"></span>
        <span class="sc-dot" style="width:5px;height:5px;background:#f472b6;bottom:110px;right:18px;animation-delay:0.8s;animation-duration:1.9s;"></span>

        <div class="sc-modal-inner">
          <!-- Animated checkmark -->
          <div class="sc-check-wrap">
            <div class="sc-ring"></div>
            <div class="sc-check-bg">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <p class="sc-title">Your order has been<br>accepted</p>
          <p class="sc-txn">Transaction ID: ${txnId}</p>

          <button class="sc-btn" id="sc-continue-btn">Continue Shopping</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Prevent page scroll while modal is open
    document.body.style.overflow = "hidden";

    document.getElementById("sc-continue-btn").addEventListener("click", () => {
      document.body.style.overflow = "";
      window.location.href = "/shopping-cart/index.html";
    });

    // Close on backdrop click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
        document.body.style.overflow = "";
      }
    });
  }

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

    // Clear cart and show success modal
    localStorage.removeItem("cart");
    showSuccessModal(firstName);
  };
});

// ── Mobile hamburger toggle ──
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("mobile-hamburger-btn");
  const mobileNavPanel = document.getElementById("mobile-nav-panel");
  const mobileCategoryToggle = document.getElementById("mobile-category-toggle");
  const mobileCategoryPanel = document.getElementById("mobile-category-panel");
  const catChevron = document.getElementById("cat-chevron");

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener("click", () => {
      mobileNavPanel.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNavPanel.contains(e.target)) {
        mobileNavPanel.classList.remove("open");
      }
    });
  }

  if (mobileCategoryToggle && mobileCategoryPanel) {
    mobileCategoryToggle.addEventListener("click", () => {
      mobileCategoryPanel.classList.toggle("open");
      if (catChevron) {
        catChevron.style.transform = mobileCategoryPanel.classList.contains("open")
          ? "rotate(180deg)"
          : "";
      }
    });
  }
});