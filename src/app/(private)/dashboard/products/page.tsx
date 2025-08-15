"use client";

import { useEffect, useState, useRef } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openModal } from "@/redux/modal/slice";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { ProductsPageTable } from "@/components/Dashboard/ProductsPageTable";
import { ProductsPageFilter } from "@/components/Dashboard/ProductsPageFilter";
import { fetchDashboardProducts } from "@/redux/dashboard-product/operations";
import { setFilters } from "@/redux/dashboard-product/slice";
import { Pagination } from "@/components/Pagination/Pagination";
import {
  selectFilters,
  selectPagination,
  selectLoading,
  selectProducts,
} from "@/redux/dashboard-product/selectors";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const filters = useAppSelector(selectFilters);
  const paginationData = useAppSelector(selectPagination);
  const loading = useAppSelector(selectLoading);

  const { currentPage, deviceLimit, handlePageChange } = usePagination({
    responsiveLimits: {
      mobile: 6,
      tablet: 8,
      desktop: 12,
    },
  });

  const lastFetchParams = useRef<string>("");
  const isInitialRender = useRef(true);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const fetchKey = `${currentPage}-${deviceLimit}-${filters.search}-${filters.category}-${filters.sortBy}`;

    if (lastFetchParams.current === fetchKey) {
      return;
    }

    if (loading) {
      return;
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      const timer = setTimeout(() => {
        if (lastFetchParams.current !== fetchKey) {
          lastFetchParams.current = fetchKey;
          dispatch(
            fetchDashboardProducts({
              ...filters,
              page: currentPage,
              limit: deviceLimit,
            })
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    lastFetchParams.current = fetchKey;
    dispatch(
      fetchDashboardProducts({
        ...filters,
        page: currentPage,
        limit: deviceLimit,
      })
    );
  }, [dispatch, currentPage, deviceLimit, filters, loading]);

  useEffect(() => {
    return () => {
      lastFetchParams.current = "";
    };
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterClick = () => {
    dispatch(
      setFilters({
        search: searchInput,
        page: 1,
      })
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilterClick();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(
      setFilters({
        search: "",
        category: "",
        page: 1,
      })
    );
  };

  const handleAddProduct = () => {
    dispatch(
      openModal({
        type: "ModalAddProduct",
      })
    );
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    dispatch(
      openModal({
        type: "ModalEditProduct",
        props: { product },
      })
    );
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    dispatch(
      openModal({
        type: "ModalDeleteProduct",
        props: {
          productId,
          productName: product?.name,
        },
      })
    );
  };

  const handleProductPageChange = (page: number) => {
    dispatch(setFilters({ page }));
    handlePageChange(page);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All products</h1>
        </div>

        <ProductsPageFilter
          searchInput={searchInput}
          loading={loading}
          onFilterChange={handleFilterChange}
          onKeyPress={handleKeyPress}
          onFilterClick={handleFilterClick}
          onAddProduct={handleAddProduct}
          onClearSearch={handleClearSearch}
        />

        <button
          className="absolute top-2 left-0 z-20 bg-green-light hover:bg-green-dark text-white-true px-3 py-2 rounded-md desktop:hidden"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          Sidebar
        </button>

        <div className="flex-1">
          <div className="w-full mx-auto">
            <div className="bg-white-true rounded-lg shadow border border-gray-soft p-2">
              <header className="bg-green-soft px-4 py-3 border-b border-gray-soft">
                <h2 className="text-lg font-semibold text-black-true">
                  All products
                </h2>
              </header>

              <div className="overflow-x-auto">
                <ProductsPageTable
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                  // onClearSearch={handleClearSearch}
                />
              </div>
            </div>
          </div>
        </div>

        {paginationData && paginationData.totalPages > 1 && (
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handleProductPageChange}
            className="mt-8"
          />
        )}
      </div>
    </Container>
  );
}
