"use client";

import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchProductsBySearch } from "@/redux/search/operation";
import { DiscountProductCard } from "../../../components/DiscountProductCard/DiscountProductCard";
import {
  selectSearchError,
  selectSearchLoading,
  selectSearchPagination,
  selectSearchProducts,
} from "@/redux/search/selectors";

export default function DiscountsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector(selectSearchProducts);
  const loading = useAppSelector(selectSearchLoading);
  const paginationData = useAppSelector(selectSearchPagination);
  const error = useAppSelector(selectSearchError);
  const searchParams = useSearchParams();

  const { currentPage, deviceLimit, handlePageChange } = usePagination({
    responsiveLimits: {
      mobile: 6,
      tablet: 8,
      desktop: 12,
    },
  });

  const discount = searchParams?.get("discount");

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: deviceLimit,
      ...(discount && { discount }),
    };
    dispatch(fetchProductsBySearch(params));
  }, [currentPage, deviceLimit, discount, dispatch]);

  const handleDetails = useCallback(
    (productId: string, discountPercent?: number) => {
      const params = new URLSearchParams({ id: productId });
      if (discountPercent !== undefined) {
        params.set("discount", discountPercent.toString());
      }
      router.push(`/medicine-product?${params.toString()}`);
    },
    [router]
  );

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-green-light border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center text-red-dark">Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black-true mb-8 text-center">
          {discount ? `Medicine with ${discount}%+ discount` : "Medicine"}
        </h1>

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
                  <DiscountProductCard
                    product={product}
                    discount={discount ? parseInt(discount) : 0}
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
