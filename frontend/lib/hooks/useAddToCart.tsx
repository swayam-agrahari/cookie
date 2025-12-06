// hooks/useAddToCart.tsx
"use client";
import { Item } from "@/lib/types";
import { useCart } from "../context/ItemContext";

export const useAddToCart = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (item: Item, quantity = 1) => {
    addToCart(item, quantity);

    const floatingBtn = document.createElement("div");
    floatingBtn.className =
      "fixed z-50 bg-[var(--accent)] rounded-full p-2 shadow-lg";
    floatingBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    document.body.appendChild(floatingBtn);

    const buttonRect = document
      .getElementById(`add-to-cart-${item.itemId}`)
      ?.getBoundingClientRect();
    if (buttonRect) {
      floatingBtn.style.left = `${buttonRect.left}px`;
      floatingBtn.style.top = `${buttonRect.top}px`;

      const cartButton = document
        .getElementById("cart-button")
        ?.getBoundingClientRect();
      if (cartButton) {
        floatingBtn.style.transition = "all 1s ease-in-out";
        setTimeout(() => {
          floatingBtn.style.left = `${
            cartButton.left + cartButton.width / 2 - 12
          }px`;
          floatingBtn.style.top = `${
            cartButton.top + cartButton.height / 2 - 12
          }px`;
          floatingBtn.style.opacity = "0";
          floatingBtn.style.transform = "scale(0.5)";
        }, 10);

        // Remove the element after animation completes
        setTimeout(() => {
          document.body.removeChild(floatingBtn);
        }, 1100);
      }
    }
  };

  return { handleAddToCart };
};
