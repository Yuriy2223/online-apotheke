"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { AppDispatch } from "@/redux/store";
import { setFilters } from "@/redux/customers/slice";
import { fetchDashboardCustomers } from "@/redux/customers/operations";
import { CustomersPageFilter } from "@/components/Dashboard/CustomersPageFilter";
import { CustomersPageTable } from "@/components/Dashboard/CustomersPageTable";
import {
  selectCustomers,
  selectFilters,
  selectLoading,
} from "@/redux/customers/selectors";

export default function CustomersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchDashboardCustomers(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (filterValue: string) => {
    dispatch(setFilters({ search: filterValue }));
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All customers</h1>
        </div>

        <div className="py-5">
          <CustomersPageFilter onFilterChange={handleFilterChange} />
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
      </div>
    </Container>
  );
}
