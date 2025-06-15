import * as yup from "yup";

export const createProductSchema = yup.object({
  photo: yup
    .string()
    .required("Фото продукту є обов'язковим")
    .url("Фото повинно бути коректним URL")
    .trim(),

  name: yup
    .string()
    .required("Назва продукту є обов'язковою")
    .min(2, "Назва повинна містити мінімум 2 символи")
    .max(100, "Назва не може перевищувати 100 символів")
    .trim(),

  suppliers: yup
    .string()
    .required("Постачальник є обов'язковим")
    .max(100, "Назва постачальника не може перевищувати 100 символів")
    .trim(),

  stock: yup
    .string()
    .required("Кількість на складі є обов'язковою")
    .matches(/^\d+$/, "Кількість повинна бути числом")
    .trim(),

  price: yup
    .string()
    .required("Ціна є обов'язковою")
    .matches(/^\d+(\.\d{1,2})?$/, "Неправильний формат ціни (наприклад: 25.99)")
    .trim(),

  category: yup
    .string()
    .required("Категорія є обов'язковою")
    .max(50, "Категорія не може перевищувати 50 символів")
    .trim(),
});

export const updateProductSchema = yup.object({
  photo: yup.string().url("Фото повинно бути коректним URL").trim().optional(),

  name: yup
    .string()
    .min(2, "Назва повинна містити мінімум 2 символи")
    .max(100, "Назва не може перевищувати 100 символів")
    .trim()
    .optional(),

  suppliers: yup
    .string()
    .max(100, "Назва постачальника не може перевищувати 100 символів")
    .trim()
    .optional(),

  stock: yup
    .string()
    .matches(/^\d+$/, "Кількість повинна бути числом")
    .trim()
    .optional(),

  price: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Неправильний формат ціни (наприклад: 25.99)")
    .trim()
    .optional(),

  category: yup
    .string()
    .max(50, "Категорія не може перевищувати 50 символів")
    .trim()
    .optional(),
});

export const searchProductsSchema = yup.object({
  search: yup.string().trim().optional(),
  category: yup.string().trim().optional(),
  supplier: yup.string().trim().optional(),
  minPrice: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Неправильний формат мінімальної ціни")
    .optional(),
  maxPrice: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Неправильний формат максимальної ціни")
    .optional(),
  page: yup
    .string()
    .matches(/^\d+$/, "Сторінка повинна бути числом")
    .optional(),
  limit: yup
    .string()
    .matches(/^\d+$/, "Ліміт повинен бути числом")
    .test("limit-range", "Ліміт повинен бути від 1 до 50", (value) => {
      if (!value) return true;
      const num = parseInt(value, 10);
      return num >= 1 && num <= 50;
    })
    .optional(),
  sortBy: yup
    .string()
    .oneOf(
      ["name", "price", "category", "suppliers", "createdAt", "updatedAt"],
      "Неправильне поле для сортування"
    )
    .optional(),
  sortOrder: yup
    .string()
    .oneOf(["asc", "desc"], "Порядок сортування повинен бути 'asc' або 'desc'")
    .optional(),
});
