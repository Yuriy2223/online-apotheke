"use client";

import { Container } from "@/shared/Container";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Store,
  Settings,
  TrendingUp,
  Package,
} from "lucide-react";

export default function FeaturesPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleScheduleDemo = () => {
    router.push("/contacts");
  };
  const features = [
    {
      id: 1,
      icon: ShoppingCart,
      title: "Take user orders form online",
      description:
        "Accept and manage customer orders through our integrated online ordering system. Streamline your workflow and never miss a sale.",
      benefits: [
        "Real-time order notifications",
        "Automated order processing",
        "Customer order history",
      ],
    },
    {
      id: 2,
      icon: Store,
      title: "Create your shop profile",
      description:
        "Build a professional online presence for your pharmacy with customizable shop profiles that attract more customers.",
      benefits: [
        "Custom branding options",
        "Business information display",
        "Customer reviews and ratings",
      ],
    },
    {
      id: 3,
      icon: Settings,
      title: "Manage your store",
      description:
        "Comprehensive tools to efficiently manage all aspects of your pharmacy operations from one centralized dashboard.",
      benefits: ["Inventory management", "Staff scheduling", "Sales analytics"],
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Get more orders",
      description:
        "Increase your customer base and boost sales through our platform's marketing tools and customer acquisition features.",
      benefits: [
        "Marketing campaigns",
        "Customer recommendations",
        "Loyalty programs",
      ],
    },
    {
      id: 5,
      icon: Package,
      title: "Storage shed",
      description:
        "Advanced inventory management tools to track stock levels, manage suppliers, and optimize your storage operations.",
      benefits: [
        "Stock level monitoring",
        "Supplier management",
        "Automated reordering",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-light">
      <Container className="py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl desktop:text-5xl font-bold text-black-true mb-6">
            Platform Features
          </h1>
          <p className="text-lg text-gray-dark max-w-2xl mx-auto">
            Discover the powerful tools and features that make our platform the
            perfect solution for modern pharmacy management
          </p>
        </div>

        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-white-true rounded-xl p-8 shadow-sm border border-gray-light hover:shadow-lg transition-all duration-300 ${
                  index === features.length - 1 && features.length % 2 !== 0
                    ? "desktop:col-span-2 desktop:max-w-2xl desktop:mx-auto"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-soft flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black-true mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-dark leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="ml-16">
                  <h4 className="text-sm font-medium text-black-true mb-3">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-2 text-sm text-gray-dark"
                      >
                        <div className="w-1.5 h-1.5 bg-green-dark rounded-full flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-white-true rounded-xl p-8 shadow-sm border border-gray-light">
          <h2 className="text-2xl font-bold text-black-true mb-4">
            Ready to Transform Your Pharmacy?
          </h2>
          <p className="text-gray-dark mb-6 max-w-xl mx-auto">
            Join thousands of pharmacies already using our platform to
            streamline operations and grow their business
          </p>
          <div className="flex flex-col tablet:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-green-dark text-white-true rounded-lg hover:bg-green-light transition-colors font-medium"
            >
              Get Started Today
            </button>
            <button
              onClick={handleScheduleDemo}
              className="px-8 py-3 border border-green-dark text-green-dark rounded-lg hover:bg-green-soft transition-colors font-medium"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
