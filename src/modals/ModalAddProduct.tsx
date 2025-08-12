"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";

export const ModalAddProduct = () => {
  const dispatch = useAppDispatch();
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

    console.log("Add product:", formData);
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-4 min-[375px]:gap-5 min-[768px]:gap-6 min-[1440px]:gap-8">
      <h2 className="text-lg min-[375px]:text-xl min-[768px]:text-2xl min-[1440px]:text-3xl font-semibold text-gray-800 pr-8 min-[375px]:pr-10 min-[768px]:pr-12 min-[1440px]:pr-16">
        Add a new product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 min-[375px]:gap-4 min-[768px]:gap-5 min-[1440px]:gap-6"
      >
        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Product Info"
            className="border border-gray-300 rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Category</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="medicine">Medicine</option>
            <option value="supplements">Supplements</option>
          </select>
        </div>

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock"
            className="border border-gray-300 rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
          <input
            name="suppliers"
            value={formData.suppliers}
            onChange={handleChange}
            type="text"
            placeholder="Suppliers"
            className="border border-gray-300 rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
          className="border border-gray-300 rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          required
        />

        <div className="flex gap-3 min-[375px]:gap-4 min-[1440px]:gap-5 pt-2 min-[768px]:pt-3 min-[1440px]:pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
