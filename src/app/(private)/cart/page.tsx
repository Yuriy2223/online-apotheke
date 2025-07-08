"use client";

import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";

import {
  fetchCartData,
  updateCartData,
  placeOrder,
} from "@/redux/cart/operations";

import {
  updateShippingInfo,
  setShippingErrors,
  updatePaymentMethod,
  clearCartError,
  clearUpdateError,
  clearOrderError,
  resetOrderForm,
  clearCart,
} from "@/redux/cart/slice";

import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalItems,
  selectIsLoadingCart,
  selectIsUpdatingItem,
  selectIsPlacingOrder,
  selectCartError,
  selectUpdateError,
  selectOrderError,
  selectShippingInfo,
  selectShippingErrors,
  selectPaymentMethod,
  selectIsCartEmpty,
  selectCanPlaceOrder,
} from "@/redux/cart/selectors";

import { ShippingInfo } from "@/types/cart";
import AlertNotification from "@/components/Cart/AlertNotification";
import ShippingForm from "@/components/Cart/ShippingForm";
import PaymentMethodSection from "@/components/Cart/PaymentMethodSection";
import OrderSummarySection from "@/components/Cart/OrderSummarySection";
import OrderSidebar from "@/components/Cart/OrderSidebar";
import { Spinner } from "@/shared/Spinner";

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);
  const isLoadingCart = useSelector(selectIsLoadingCart);
  const isUpdatingItem = useSelector(selectIsUpdatingItem);
  const isPlacingOrder = useSelector(selectIsPlacingOrder);
  const cartError = useSelector(selectCartError);
  const updateError = useSelector(selectUpdateError);
  const orderError = useSelector(selectOrderError);
  const shippingInfo = useSelector(selectShippingInfo);
  const shippingErrors = useSelector(selectShippingErrors);
  const paymentMethod = useSelector(selectPaymentMethod);
  const isCartEmpty = useSelector(selectIsCartEmpty);
  const canPlaceOrder = useSelector(selectCanPlaceOrder);

  const [showAlert, setShowAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (cartError) {
      setShowAlert({ type: "error", message: cartError });
      dispatch(clearCartError());
    }
  }, [cartError, dispatch]);

  useEffect(() => {
    if (updateError) {
      setShowAlert({ type: "error", message: updateError });
      dispatch(clearUpdateError());
    }
  }, [updateError, dispatch]);

  useEffect(() => {
    if (orderError) {
      setShowAlert({ type: "error", message: orderError });
      dispatch(clearOrderError());
    }
  }, [orderError, dispatch]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleUpdateQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      await dispatch(
        updateCartData({ productId, quantity: newQuantity, action: "update" })
      );
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      await dispatch(
        updateCartData({ productId, quantity: 1, action: "remove" })
      );
    },
    [dispatch]
  );

  const handleShippingInfoChange = useCallback(
    (field: keyof ShippingInfo, value: string) => {
      dispatch(updateShippingInfo({ field, value }));
    },
    [dispatch]
  );

  const handlePaymentMethodChange = useCallback(
    (method: "Cash On Delivery" | "Bank") => {
      dispatch(updatePaymentMethod(method));
    },
    [dispatch]
  );

  const validateShippingInfo = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.name || shippingInfo.name.trim().length < 2) {
      newErrors.name = "Ім'я має містити принаймні 2 символи";
    }

    if (
      !shippingInfo.email ||
      !/^\S+@\S+\.\S+$/.test(shippingInfo.email.trim())
    ) {
      newErrors.email = "Невірний формат email";
    }

    if (
      !shippingInfo.phone ||
      !/^\+?[\d\s\-\(\)]{10,}$/.test(shippingInfo.phone.trim())
    ) {
      newErrors.phone = "Невірний формат телефону";
    }

    if (!shippingInfo.address || shippingInfo.address.trim().length < 10) {
      newErrors.address = "Адреса має містити принаймні 10 символів";
    }

    dispatch(setShippingErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  }, [shippingInfo, dispatch]);

  const handlePlaceOrder = useCallback(async () => {
    if (!validateShippingInfo()) return;

    if (isCartEmpty) {
      setShowAlert({ type: "error", message: "Ваш кошик порожній" });
      return;
    }

    const result = await dispatch(placeOrder({ shippingInfo, paymentMethod }));

    if (placeOrder.fulfilled.match(result)) {
      const orderData = result.payload;
      setShowAlert({
        type: "success",
        message: `Замовлення успішно створено! Номер відстеження: ${orderData.trackingInfo.trackingNumber}`,
      });

      dispatch(resetOrderForm());
      dispatch(clearCart());

      setTimeout(() => {
        window.location.href = orderData.trackingInfo.trackingUrl;
      }, 2000);
    }
  }, [
    validateShippingInfo,
    isCartEmpty,
    shippingInfo,
    paymentMethod,
    dispatch,
  ]);

  if (isLoadingCart) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AlertNotification alert={showAlert} onClose={() => setShowAlert(null)} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ShippingForm
              shippingInfo={shippingInfo}
              shippingErrors={shippingErrors}
              onShippingInfoChange={handleShippingInfoChange}
            />

            <PaymentMethodSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />

            <OrderSummarySection
              totalAmount={totalAmount}
              isPlacingOrder={isPlacingOrder}
              isCartEmpty={isCartEmpty}
              canPlaceOrder={canPlaceOrder}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSidebar
              cartItems={cartItems}
              totalItems={totalItems}
              isCartEmpty={isCartEmpty}
              isUpdatingItem={isUpdatingItem}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
