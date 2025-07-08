"use client";

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { ShippingInfo } from "@/types/cart";
import { Spinner } from "@/shared/Spinner";
import { Container } from "@/shared/Container";
import { ShippingForm } from "@/components/Cart/ShippingForm";
import { PaymentMethod } from "@/components/Cart/PaymentMethod";
import { OrderSummary } from "@/components/Cart/OrderSummary";
import { OrderSidebar } from "@/components/Cart/OrderSidebar";
import { cartSchema } from "@/validation/cart";
import {
  fetchCartData,
  updateCartData,
  placeOrder,
} from "@/redux/cart/operations";
import {
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
  selectPaymentMethod,
  selectIsCartEmpty,
  selectCanPlaceOrder,
} from "@/redux/cart/selectors";
import { selectAuthState } from "@/redux/auth/selectors";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isAuthChecking } = useSelector(selectAuthState);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);
  const isLoadingCart = useSelector(selectIsLoadingCart);
  const isUpdatingItem = useSelector(selectIsUpdatingItem);
  const isPlacingOrder = useSelector(selectIsPlacingOrder);
  const cartError = useSelector(selectCartError);
  const updateError = useSelector(selectUpdateError);
  const orderError = useSelector(selectOrderError);
  const paymentMethod = useSelector(selectPaymentMethod);
  const isCartEmpty = useSelector(selectIsCartEmpty);
  const canPlaceOrder = useSelector(selectCanPlaceOrder);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingInfo>({
    resolver: yupResolver(cartSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!isAuthChecking && !isAuthenticated) {
      toast.error("Для доступу до кошика необхідно авторизуватись");
      router.push("/login");
    }
  }, [isAuthenticated, isAuthChecking, router]);

  useEffect(() => {
    if (isAuthenticated && !isAuthChecking) {
      dispatch(fetchCartData());
    }
  }, [dispatch, isAuthenticated, isAuthChecking]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      dispatch(clearCartError());
    }
  }, [cartError, dispatch]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(clearUpdateError());
    }
  }, [updateError, dispatch]);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderError());
    }
  }, [orderError, dispatch]);

  const handleUpdateQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      const result = await dispatch(
        updateCartData({ productId, quantity: newQuantity, action: "update" })
      );

      if (updateCartData.fulfilled.match(result)) {
        toast.success("Кількість товару оновлено");
      }
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      const result = await dispatch(
        updateCartData({ productId, quantity: 1, action: "remove" })
      );

      if (updateCartData.fulfilled.match(result)) {
        toast.success("Товар видалено з кошика");
      }
    },
    [dispatch]
  );

  const handlePaymentMethodChange = useCallback(
    (method: "Cash On Delivery" | "Bank") => {
      dispatch(updatePaymentMethod(method));
      toast.info(
        `Обрано метод оплати: ${
          method === "Bank" ? "Банківський переказ" : "Оплата при отриманні"
        }`
      );
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    async (data: ShippingInfo) => {
      if (isCartEmpty) {
        toast.error("Ваш кошик порожній");
        return;
      }

      const result = await dispatch(
        placeOrder({ shippingInfo: data, paymentMethod })
      );

      if (placeOrder.fulfilled.match(result)) {
        const orderData = result.payload;
        toast.success(
          `Замовлення створено! Трекінг: ${orderData.trackingInfo.trackingNumber}`
        );

        dispatch(resetOrderForm());
        dispatch(clearCart());
        reset();

        setTimeout(() => {
          window.location.href = orderData.trackingInfo.trackingUrl;
        }, 2000);
      }
    },
    [isCartEmpty, paymentMethod, dispatch, reset]
  );

  if (isAuthChecking || isLoadingCart) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container className="px-4 py-8">
      <h1 className="text-4xl font-bold text-black-true mb-8 text-center">
        Cart
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
          <div className="desktop:col-span-1">
            <ShippingForm register={register} errors={errors} />

            <PaymentMethod
              paymentMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />

            <OrderSummary
              totalAmount={totalAmount}
              isPlacingOrder={isPlacingOrder}
              isCartEmpty={isCartEmpty}
              canPlaceOrder={canPlaceOrder}
            />
          </div>

          <aside className="desktop:col-span-1">
            <OrderSidebar
              cartItems={cartItems}
              totalItems={totalItems}
              isCartEmpty={isCartEmpty}
              isUpdatingItem={isUpdatingItem}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </aside>
        </div>
      </form>
    </Container>
  );
}
