"use client";

import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { usePagination } from "@/hooks/usePagination";
import { fetchDashboardSuppliers } from "@/redux/suppliers/operations";
import { setFilters } from "@/redux/suppliers/slice";
import { openModal } from "@/redux/modal/slice";
import { SuppliersPageFilter } from "@/components/Dashboard/SuppliersPageFilter";
import { SuppliersPageTable } from "@/components/Dashboard/SuppliersPageTable";
import {
  selectFilters,
  selectLoading,
  selectPagination,
  selectSuppliers,
} from "@/redux/suppliers/selectors";

export default function SuppliersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector(selectSuppliers);
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
    const fetchKey = `${currentPage}-${deviceLimit}-${filters.search}-${filters.status}-${filters.sortBy}`;
    if (lastFetchParams.current === fetchKey || loading) {
      return;
    }

    const executeRequest = () => {
      lastFetchParams.current = fetchKey;
      dispatch(
        fetchDashboardSuppliers({
          ...filters,
          page: currentPage,
          limit: deviceLimit,
        })
      );
    };

    if (isInitialRender.current) {
      isInitialRender.current = false;

      const timer = setTimeout(() => {
        const currentFetchKey = `${currentPage}-${deviceLimit}-${filters.search}-${filters.status}-${filters.sortBy}`;
        if (lastFetchParams.current !== currentFetchKey && !loading) {
          executeRequest();
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      executeRequest();
    }
  }, [dispatch, currentPage, deviceLimit, filters, loading]);

  useEffect(() => {
    return () => {
      lastFetchParams.current = "";
    };
  }, []);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilterClick();
    }
  };
  const handleFilterClick = () => {
    dispatch(
      setFilters({
        search: searchInput,
        page: 1,
      })
    );
  };
  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(
      setFilters({
        search: "",
        status: "",
        page: 1,
      })
    );
  };
  const handleAddSupplier = () => {
    dispatch(
      openModal({
        type: "ModalAddSupplier",
      })
    );
  };
  const handleEditSupplier = (supplierId: string) => {
    const supplier = suppliers.find((p) => p._id === supplierId);
    dispatch(
      openModal({
        type: "ModalEditSupplier",
        props: { supplier },
      })
    );
  };
  const handleDeleteSupplier = (supplierId: string) => {
    const supplier = suppliers.find((p) => p._id === supplierId);
    dispatch(
      openModal({
        type: "ModalDeleteSupplier",
        props: {
          supplierId,
          supplierName: supplier?.name,
        },
      })
    );
  };
  const handleSupplierPageChange = (page: number) => {
    dispatch(setFilters({ page }));
    handlePageChange(page);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All suppliers</h1>
        </div>

        <div className="py-5 flex flex-col gap-6 tablet:flex-row tablet:justify-between">
          <SuppliersPageFilter
            onFilterChange={handleFilterChange}
            searchInput={searchInput}
            loading={loading}
            onKeyPress={handleKeyPress}
            onFilterClick={handleFilterClick}
            onAddSupplier={handleAddSupplier}
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
            <div className="bg-white-true rounded-lg shadow border border-gray-soft p-2">
              <header className="bg-green-soft px-4 py-3 border-b border-gray-soft">
                <h2 className="text-lg font-semibold text-black-true">
                  All suppliers
                </h2>
              </header>

              <div className="overflow-x-auto">
                <SuppliersPageTable
                  onEditSupplier={handleEditSupplier}
                  onDeleteSupplier={handleDeleteSupplier}
                />
              </div>
            </div>
          </div>
        </div>
        {paginationData && paginationData.totalPages > 1 && (
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handleSupplierPageChange}
            className="mt-8"
          />
        )}
      </div>
    </Container>
  );
}
