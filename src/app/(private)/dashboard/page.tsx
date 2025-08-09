"use client";

import { useState } from "react";
import { IncomeExpenses } from "@/components/IncomeExpenses/IncomeExpenses";
import { RecentCustomers } from "@/components/RecentCustomers/RecentCustomers";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Statistics } from "@/components/Statistics/Statistics";
import { Container } from "@/shared/Container";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Container className="grid grid-cols-1 desktop:grid-cols-[140px_1fr] relative desktop:pl-0">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div>
        <div className="flex items-center justify-center p-4">
          <h1 className="text-green-light text-4xl">Dashboard</h1>
        </div>
        <button
          className="absolute top-2 left-0 z-20 bg-green-light hover:bg-green-dark text-white-true px-3 py-2 rounded-md desktop:hidden"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          Sidebar
        </button>
        <div className="flex-1">
          <div className="w-full mx-auto ">
            <Statistics />

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
              <RecentCustomers />
              <IncomeExpenses />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
