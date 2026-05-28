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

  // ── Save delivery info ──
  const saveBtn = document.getElementById("save-info-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const info = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        zip: document.getElementById("zip").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("delivery-email").value,
      };
      localStorage.setItem("deliveryInfo", JSON.stringify(info));
      saveBtn.textContent = "Saved ✓";
      saveBtn.classList.add("bg-green-700");
      setTimeout(() => {
        saveBtn.textContent = "Save Information";
        saveBtn.classList.remove("bg-green-700");
      }, 2000);
    });
  }

  // ── Pre-fill saved delivery info ──
  const savedInfo = JSON.parse(localStorage.getItem("deliveryInfo") || "null");
  if (savedInfo) {
    document.getElementById("first-name").value = savedInfo.firstName || "";
    document.getElementById("last-name").value = savedInfo.lastName || "";
    document.getElementById("address").value = savedInfo.address || "";
    document.getElementById("city").value = savedInfo.city || "";
    document.getElementById("zip").value = savedInfo.zip || "";
    document.getElementById("mobile").value = savedInfo.mobile || "";
    document.getElementById("delivery-email").value = savedInfo.email || "";
  }

  // ── Load cart ──
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // If cart is empty, use selected product as single item
  if (cart.length === 0) {
    const selected = JSON.parse(
      localStorage.getItem("selectedProduct") || "null",
    );
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
    `,
      )
      .join("");
  }

  // ── Pricing ──
  let couponApplied = false;
  let couponDiscount = 0;

  function calcTotals() {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax - couponDiscount;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("discount").textContent =
      `-$${couponDiscount.toFixed(2)}`;
    document.getElementById("total").textContent = `≈$${total.toFixed(2)}`;
    document.getElementById("pay-btn").textContent = `Pay $${total.toFixed(2)}`;
  }

  calcTotals();

  // ── Coupon ──
  window.applyCoupon = function () {
    const code = document
      .getElementById("coupon-input")
      .value.trim()
      .toUpperCase();
    const validCoupons = { SAVE10: 0.1, SHOPCART: 0.15, WELCOME: 0.05 };

    if (validCoupons[code] && !couponApplied) {
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
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
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("delivery-email").value.trim();

    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !zip ||
      !mobile ||
      !email
    ) {
      alert("Please fill in all delivery information fields.");
      return;
    }

    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked',
    )?.value;
    if (paymentMethod === "card") {
      const cardNum = document.getElementById("card-number").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvc = document.getElementById("cvc").value.trim();
      if (!cardNum || !expiry || !cvc) {
        alert("Please fill in all card details.");
        return;
      }
    }

    // Clear cart after order
    localStorage.removeItem("cart");

    alert(`🎉 Order placed successfully! Thank you, ${firstName}!`);
    window.location.href = "/shopping-cart/index.html";
  };
});
