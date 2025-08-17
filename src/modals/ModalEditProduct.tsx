"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { selectCategories } from "@/redux/dashboard-product/selectors";
import { updateDashboardProduct } from "@/redux/dashboard-product/operations";

interface EditProductProps {
  product?: {
    _id: string;
    name: string;
    category: string;
    stock: number;
    suppliers: string;
    price: number;
  };
}

export const ModalEditProduct = ({ product }: EditProductProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    stock: product?.stock?.toString() || "",
    suppliers: product?.suppliers || "",
    price: product?.price?.toString() || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      stock: Number(formData.stock),
      price: Number(formData.price),
    };

    if (product?._id) {
      dispatch(
        updateDashboardProduct({
          id: product._id,
          data: submissionData,
        })
      );
    }
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-4 max-tablet:gap-5 tablet:gap-6 ">
      <h2 className="text-lg max-tablet:text-xl tablet:text-3xl font-semibold text-black-true pr-8 max-tablet:pr-10 tablet:pr-12">
        Edit product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-tablet:gap-4 tablet:gap-5"
      >
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 max-tablet:gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Info"
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-soft rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 text-sm min-[768px]:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            type="number"
            min="0"
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
          <input
            name="suppliers"
            value={formData.suppliers}
            onChange={handleChange}
            placeholder="Suppliers"
            className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          min="0"
          className="border border-gray-soft rounded-lg px-3 py-2 max-tablet:px-4 max-tablet:py-2.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-light text-white-true rounded-lg py-2 px-4 hover:bg-green-dark focus:ring-2 focus:ring-green-dark focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-soft text-black-true rounded-lg py-2 px-4 hover:bg-gray-dark hover:text-white-true focus:ring-2 focus:ring-gray-dark focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
