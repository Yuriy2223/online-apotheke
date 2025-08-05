"use client";

import { Container } from "@/shared/Container";

export default function CustomersPage() {
  return (
    <Container className="py-6 tablet:py-8">
      <div className="flex items-center justify-center h-40">
        <h1 className="text-3xl font-semibold text-green-dark">
          Customers Page
        </h1>
      </div>
    </Container>
  );
}
