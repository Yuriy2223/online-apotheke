"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { OrdersPageTable } from "./OrdersPageTable";
import { FilterOrdersPage } from "./FilterOrdersPage";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleFilterChange = (filterValue: string) => {
    console.log("Filter value changed:", filterValue);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All orders</h1>
        </div>

        <div className="py-5">
          <FilterOrdersPage onFilterChange={handleFilterChange} />
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
                  All orders
                </h2>
              </header>

              <div className="overflow-x-auto">
                <OrdersPageTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
