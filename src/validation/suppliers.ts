import * as yup from "yup";

export const createSupplierSchema = yup.object({
  name: yup
    .string()
    .required("Supplier name is required")
    .min(2, "Name must be at least 2 characters"),
  address: yup.string().required("Address is required"),
  company: yup.string().required("Company is required"),
  date: yup.string().required("Delivery date is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0"),
  status: yup.string().required("Status is required"),
});

export const editSupplierSchema = yup.object({
  name: yup
    .string()
    .required("Supplier name is required")
    .min(2, "Name must be at least 2 characters"),
  address: yup.string().required("Address is required"),
  company: yup.string().required("Company is required"),
  date: yup.string().required("Delivery date is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Active", "Deactive"], "Status must be either Active or Deactive"),
});
