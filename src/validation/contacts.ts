import { ContactFormData } from "@/app/(public)/contacts/page";
import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must contain at least 3 characters"),
  email: yup.string().required("Email required").email("Enter a valid email"),
  phone: yup
    .string()
    .optional()
    .test("phone-format", "Enter a valid phone number", function (value) {
      if (!value) return true;
      return /^[\+]?[1-9][\d]{0,15}$/.test(value);
    }),
  company: yup.string().optional(),
  subject: yup.string().optional(),
  message: yup
    .string()
    .required("Notification required")
    .min(10, "Message must contain at least 10 characters"),
  requestType: yup
    .string()
    .required("Select request type")
    .oneOf(["demo", "support", "sales", "partnership", "other"] as const),
}) as yup.ObjectSchema<ContactFormData>;
