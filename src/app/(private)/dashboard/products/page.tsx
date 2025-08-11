"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { FilterProductsPage } from "./FilterProductsPage";
import { ProductsPageTable } from "./ProductsPageTable";
import { AddProductButton } from "./AddProductButton";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (filterValue: string) => {
    console.log("Filter value changed:", filterValue);
  };

  const handleAddProduct = () => {
    console.log("Adding new product...");
  };

  const handleEditProduct = (productId: string) => {
    console.log("Edit product:", productId);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log("Delete product:", productId);
  };

  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[110px_1fr] relative desktop:pl-0 desktop:pr-4 pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">All products</h1>
        </div>

        <div className="py-5 flex flex-col gap-6 tablet:flex-row tablet:justify-between">
          <FilterProductsPage onFilterChange={handleFilterChange} />
          <AddProductButton onClick={handleAddProduct} />
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
      </div>
    </Container>
  );
}
