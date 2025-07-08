"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/shared/Container";
import { Spinner } from "@/shared/Spinner";
import { ProductOverview } from "@/components/Medicine/ProductOverview";
import { TabsContainer } from "@/components/Medicine/TabsContainer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
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
import { selectAuthState } from "@/redux/auth/selectors";
import { checkAuthStatus } from "@/redux/auth/operations";
import { toast } from "react-toastify";
import { updateCartData } from "@/redux/cart/operations";

export default function MedicineProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectMedicineProductDetails);
  const loading = useAppSelector(selectMedicineProductDetailsLoading);
  const error = useAppSelector(selectMedicineProductDetailsError);
  const reviews = useAppSelector(selectMedicineProductReviews);
  const reviewsLoading = useAppSelector(selectMedicineProductReviewsLoading);

  const { isAuthenticated, isAuthChecking } = useAppSelector(selectAuthState);

  const [quantity, setQuantity] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const productId = searchParams.get("id");
  const lastAuthCheckRef = useRef<number>(0);
  const authCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedAuthCheck = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCheck = now - lastAuthCheckRef.current;

    if (timeSinceLastCheck < 5000) {
      return;
    }

    if (authCheckTimeoutRef.current) {
      clearTimeout(authCheckTimeoutRef.current);
    }

    authCheckTimeoutRef.current = setTimeout(() => {
      if (!isAuthChecking) {
        lastAuthCheckRef.current = Date.now();
        dispatch(checkAuthStatus());
      }
    }, 1000);
  }, [dispatch, isAuthChecking]);

  useEffect(() => {
    if (lastAuthCheckRef.current === 0) {
      lastAuthCheckRef.current = Date.now();
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        debouncedAuthCheck();
      }
    };

    const handleFocus = () => {
      debouncedAuthCheck();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);

      if (authCheckTimeoutRef.current) {
        clearTimeout(authCheckTimeoutRef.current);
      }
    };
  }, [debouncedAuthCheck]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchMedicineProductDetails(productId));
      dispatch(fetchMedicineProductReviews(productId));
    }
  }, [productId, dispatch]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }, []);

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      try {
        setIsAddingToCart(true);

        await dispatch(
          updateCartData({
            productId,
            quantity,
            action: "add",
          })
        ).unwrap();

        toast.success("Товар додано в кошик!");
        return true;
      } catch (error) {
        console.error("Add to cart error:", error);
        const errorMessage =
          typeof error === "string" ? error : "Помилка додавання в кошик";
        toast.error(errorMessage);
        return false;
      } finally {
        setIsAddingToCart(false);
      }
    },
    [dispatch]
  );

  const handleAddToCart = useCallback(async () => {
    if (!productId) return;

    if (isAuthChecking) {
      toast.info("Перевіряємо авторизацію...");
      return;
    }

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    const success = await addToCart(productId, quantity);
    if (success) {
      const shouldGoToCart = window.confirm(
        "Товар додано в кошик! Бажаєте перейти до кошика?"
      );
      if (shouldGoToCart) {
        router.push("/cart");
      }
    }
  }, [productId, quantity, isAuthenticated, isAuthChecking, addToCart, router]);

  const handleAuthModalClose = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthModalOpen(false);
    localStorage.setItem("redirectAfterLogin", window.location.href);
    router.push("/login");
  }, [router]);

  const handleRegister = useCallback(() => {
    setIsAuthModalOpen(false);
    localStorage.setItem("redirectAfterLogin", window.location.href);
    router.push("/register");
  }, [router]);

  if (!productId) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">Product ID not found</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">
              {error || "Product not found"}
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go Back
            </button>
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
          onAddToCart={handleAddToCart}
          isAddingToCart={isAddingToCart}
        />

        <TabsContainer
          activeTab={activeTab}
          onTabChange={setActiveTab}
          product={product}
          reviews={reviews}
          reviewsLoading={reviewsLoading}
        />

        {/* Authentication Modal */}
        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Необхідна авторизація</h2>
              <p className="text-gray-600 mb-6">
                Для додавання товарів у кошик потрібно увійти в акаунт або
                зареєструватися.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Увійти
                </button>
                <button
                  onClick={handleRegister}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Реєстрація
                </button>
              </div>
              <button
                onClick={handleAuthModalClose}
                className="w-full mt-4 text-gray-500 hover:text-gray-700"
              >
                Скасувати
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
