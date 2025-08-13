"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Container } from "@/shared/Container";
import { FilterProductsPage } from "./FilterProductsPage";
import { ProductsPageTable } from "./ProductsPageTable";
// import { AddProductButton } from "./AddProductButton";
import { useAppDispatch } from "@/redux/store";
import { openModal } from "@/redux/modal/slice";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleFilterChange = (filterValue: string) => {
    console.log("Filter value changed:", filterValue);
  };

  const handleAddProduct = () => {
    dispatch(
      openModal({
        type: "ModalAddProduct",
      })
    );
  };
  const handleEditProduct = () => {
    dispatch(
      openModal({
        type: "ModalEditProduct",
      })
    );
  };

  const handleDeleteProduct = () => {
    dispatch(
      openModal({
        type: "ModalDeleteProduct",
      })
    );
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
