"use client";

import { Container } from "@/shared/Container";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Database,
  Bell,
  Globe,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const privacyEmail = process.env.NEXT_PUBLIC_PHARMACY_EMAIL;
  const privacyPhone = process.env.NEXT_PUBLIC_PHARMACY_PHONE;

  const phoneHref = privacyPhone
    ? `tel:${privacyPhone.replace(/\D/g, "")}`
    : undefined;
  const emailHref = privacyEmail ? `mailto:${privacyEmail}` : undefined;
  const sections = [
    {
      id: 1,
      icon: FileText,
      title: "Information Collection",
      content: [
        "Personal data: first name, last name, phone number, email address",
        "Medical information: prescriptions, medicine order history",
        "Technical information: IP address, browser data, cookies",
        "Geolocation: for delivery and locating nearby pharmacies",
      ],
    },
    {
      id: 2,
      icon: Shield,
      title: "Data Usage",
      content: [
        "Processing and fulfilling medicine orders",
        "Communicating with customers about order status",
        "Improving service quality and personalization",
        "Ensuring security and preventing fraud",
      ],
    },
    {
      id: 3,
      icon: Lock,
      title: "Information Protection",
      content: [
        "SSL/TLS encryption for all data transfers",
        "Secure servers with multi-level protection",
        "Regular security audits and updates",
        "Limited employee access to personal data",
      ],
    },
    {
      id: 4,
      icon: Users,
      title: "Third-Party Sharing",
      content: [
        "Partner pharmacies for order fulfillment",
        "Delivery services for order transportation",
        "Payment systems for processing transactions",
        "Regulators in cases required by law",
      ],
    },
    {
      id: 5,
      icon: Eye,
      title: "Your Rights",
      content: [
        "Access to your personal data",
        "Correction of inaccurate information",
        "Deletion of data upon service termination",
        "Data portability and complaints to regulators",
      ],
    },
    {
      id: 6,
      icon: Database,
      title: "Data Retention",
      content: [
        "Data is stored during active service use",
        "Order history – up to 5 years for medical purposes",
        "Technical data – up to 2 years",
        "Automatic deletion after expiration period",
      ],
    },
    {
      id: 7,
      icon: Bell,
      title: "Notifications & Consent",
      content: [
        "Transparent notifications about data collection",
        "Option to opt out of marketing communications",
        "Consent to process medical data",
        "Notifications about privacy policy changes",
      ],
    },
    {
      id: 8,
      icon: Globe,
      title: "International Transfers",
      content: [
        "Data processed within Ukraine and the EU",
        "Use of servers with adequate protection levels",
        "Compliance with international GDPR standards",
        "Control over cross-border transfers",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12 px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We take the protection of your personal data and medical information
            seriously. This policy explains how we collect, use, and protect
            your information.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: August 24, 2025
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
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
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
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Medical Privacy
              </h4>
              <p className="text-blue-800 leading-relaxed">
                In accordance with Ukrainian healthcare legislation, all medical
                information is processed with special security measures. We
                adhere to the highest standards of confidentiality when handling
                prescriptions and treatment history.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about Privacy?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about our Privacy Policy or would like to
            exercise your rights, please contact our Data Protection Department.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {privacyEmail && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Email:</div>
                <a
                  href={emailHref}
                  className="font-medium text-gray-900 hover:text-green-dark transition-colors"
                >
                  {privacyEmail}
                </a>
              </div>
            )}
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            {privacyPhone && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Phone:</div>
                <a
                  href={phoneHref}
                  className="font-medium text-gray-900 hover:text-green-dark transition-colors"
                >
                  {privacyPhone}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This Privacy Policy may be updated periodically. We will notify you
            in advance of any significant changes.
          </p>
        </div>
      </Container>
    </div>
  );
}
