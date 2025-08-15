"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { selectCategories } from "@/redux/dashboard-product/selectors";
import { createDashboardProduct } from "@/redux/dashboard-product/operations";

export const ModalAddProduct = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    suppliers: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      name: formData.name,
      category: formData.category,
      stock: Number(formData.stock),
      suppliers: formData.suppliers,
      price: Number(formData.price),
    };

    dispatch(createDashboardProduct(submissionData));
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-4 max-tablet:gap-5 tablet:gap-6">
      <h2 className="text-lg max-tablet:text-xl tablet:text-2xl  font-semibold text-black-true pr-8 max-tablet:pr-10 tablet:pr-12">
        Add a new product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-tablet:gap-4 tablet:gap-6"
      >
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 tablet:gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Product Info"
            className="border border-gray-300 rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-3  text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-3  text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all"
            required
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 tablet:gap-4">
          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock"
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-3  text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all"
            required
          />
          <input
            name="suppliers"
            value={formData.suppliers}
            onChange={handleChange}
            type="text"
            placeholder="Suppliers"
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-3  text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all"
            required
          />
        </div>

        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="Price"
          className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-3  text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all"
          required
        />

        <div className="flex gap-3 tablet:gap-4 pt-2 tablet:pt-3">
          <button
            type="submit"
            className="flex-1 bg-green-light text-white-true rounded-lg py-2 max-tablet:py-2.5 tablet:py-3 px-4 hover:bg-green-dark focus:ring-2 focus:ring-green-light focus:ring-offset-2 transition-all font-medium text-sm tablet:text-base"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-light text-black-true rounded-lg py-2 max-tablet:py-2.5 tablet:py-3 px-4 hover:bg-gray-soft focus:ring-2 focus:ring-gray-dark focus:ring-offset-2 transition-all font-medium text-sm tablet:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
