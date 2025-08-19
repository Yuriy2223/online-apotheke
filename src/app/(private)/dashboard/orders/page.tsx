"use client";

import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { OrdersPageFilter } from "@/components/Filters/OrdersPageFilter";
import { usePagination } from "@/hooks/usePagination";
import { fetchDashboardOrders } from "@/redux/orders/operations";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilters } from "@/redux/orders/slice";
import { OrdersPageTable } from "@/components/Table/OrdersPageTable";
import {
  selectFilters,
  selectLoading,
  selectOrders,
  selectPagination,
  selectStatuses,
} from "@/redux/orders/selectors";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const statuses = useAppSelector(selectStatuses);
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
    setSelectedStatus(filters.status);
  }, [filters.search, filters.status]);

  useEffect(() => {
    const fetchKey = `${currentPage}-${deviceLimit}-${filters.search}-${filters.status}-${filters.sortBy}`;

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
            fetchDashboardOrders({
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
      fetchDashboardOrders({
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleFilterClick = () => {
    dispatch(
      setFilters({
        search: searchInput,
        status: selectedStatus,
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
    setSelectedStatus("");
    dispatch(
      setFilters({
        search: "",
        status: "",
        page: 1,
      })
    );
  };

  const handleOrdersPageChange = (page: number) => {
    dispatch(setFilters({ page }));
    handlePageChange(page);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All Orders</h1>
        </div>

        <div className="py-5">
          <OrdersPageFilter
            searchInput={searchInput}
            selectedStatus={selectedStatus}
            statuses={statuses}
            loading={loading}
            onFilterChange={handleFilterChange}
            onStatusChange={handleStatusChange}
            onKeyPress={handleKeyPress}
            onFilterClick={handleFilterClick}
            onClearSearch={handleClearSearch}
          />
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
            <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
              <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-black-true">
                  All Orders
                </h2>
              </header>

              <div className="overflow-x-auto">
                <OrdersPageTable orders={orders} />
              </div>

              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-light"></div>
                  <span className="ml-2 text-gray-600">Loading orders...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {paginationData && paginationData.totalPages > 1 && (
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handleOrdersPageChange}
            className="mt-8"
          />
        )}
      </div>
    </Container>
  );
}
