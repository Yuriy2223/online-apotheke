"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { selectCategories } from "@/redux/dashboard-product/selectors";
import { updateDashboardProduct } from "@/redux/dashboard-product/operations";
import { productSchema } from "@/validation/products";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

type ProductFormData = yup.InferType<typeof productSchema>;

interface EditProductProps {
  product?: {
    _id: string;
    name: string;
    category: string;
    stock: number;
    suppliers: string;
    price: number;
    photo?: string;
  };
}

export const ModalEditProduct = ({ product }: EditProductProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useCloudinaryUpload();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      photo: product?.photo || "",
      name: product?.name || "",
      category: product?.category || "",
      stock: product?.stock,
      suppliers: product?.suppliers || "",
      price: product?.price,
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must not exceed 5MB");
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      setValue("photo", imageUrl, { shouldValidate: true });
    } catch {
      toast.error("Load error");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (product?._id) {
      await dispatch(
        updateDashboardProduct({
          id: product._id,
          data: data,
        })
      ).unwrap();
    }
    dispatch(closeModal());
  };

  const handleCancel = () => {
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-black-true">Edit product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              {...register("photo")}
              type="text"
              placeholder="Product photo URL"
              className={`w-full border rounded-lg px-4 py-2 text-sm outline-none
                 focus:ring-2 focus:ring-green-light focus:border-transparent transition-all ${
                   errors.photo ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 bg-green-light text-white-true rounded-lg
               hover:bg-green-dark transition-colors disabled:opacity-50 
               disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isUploading ? "Loading..." : "Load photo"}
            </button>
          </div>
          <div className="h-5 mt-1">
            {errors.photo && (
              <span className="text-red-dark text-xs">
                {errors.photo.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2">
          <div className="flex flex-col">
            <input
              {...register("name")}
              placeholder="Product Info"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light focus:border-transparent transition-all ${
                   errors.name ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.name && (
                <span className="text-red-dark text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <select
              {...register("category")}
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light focus:border-transparent transition-all ${
                   errors.category ? "border-red-dark" : "border-gray-soft"
                 }`}
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="h-5 mt-1">
              {errors.category && (
                <span className="text-red-dark text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2">
          <div className="flex flex-col">
            <input
              {...register("stock", { valueAsNumber: true })}
              placeholder="Stock"
              type="number"
              min="0"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light focus:border-transparent transition-all ${
                   errors.stock ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.stock && (
                <span className="text-red-dark text-xs">
                  {errors.stock.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <input
              {...register("suppliers")}
              placeholder="Suppliers"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light focus:border-transparent transition-all ${
                   errors.suppliers ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.suppliers && (
                <span className="text-red-dark text-xs">
                  {errors.suppliers.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <input
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
            type="number"
            step="0.01"
            min="0.01"
            className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
               focus:ring-green-light focus:border-transparent transition-all ${
                 errors.price ? "border-red-dark" : "border-gray-soft"
               }`}
          />
          <div className="h-5 mt-1">
            {errors.price && (
              <span className="text-red-dark text-xs">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1 bg-green-light text-white-true rounded-lg py-2 px-4 hover:bg-green-dark 
            focus:ring-2 focus:ring-green-dark focus:ring-offset-2 transition-all font-medium 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting || isUploading}
            className="flex-1 bg-gray-soft text-black-true rounded-lg py-2 px-4 hover:bg-gray-dark
             hover:text-white-true focus:ring-2 focus:ring-gray-dark focus:ring-offset-2 transition-all 
             font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
