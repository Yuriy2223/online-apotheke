import { Edit, Trash2, Search, Package } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { Spinner } from "@/shared/Spinner";
import { Supplier } from "@/types/suppliers";
import {
  selectFilters,
  selectLoading,
  selectSuppliers,
} from "@/redux/suppliers/selectors";

export interface SuppliersPageTableProps {
  singleSupplier?: Supplier;
  highlightId?: string;
  onEditSupplier: (supplierId: string) => void;
  onDeleteSupplier: (supplierId: string) => void;
}

export function SuppliersPageTable({
  singleSupplier,
  highlightId,
  onEditSupplier,
  onDeleteSupplier,
}: SuppliersPageTableProps) {
  const suppliers = useAppSelector(selectSuppliers);
  const loading = useAppSelector(selectLoading);
  const filters = useAppSelector(selectFilters);
  const data = singleSupplier ? [singleSupplier] : suppliers;

  if (loading) {
    return <Spinner />;
  }

  const hasActiveFilters = filters.search || filters.status;
  const isEmpty = data.length === 0;

  const EmptyState = () => (
    <tr>
      <td colSpan={6} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {hasActiveFilters ? (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Search size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <p className="text-black-true text-xl max-w-lg">
                  За вашими критеріями пошуку нічого не знайдено.
                </p>
                <p className="text-gray-dark text-lg">
                  Спробуйте змінити критерії пошуку або очистити фільтри.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Package size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black-true">
                  Немає постачальників
                </h3>
                <p className="text-black-true max-w-lg">
                  Поки що немає жодного постачальника в системі. Додайте першого
                  постачальника, щоб почати.
                </p>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );

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
      <tbody className="divide-y divide-gray-soft">
        {isEmpty ? (
          <EmptyState />
        ) : (
          data.map((supplier) => (
            <tr
              key={supplier._id}
              className={`divide-x divide-gray-soft ${
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

              <td className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onEditSupplier(supplier._id)}
                    className="flex items-center justify-center w-8 h-8 text-green-light hover:text-white-true hover:bg-green-light rounded-md transition-all duration-200 border border-green-light group"
                    aria-label="Edit product"
                    title="Edit supplier"
                  >
                    <Edit
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() => onDeleteSupplier(supplier._id)}
                    className="flex items-center justify-center w-8 h-8 text-red-dark hover:text-white-true hover:bg-red-dark rounded-md transition-all duration-200 border border-red-dark group"
                    aria-label="Delete product"
                    title="Delete supplier"
                  >
                    <Trash2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
