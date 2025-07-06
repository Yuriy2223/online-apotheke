"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { sortCategory } from "@/types/medicine-products";
import { SearchFilter } from "@/components/Medicine/MedicineFilter";
import { Spinner } from "@/shared/Spinner";
import { MedicineProductCard } from "@/components/Medicine/MedicineProductCard";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchMedicinesProducts,
  // fetchMedicinesProductDetails,
} from "@/redux/medicine/operations";
import {
  selectMedicineProducts,
  // selectMedicineProductsError,
  selectMedicineProductsLoading,
  selectMedicineProductsPagination,
} from "@/redux/medicine/selectors";

export default function MedicinePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector(selectMedicineProducts);
  const loading = useAppSelector(selectMedicineProductsLoading);
  // const error = useAppSelector(selectMedicineProductsError);
  const paginationData = useAppSelector(selectMedicineProductsPagination);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Show all");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { currentPage, deviceLimit, handlePageChange } = usePagination({
    responsiveLimits: {
      mobile: 6,
      tablet: 8,
      desktop: 12,
    },
  });

  const categories = useMemo(() => {
    const validCategories = Array.isArray(sortCategory)
      ? sortCategory.filter((cat) => typeof cat === "string")
      : [];
    return ["Show all", ...validCategories];
  }, []);

  useEffect(() => {
    const categoryParam =
      selectedCategory !== "Show all" ? selectedCategory : "";

    dispatch(
      fetchMedicinesProducts({
        page: currentPage,
        limit: deviceLimit,
        search: searchTerm.trim(),
        category: categoryParam,
      })
    );
  }, [searchTerm, selectedCategory, currentPage, deviceLimit, dispatch]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      handlePageChange(1);
    },
    [handlePageChange]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      handlePageChange(1);
    },
    [handlePageChange]
  );

  const handleAddToCart = useCallback((productId: string) => {
    const isAuthenticated = checkUserAuthentication();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    addToCartLogic(productId);
  }, []);

  // const handleDetails = useCallback(
  //   (productId: string) => {
  //     dispatch(fetchMedicinesProductDetails(productId));
  //   },
  //   [dispatch]
  // );
  // const handleDetails = useCallback(
  //   (productId: string) => {
  //     router.push(`/medicine-products/${productId}`);
  //   },
  //   [router]
  // );
  const handleDetails = useCallback(
    (productId: string) => {
      router.push(`/medicine-product?id=${productId}`);
    },
    [router]
  );

  // const handleRetry = useCallback(() => {
  //   dispatch(fetchMedicinesProducts({ page: 1, limit: deviceLimit }));
  // }, [dispatch, deviceLimit]);

  const checkUserAuthentication = (): boolean => {
    return false;
  };

  const addToCartLogic = (productId: string) => {
    console.log("Adding to cart:", productId);
  };

  const handleAuthModalClose = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // if (error) {
  //   return (
  //     <Container className="">
  //       <div className="flex justify-center items-center py-16">
  //         <div className="text-center">
  //           <div className="text-red-500 mb-4">
  //             <p className="text-lg">Error: {error}</p>
  //           </div>
  //           <button
  //             onClick={handleRetry}
  //             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
  //           >
  //             Try Again
  //           </button>
  //         </div>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black-true mb-8 text-center">
          Medicine
        </h1>
        <SearchFilter
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />

        {products.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            {/* // <div className="flex items-center justify-center min-h-[500px]"> */}
            <p className="text-gray-dark text-lg">
              Nothing was found for your request.
            </p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <li key={product._id}>
                  <MedicineProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onDetails={handleDetails}
                  />
                </li>
              ))}
            </ul>

            {paginationData && paginationData.totalPages > 1 && (
              <Pagination
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        )}

        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-6">
                Please log in or register to add items to your cart.
              </p>
              <div className="flex gap-4">
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Login
                </button>
                <button className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  Register
                </button>
              </div>
              <button
                onClick={handleAuthModalClose}
                className="w-full mt-4 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
