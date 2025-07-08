import * as yup from "yup";

export const cartSchema = yup.object({
  name: yup
    .string()
    .required("Ім'я обовʼязкове")
    .min(2, "Ім'я має містити принаймні 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .trim(),

  email: yup
    .string()
    .required("Email обовʼязковий")
    .email("Невірний формат email")
    .max(100, "Максимум 100 символів")
    .trim(),

  phone: yup
    .string()
    .required("Телефон обовʼязковий")
    .matches(/^\+?[\d\s\-\(\)]{10,}$/, "Невірний формат телефону")
    .trim(),

  address: yup
    .string()
    .required("Адреса обовʼязкова")
    .min(10, "Адреса має містити принаймні 10 символів")
    .max(150, "Адреса не повинна перевищувати 150 символів")
    .trim(),
});
