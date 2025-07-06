"use client";

import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import type { AppDispatch } from "@/redux/store";

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

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

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
      if (cartError === "Unauthorized") {
        window.location.href = "/login";
        return;
      }
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
      const timer = setTimeout(() => {
        setShowAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleUpdateQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      if (newQuantity < 1) return;

      await dispatch(
        updateCartData({
          productId,
          quantity: newQuantity,
          action: "update",
        })
      );
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      await dispatch(
        updateCartData({
          productId,
          quantity: 1,
          action: "remove",
        })
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
    if (!validateShippingInfo()) {
      return;
    }

    if (isCartEmpty) {
      setShowAlert({ type: "error", message: "Ваш кошик порожній" });
      return;
    }

    const result = await dispatch(
      placeOrder({
        shippingInfo,
        paymentMethod,
      })
    );

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження кошика...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showAlert && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            showAlert.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{showAlert.message}</span>
            <button
              onClick={() => setShowAlert(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200">
              <h2 className="text-lg font-semibold mb-2">
                Enter shipping info
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Enter your delivery address where you get the product. You can
                also send any other location where you send the products.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    value={shippingInfo.name}
                    onChange={(e) =>
                      handleShippingInfoChange("name", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      shippingErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {shippingErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {shippingErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter text"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      handleShippingInfoChange("email", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      shippingErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {shippingErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {shippingErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter text"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      handleShippingInfoChange("phone", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      shippingErrors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {shippingErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {shippingErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingInfoChange("address", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      shippingErrors.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {shippingErrors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {shippingErrors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Payment method</h2>
              <p className="text-gray-600 text-sm mb-4">
                You can pay us in a multiple way in our payment gateway system.
              </p>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash On Delivery"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={(e) =>
                      handlePaymentMethodChange(
                        e.target.value as "Cash On Delivery" | "Bank"
                      )
                    }
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Cash On Delivery
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Bank"
                    checked={paymentMethod === "Bank"}
                    onChange={(e) =>
                      handlePaymentMethodChange(
                        e.target.value as "Cash On Delivery" | "Bank"
                      )
                    }
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bank</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-2">Order details</h2>
              <p className="text-gray-600 text-sm mb-4">
                Shipping and additional costs are calculated based on values you
                have entered.
              </p>

              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-4">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold">
                  ৳ {totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || isCartEmpty || !canPlaceOrder}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isPlacingOrder ? "Placing Order..." : "Place order"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Your Order</h2>

              {isCartEmpty ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={item.photo || "/api/placeholder/60/60"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="48px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {item.stock}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          ৳ {parseFloat(item.price).toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1 || isUpdatingItem}
                              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                              disabled={
                                item.quantity >= parseInt(item.stock) ||
                                isUpdatingItem
                              }
                              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            disabled={isUpdatingItem}
                            className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-2 text-right">
                          <p className="text-sm font-medium text-gray-900">
                            Total: ৳ {item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Total Items:</span>
                      <span>{totalItems}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
