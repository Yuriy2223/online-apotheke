import { useCallback } from "react";
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
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthChecking = useAppSelector(selectIsAuthChecking);
  const isUpdatingItem = useAppSelector(selectIsUpdatingItem);

  const handleAddToCart = useCallback(
    async (productId: string, quantity = 1, discountPrice?: number) => {
      if (!productId) {
        toast.error("Cannot add product: Product ID not found");
        return;
      }

      if (isAuthChecking) {
        toast.info("Checking authorization...");
        return;
      }

      if (!isAuthenticated) {
        toast.warn("Please register to add products to cart.");
        return;
      }

      try {
        const result = await dispatch(
          addToCart({
            productId,
            quantity,
            discountPrice,
          })
        );

        if (addToCart.fulfilled.match(result)) {
          toast.success("Product added to cart!");
        } else {
          const errorMessage = result.payload || "Error adding to cart";
          toast.error(errorMessage);
        }
      } catch {
        toast.error("Something went wrong");
      }
    },
    [dispatch, isAuthenticated, isAuthChecking]
  );

  return { handleAddToCart, isUpdatingItem };
};
