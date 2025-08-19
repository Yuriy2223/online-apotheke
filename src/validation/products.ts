import * as yup from "yup";

export const productSchema = yup.object({
  photo: yup
    .string()
    .required("Product photo is required")
    .url("Photo must be a valid URL")
    .trim(),
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  category: yup
    .string()
    .required("Category is required")
    .max(50, "Category cannot exceed 50 characters")
    .trim(),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock quantity is required")
    .min(0, "Stock must be positive"),
  suppliers: yup
    .string()
    .required("Supplier is required")
    .max(100, "Supplier name cannot exceed 100 characters")
    .trim(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0.01, "Price must be greater than 0"),
});
