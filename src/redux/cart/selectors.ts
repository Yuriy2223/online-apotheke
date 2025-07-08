import { RootState } from "@/redux/store";

export const selectCartData = (state: RootState) => state.cart.cartData;
export const selectCartItems = (state: RootState) =>
  state.cart.cartData.cartItems;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartData.totalAmount;
export const selectCartTotalItems = (state: RootState) =>
  state.cart.cartData.totalItems;

export const selectIsLoadingCart = (state: RootState) =>
  state.cart.isLoadingCart;
export const selectIsUpdatingItem = (state: RootState) =>
  state.cart.isUpdatingItem;
export const selectIsPlacingOrder = (state: RootState) =>
  state.cart.isPlacingOrder;

export const selectCartError = (state: RootState) => state.cart.cartError;
export const selectUpdateError = (state: RootState) => state.cart.updateError;
export const selectOrderError = (state: RootState) => state.cart.orderError;

export const selectShippingInfo = (state: RootState) => state.cart.shippingInfo;
export const selectShippingErrors = (state: RootState) =>
  state.cart.shippingErrors;
export const selectPaymentMethod = (state: RootState) =>
  state.cart.paymentMethod;

export const selectIsCartEmpty = (state: RootState) =>
  state.cart.cartData.cartItems.length === 0;

export const selectCanPlaceOrder = (state: RootState) => {
  const { shippingInfo, cartData } = state.cart;
  return (
    cartData.cartItems.length > 0 &&
    shippingInfo.name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(shippingInfo.email.trim()) &&
    /^\+?[\d\s\-\(\)]{10,}$/.test(shippingInfo.phone.trim()) &&
    shippingInfo.address.trim().length >= 10
  );
};
