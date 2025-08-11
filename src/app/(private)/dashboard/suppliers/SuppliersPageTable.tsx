import { Edit } from "lucide-react";
import { suppliers } from "./123";
import { Supplier } from "@/types/suppliers";

export interface SuppliersPageTableProps {
  singleSupplier?: Supplier;
  highlightId?: string;
  onEditSupplier: (supplierId: string) => void;
}

export function SuppliersPageTable({
  singleSupplier,
  highlightId,
  onEditSupplier,
}: SuppliersPageTableProps) {
  const data = singleSupplier ? [singleSupplier] : suppliers;

  return (
    <table className="w-[1300px] desktop:w-full border-collapse">
      <thead>
        <tr className="bg-gray-light divide-x divide-gray-300">
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Suppliers Info
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Address
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Company
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Delivery date
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Status
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {data.map((supplier) => (
          <tr
            key={supplier._id}
            className={`divide-x divide-gray-300 ${
              highlightId === supplier._id ? "bg-yellow-100" : ""
            }`}
          >
            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {supplier.name}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {supplier.address}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {supplier.company}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {new Date(supplier.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              $
              {Number(supplier.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>

            <td className="px-6 py-3">
              <span
                className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-full text-sm font-medium ${
                  supplier.status === "Active"
                    ? "bg-green-soft text-green-light"
                    : "bg-red-light text-red-dark"
                }`}
              >
                {supplier.status}
              </span>
            </td>

            <td className="px-3 py-3 flex items-center justify-center">
              <button
                onClick={() => onEditSupplier(supplier._id)}
                className="flex items-center justify-center w-8 h-8 text-green-light hover:text-white-true hover:bg-green-light rounded-md transition-all duration-200 border border-green-light"
                aria-label="Edit supplier"
                title="Edit supplier"
              >
                <Edit
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
