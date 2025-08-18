"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchRecentCustomers } from "@/redux/customers/operations";
import {
  selectError,
  selectRecentCustomers,
  selectRecentLoading,
} from "@/redux/customers/selectors";

export function RecentCustomers() {
  const dispatch = useAppDispatch();
  const recentCustomers = useAppSelector(selectRecentCustomers);
  const loading = useAppSelector(selectRecentLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchRecentCustomers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
        <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-black-true">
            Recent Customers
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
            Recent Customers
          </h2>
        </header>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (recentCustomers.length === 0) {
    return (
      <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
        <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-black-true">
            Recent Customers
          </h2>
        </header>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-dark">No customers found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
      <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-black-true">
          Recent Customers
        </h2>
      </header>
      <div className="overflow-x-auto">
        <table className="w-[684px] desktop:w-full border-collapse">
          <thead>
            <tr className="bg-gray-light divide-x divide-gray-300">
              <th
                className="px-6 py-3 text-left text-base font-medium text-gray-dark"
                scope="col"
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-base font-medium text-gray-dark"
                scope="col"
              >
                Email
              </th>
              <th
                className="px-6 py-3 text-left text-base font-medium text-gray-dark"
                scope="col"
              >
                Spent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {recentCustomers.map((customer) => (
              <tr key={customer._id} className="divide-x divide-gray-300">
                <td className="px-6 py-3 flex items-center gap-3">
                  {customer.photo ? (
                    <img
                      src={customer.photo}
                      alt={customer.name}
                      className="w-9 h-9 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const initialsElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (initialsElement)
                          initialsElement.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark"
                    style={{ display: customer.photo ? "none" : "flex" }}
                  >
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-black-true">
                    {customer.name}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-black-true">
                  {customer.email}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-black-true">
                  $
                  {customer.spent.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
