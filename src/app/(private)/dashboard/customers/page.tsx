"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { setFilters } from "@/redux/customers/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { usePagination } from "@/hooks/usePagination";
import { fetchDashboardCustomers } from "@/redux/customers/operations";
import { CustomersPageFilter } from "@/components/Dashboard/CustomersPageFilter";
import { CustomersPageTable } from "@/components/Dashboard/CustomersPageTable";
import { Pagination } from "@/components/Pagination/Pagination";
import {
  selectCustomers,
  selectFilters,
  selectLoading,
  selectPagination,
} from "@/redux/customers/selectors";

export default function CustomersPage() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();
  // const customers = useSelector(selectCustomers);
  // const loading = useSelector(selectLoading);
  // const filters = useSelector(selectFilters);

  // useEffect(() => {
  //   dispatch(fetchDashboardCustomers(filters));
  // }, [dispatch, filters]);

  // const handleFilterChange = (filterValue: string) => {
  //   dispatch(setFilters({ search: filterValue }));
  // };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
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
    const fetchKey = `${currentPage}-${deviceLimit}-${filters.search}-${filters.sortBy}`;

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
            fetchDashboardCustomers({
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
      fetchDashboardCustomers({
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
        page: 1,
      })
    );
  };

  const handleCustomersPageChange = (page: number) => {
    dispatch(setFilters({ page }));
    handlePageChange(page);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All customers</h1>
        </div>

        <div className="py-5">
          <CustomersPageFilter
            searchInput={searchInput}
            loading={loading}
            onFilterChange={handleFilterChange}
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
                  All customers
                </h2>
              </header>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-light"></div>
                  </div>
                ) : (
                  <CustomersPageTable customers={customers} />
                )}
              </div>
            </div>
          </div>
        </div>

        {paginationData && paginationData.totalPages > 1 && (
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handleCustomersPageChange}
            className="mt-8"
          />
        )}
      </div>
    </Container>
  );
}
