"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Container } from "@/shared/Container";
import { Spinner } from "@/shared/Spinner";
import { ProductOverview } from "@/components/Medicine/ProductOverview";
import { TabsContainer } from "@/components/Medicine/TabsContainer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkAuthStatus } from "@/redux/auth/operations";
import { useAddToCart } from "@/hooks/useAddToCart";
import {
  fetchMedicineProductDetails,
  fetchMedicineProductReviews,
} from "@/redux/medicine-product/operations";
import {
  selectMedicineProductDetails,
  selectMedicineProductDetailsLoading,
  selectMedicineProductDetailsError,
  selectMedicineProductReviews,
  selectMedicineProductReviewsLoading,
} from "@/redux/medicine-product/selectors";

export default function MedicineProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectMedicineProductDetails);
  const loading = useAppSelector(selectMedicineProductDetailsLoading);
  const error = useAppSelector(selectMedicineProductDetailsError);
  const reviews = useAppSelector(selectMedicineProductReviews);
  const reviewsLoading = useAppSelector(selectMedicineProductReviewsLoading);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const productId = searchParams.get("id");
  const hasCheckedAuth = useRef(false);
  const { handleAddToCart, isUpdatingItem } = useAddToCart();

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchMedicineProductDetails(productId));
      dispatch(fetchMedicineProductReviews({ productId, page: 1, limit: 5 }));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Помилка завантаження товару: ${error}`);
    }
  }, [error]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }, []);

  const handleAddToCartClick = useCallback(() => {
    if (!productId) {
      toast.error("Неможливо додати товар: ID товару не знайдено");
      return;
    }

    handleAddToCart(productId, quantity);
  }, [productId, quantity, handleAddToCart]);

  const handleRetry = useCallback(() => {
    if (productId) {
      dispatch(fetchMedicineProductDetails(productId));
      dispatch(fetchMedicineProductReviews({ productId, page: 1, limit: 5 }));
    }
  }, [productId, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (error || !product) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-dark text-lg mb-4">
              {error || "Товар не знайдено"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-green-light text-white-true rounded-lg hover:bg-green-light transition-colors"
              >
                Спробувати знову
              </button>
              <button
                onClick={() => router.push("/medicine")}
                className="px-4 py-2 bg-gray-dark text-white-true rounded-lg hover:bg-gray-dark transition-colors"
              >
                Повернутись до каталогу
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ProductOverview
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCartClick}
          isAddingToCart={isUpdatingItem}
        />

        <TabsContainer
          activeTab={activeTab}
          onTabChange={setActiveTab}
          product={product}
          reviews={reviews}
          reviewsLoading={reviewsLoading}
          productId={productId || ""}
        />
      </div>
    </Container>
  );
}
