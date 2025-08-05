"use client";

import { IncomeExpenses } from "@/components/IncomeExpenses/IncomeExpenses";
import { RecentCustomers } from "@/components/RecentCustomers/RecentCustomers";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Statistics } from "@/components/Statistics/Statistics";
import { Container } from "@/shared/Container";

export default function DashboardPage() {
  return (
    <Container className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 tablet:ml-20">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-6 tablet:py-8">
          <Statistics />

          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
            <RecentCustomers />
            <IncomeExpenses />
          </div>
        </div>
      </div>
    </Container>
  );
}
