"use client";

import { useEffect, useState, useRef } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { ProductsPageTable } from "./ProductsPageTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openModal } from "@/redux/modal/slice";
import { Filter, Plus } from "lucide-react";
import { fetchDashboardProducts } from "@/redux/dashboard-product/operations";
import { setFilters } from "@/redux/dashboard-product/slice";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import {
  selectFilters,
  selectPagination,
  selectLoading,
} from "@/redux/dashboard-product/selectors";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
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
    dispatch(setFilters({ search: e.target.value, page: 1 }));
  };

  const handleFilterClick = () => {
    dispatch(
      fetchDashboardProducts({
        ...filters,
        page: currentPage,
        limit: deviceLimit,
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
    dispatch(
      openModal({
        type: "ModalEditProduct",
        props: { productId },
      })
    );
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(
      openModal({
        type: "ModalDeleteProduct",
        props: { productId },
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

        <div className="py-5 flex flex-col gap-6 tablet:flex-row tablet:justify-between">
          <div className="flex flex-col tablet:flex-row gap-6 tablet:items-center tablet:w-[450px]">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Product Name"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 border border-gray-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light focus:border-transparent placeholder-gray-soft text-sm"
              />
            </div>
            <button
              onClick={handleFilterClick}
              className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium min-w-fit"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center justify-center gap-2 bg-green-light hover:bg-green-dark text-white-true px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <Plus size={20} />
            Add a new product
          </button>
        </div>

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
