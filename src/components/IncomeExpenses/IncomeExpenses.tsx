"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchRecentTransactions } from "@/redux/dashboard-transactions/operations";
import {
  selectRecentTransactions,
  selectTransactionsError,
  selectTransactionsLoading,
} from "@/redux/dashboard-transactions/selectors";

export function IncomeExpenses() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectRecentTransactions);
  const loading = useAppSelector(selectTransactionsLoading);
  const error = useAppSelector(selectTransactionsError);

  useEffect(() => {
    dispatch(fetchRecentTransactions());
  }, [dispatch]);

  const badgeClasses = {
    income: "bg-green-soft text-green-light",
    expense: "bg-red-dark text-white-true",
  };

  const amountClasses = {
    income: "text-green-light",
    expense: "text-red-dark",
  };

  if (loading) {
    return (
      <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
        <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-black-true">
            Income/Expenses
          </h2>
        </header>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-dark">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
        <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-black-true">
            Income/Expenses
          </h2>
        </header>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
        <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-black-true">
            Income/Expenses
          </h2>
        </header>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-dark">No transactions found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
      <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-black-true">
          Income/Expenses
        </h2>
      </header>

      <div className="overflow-x-auto">
        <div className="bg-gray-light px-6 py-3">
          <h3 className="text-base text-gray-dark">Recent</h3>
        </div>

        <ul className="divide-y divide-gray-300 w-[684px] desktop:w-full">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="flex items-center justify-between py-3 px-2"
            >
              <div className="flex items-center gap-6 min-w-0">
                <span
                  className={`flex items-center justify-center rounded-full text-sm font-medium w-24 h-9 ${
                    badgeClasses[transaction.type]
                  }`}
                >
                  {transaction.type}
                </span>
                <div className="min-w-0">
                  <span className="text-sm text-black-true truncate block">
                    {transaction.name}
                  </span>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  amountClasses[transaction.type]
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {Math.abs(transaction.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
