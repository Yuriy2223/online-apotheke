"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { sortCategory } from "@/types/medicine-products";
import { SearchFilter } from "@/components/Medicine/MedicineFilter";
import { Spinner } from "@/shared/Spinner";
import { MedicineProductCard } from "@/components/Medicine/MedicineProductCard";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMedicinesProducts } from "@/redux/medicine/operations";
import { checkAuthStatus } from "@/redux/auth/operations";
import {
  selectMedicineProducts,
  selectMedicineProductsLoading,
  selectMedicineProductsPagination,
} from "@/redux/medicine/selectors";

export default function MedicinePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector(selectMedicineProducts);
  const loading = useAppSelector(selectMedicineProductsLoading);
  const paginationData = useAppSelector(selectMedicineProductsPagination);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Show all");
  const hasCheckedAuth = useRef(false);
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
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

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

  const handleDetails = useCallback(
    (productId: string) => {
      router.push(`/medicine-product?id=${productId}`);
    },
    [router]
  );

  if (loading) {
    return <Spinner />;
  }

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
      </div>
    </Container>
  );
}
