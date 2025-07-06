import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartData, ShippingInfo } from "@/types/cart";
import { fetchCartData, updateCartData, placeOrder } from "./operations";

interface CartState {
  // Cart data
  cartData: CartData;
  isLoadingCart: boolean;
  cartError: string | null;

  // Shipping info
  shippingInfo: ShippingInfo;
  shippingErrors: Record<string, string>;

  // Payment method
  paymentMethod: "Cash On Delivery" | "Bank";

  // Order processing
  isPlacingOrder: boolean;
  orderError: string | null;

  // UI state
  isUpdatingItem: boolean;
  updateError: string | null;
}

const initialState: CartState = {
  cartData: {
    cartItems: [],
    totalAmount: 0,
    totalItems: 0,
  },
  isLoadingCart: false,
  cartError: null,

  shippingInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  shippingErrors: {},

  paymentMethod: "Cash On Delivery",

  isPlacingOrder: false,
  orderError: null,

  isUpdatingItem: false,
  updateError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Update shipping info
    updateShippingInfo: (
      state,
      action: PayloadAction<{ field: keyof ShippingInfo; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.shippingInfo[field] = value;

      // Clear error when user starts typing
      if (state.shippingErrors[field]) {
        delete state.shippingErrors[field];
      }
    },

    // Set shipping errors
    setShippingErrors: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.shippingErrors = action.payload;
    },

    // Update payment method
    updatePaymentMethod: (
      state,
      action: PayloadAction<"Cash On Delivery" | "Bank">
    ) => {
      state.paymentMethod = action.payload;
    },

    // Clear errors
    clearCartError: (state) => {
      state.cartError = null;
    },

    clearUpdateError: (state) => {
      state.updateError = null;
    },

    clearOrderError: (state) => {
      state.orderError = null;
    },

    // Reset form after successful order
    resetOrderForm: (state) => {
      state.shippingInfo = {
        name: "",
        email: "",
        phone: "",
        address: "",
      };
      state.shippingErrors = {};
      state.paymentMethod = "Cash On Delivery";
      state.orderError = null;
    },

    // Clear cart (after successful order)
    clearCart: (state) => {
      state.cartData = {
        cartItems: [],
        totalAmount: 0,
        totalItems: 0,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch cart data
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.isLoadingCart = true;
        state.cartError = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        state.cartData = action.payload;
        state.cartError = null;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isLoadingCart = false;
        state.cartError = action.payload || "Failed to fetch cart data";

        // Handle unauthorized
        if (action.payload === "Unauthorized") {
          // This will be handled in the component
        }
      });

    // Update cart item
    builder
      .addCase(updateCartData.pending, (state) => {
        state.isUpdatingItem = true;
        state.updateError = null;
      })
      .addCase(updateCartData.fulfilled, (state, action) => {
        state.isUpdatingItem = false;
        state.cartData = action.payload;
        state.updateError = null;
      })
      .addCase(updateCartData.rejected, (state, action) => {
        state.isUpdatingItem = false;
        state.updateError = action.payload || "Failed to update cart item";
      });

    // Place order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isPlacingOrder = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.isPlacingOrder = false;
        state.orderError = null;
        // Clear cart and reset form will be handled in the component
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isPlacingOrder = false;
        state.orderError = action.payload || "Failed to place order";
      });
  },
});

export const {
  updateShippingInfo,
  setShippingErrors,
  updatePaymentMethod,
  clearCartError,
  clearUpdateError,
  clearOrderError,
  resetOrderForm,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
