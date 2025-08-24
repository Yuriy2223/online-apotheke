"use client";

import { Container } from "@/shared/Container";
import {
  FileText,
  User,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  AlertTriangle,
  Scale,
} from "lucide-react";

export default function TermsConditionsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_PHARMACY_EMAIL;
  const supportPhone = process.env.NEXT_PUBLIC_PHARMACY_PHONE;
  const supportAddress = process.env.NEXT_PUBLIC_PHARMACY_ADDRESS;
  const phoneHref = supportPhone?.replace(/\D/g, "")
    ? `tel:${supportPhone.replace(/\D/g, "")}`
    : undefined;
  const emailHref = supportEmail ? `mailto:${supportEmail}` : undefined;

  const sections = [
    {
      id: 1,
      icon: User,
      title: "Registration and Account",
      content: [
        "Users must be 18 years of age or have parental consent",
        "Providing accurate and up-to-date information during registration",
        "Responsibility for maintaining confidentiality of account credentials",
        "Platform's right to suspend account for terms violations",
      ],
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: "Orders and Purchases",
      content: [
        "All orders are subject to product availability at partner pharmacies",
        "Prescription medications require a valid doctor's prescription",
        "Right to refuse sale in the absence of necessary documents",
        "Order confirmation does not guarantee automatic medication dispensing",
      ],
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Prices and Payment",
      content: [
        "Prices may change without prior notice",
        "Payment is processed through secure payment systems",
        "Refunds according to current Ukrainian legislation",
        "Additional delivery charges are indicated separately",
      ],
    },
    {
      id: 4,
      icon: Truck,
      title: "Delivery and Receipt",
      content: [
        "Delivery times are approximate and may vary",
        "Delivery responsibility lies with partner delivery services",
        "Product inspection upon receipt is mandatory",
        "Prescription medications are dispensed only upon presentation of prescription",
      ],
    },
    {
      id: 5,
      icon: Shield,
      title: "Medical Responsibility",
      content: [
        "The platform does not provide medical consultations or advice",
        "Consultation with a doctor is mandatory before taking medications",
        "User bears responsibility for proper medication use",
        "Immediate medical attention required for side effects",
      ],
    },
    {
      id: 6,
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "Platform acts as an intermediary between users and pharmacies",
        "We are not responsible for the quality of partner products",
        "Limited liability within the order value",
        "Exclusion of indirect and incidental damages",
      ],
    },
    {
      id: 7,
      icon: Scale,
      title: "Intellectual Property Rights",
      content: [
        "All platform materials are protected by copyright",
        "Prohibition of copying and distributing content",
        "Trademarks and logos are property of respective owners",
        "Respect for third-party intellectual property rights",
      ],
    },
    {
      id: 8,
      icon: FileText,
      title: "Changes to Terms and Termination",
      content: [
        "Right to make changes to terms with prior notice",
        "Continued use means acceptance of new terms",
        "Right to terminate services at any time",
        "Severability of provisions if others are deemed invalid",
      ],
    },
  ];

  const importantRules = [
    {
      title: "Prescription Medications",
      description:
        "Dispensed only with a doctor's prescription according to Ukrainian legislation",
      icon: "💊",
    },
    {
      title: "Age Restrictions",
      description:
        "Some medications have age restrictions according to instructions",
      icon: "🔞",
    },
    {
      title: "Expiration Date",
      description:
        "All products are checked for expiration dates before dispensing",
      icon: "📅",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12 px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These terms govern the use of our online medicine ordering platform.
            By continuing to use the service, you agree to all the terms
            provided below.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: August 24, 2025
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Important Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantRules.map((rule, index) => (
              <div
                key={index}
                className="bg-amber-50 border border-amber-200 rounded-xl p-6"
              >
                <div className="text-3xl mb-3 text-center">{rule.icon}</div>
                <h3 className="font-semibold text-amber-900 mb-2 text-center">
                  {rule.title}
                </h3>
                <p className="text-amber-800 text-sm text-center leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-900 mb-2">
                Legal Disclaimer
              </h4>
              <p className="text-red-800 leading-relaxed mb-3">
                Our platform operates under the laws of Ukraine. All disputes
                are resolved in accordance with Ukrainian law in the courts of
                Kyiv.
              </p>
              <p className="text-red-800 leading-relaxed">
                Pharmaceutical activity is licensed in accordance with the
                requirements of the Ministry of Health of Ukraine. License
                №12345 dated 01.01.2025.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-orange-900 mb-2">
              📞 Emergency Assistance
            </h4>
            <p className="text-orange-800 mb-3">
              In case of urgent questions regarding medicines or side effects:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-center">
                <div className="text-sm text-orange-600">Hotline:</div>
                <div className="font-bold text-orange-900 text-lg">
                  0 800 50 55 00
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-orange-300"></div>
              <div className="text-center">
                <div className="text-sm text-orange-600">Ambulance:</div>
                <div className="font-bold text-orange-900 text-lg">103</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about the Terms of Use?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have questions about our Terms of Use or need legal
            consultation, please contact our support service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {supportEmail && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Email:</div>
                <a
                  href={emailHref}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            )}
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            {supportPhone && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Phone:</div>
                <a
                  href={phoneHref}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {supportPhone}
                </a>
              </div>
            )}
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            {supportAddress && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Address:</div>
                <div className="font-medium text-gray-900">
                  {supportAddress}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Using the platform means full acceptance of these terms. If you do
            not agree with any provisions, please stop using the service.
          </p>
        </div>
      </Container>
    </div>
  );
}
