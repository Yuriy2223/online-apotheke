import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart } from "@/redux/cart/operations";
import { selectIsUpdatingItem } from "@/redux/cart/selectors";
import {
  selectIsAuthChecking,
  selectIsAuthenticated,
} from "@/redux/auth/selectors";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthChecking = useAppSelector(selectIsAuthChecking);
  const isUpdatingItem = useAppSelector(selectIsUpdatingItem);

  const handleAddToCart = useCallback(
    async (productId: string, quantity = 1) => {
      if (!productId) {
        toast.error("Неможливо додати товар: ID товару не знайдено");
        return;
      }

      if (isAuthChecking) {
        toast.info("Перевіряємо авторизацію...");
        return;
      }

      if (!isAuthenticated) {
        toast.warn(
          "Для додавання товарів у кошик потрібно спочатку зареєструватися"
        );
        return;
      }

      try {
        const result = await dispatch(addToCart({ productId, quantity }));

        if (addToCart.fulfilled.match(result)) {
          toast.success("Товар додано в кошик!");

          const shouldGoToCart = window.confirm(
            "Товар додано в кошик! Бажаєте перейти до кошика?"
          );
          if (shouldGoToCart) {
            router.push("/cart");
          }
        } else if (addToCart.rejected.match(result)) {
          if (
            result.payload?.includes("401") ||
            result.payload?.includes("Unauthorized") ||
            result.payload?.includes("Access token відсутній")
          ) {
            toast.error(
              "Сесія закінчилась. Будь ласка, увійдіть в акаунт знову"
            );
            localStorage.setItem("redirectAfterLogin", window.location.href);
            router.push("/login");
            return;
          }

          const errorMessage = result.payload || "Помилка додавання в кошик";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Помилка при додаванні товару в кошик");
      }
    },
    [dispatch, router, isAuthenticated, isAuthChecking]
  );

  return { handleAddToCart, isUpdatingItem };
};
