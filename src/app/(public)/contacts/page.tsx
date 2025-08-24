"use client";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Phone, MapPin, Clock, Send, Calendar } from "lucide-react";
import { Container } from "@/shared/Container";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  requestType: "demo" | "support" | "sales" | "partnership" | "other";
}

const validationSchema = yup.object().shape({
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

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      requestType: "demo",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);

      toast.success("Thank you for your inquiry! We will contact you shortly.");
      reset();
    } catch {
      toast.error(
        "An error occurred while sending the message. Please try again."
      );
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "support@pharmacy-platform.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM - 6 PM",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Healthcare Ave, Medical District",
      description: "Suite 500, City, State 12345",
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon - Fri: 9:00 AM - 6:00 PM",
      description: "Weekend support available",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-light">
      <Container className="py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl desktop:text-5xl font-bold text-black-true mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-dark max-w-2xl mx-auto">
            Ready to transform your pharmacy? Get in touch with our team to
            schedule a demo or learn more about our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12">
          <div className="bg-white-true rounded-xl p-8 shadow-sm border border-gray-light">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-soft flex items-center justify-center">
                <Send className="w-5 h-5 text-green-dark" />
              </div>
              <h2 className="text-2xl font-bold text-black-true">
                Get in Touch
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black-true mb-2">
                  What can we help you with?
                </label>
                <select
                  {...register("requestType")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                    errors.requestType ? "border-red-500" : "border-gray-light"
                  }`}
                >
                  <option value="demo">Schedule a Demo</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.requestType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.requestType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-true mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-light"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black-true mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-light"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-true mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-light"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black-true mb-2">
                    Pharmacy/Company Name
                  </label>
                  <input
                    type="text"
                    {...register("company")}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                      errors.company ? "border-red-500" : "border-gray-light"
                    }`}
                    placeholder="Your pharmacy name"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black-true mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent ${
                    errors.subject ? "border-red-500" : "border-gray-light"
                  }`}
                  placeholder="Brief subject of your inquiry"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black-true mb-2">
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent resize-none ${
                    errors.message ? "border-red-500" : "border-gray-light"
                  }`}
                  placeholder="Tell us more about your needs..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-green-dark text-white-true rounded-lg hover:bg-green-light transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white-true border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white-true rounded-xl p-8 shadow-sm border border-gray-light">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-soft flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-dark" />
                </div>
                <h2 className="text-2xl font-bold text-black-true">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-soft flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-4 h-4 text-green-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black-true mb-1">
                          {item.title}
                        </h3>
                        <p className="text-green-dark font-medium mb-1">
                          {item.info}
                        </p>
                        <p className="text-sm text-gray-dark">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-green-soft rounded-xl p-6 border border-green-dark">
              <h3 className="text-lg font-semibold text-green-dark mb-2">
                Quick Response Guarantee
              </h3>
              <p className="text-sm text-gray-dark mb-4">
                We typically respond to all inquiries within 2 hours during
                business hours. For urgent matters, please call us directly.
              </p>
              <div className="flex items-center gap-2 text-green-dark text-sm font-medium">
                <Clock className="w-4 h-4" />
                Average response time: 1-2 hours
              </div>
            </div>

            <div className="bg-white-true rounded-xl p-6 shadow-sm border border-gray-light">
              <h3 className="text-lg font-semibold text-black-true mb-2">
                Have a Quick Question?
              </h3>
              <p className="text-sm text-gray-dark mb-4">
                Check out our FAQ section for immediate answers to common
                questions about our platform.
              </p>
              <button className="text-green-dark hover:text-green-light font-medium transition-colors">
                Visit FAQ →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
