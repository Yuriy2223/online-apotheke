import { Users, Search } from "lucide-react";
import { selectLoading } from "@/redux/customers/selectors";
import { useAppSelector } from "@/redux/store";
import { Spinner } from "@/shared/Spinner";
import { Customer } from "@/types/customers";

interface CustomersTableProps {
  customers: Customer[];
  singleCustomer?: Customer;
  highlightId?: string;
  hasActiveFilters?: boolean;
}

export function CustomersPageTable({
  customers,
  singleCustomer,
  highlightId,
  hasActiveFilters = false,
}: CustomersTableProps) {
  const data = singleCustomer ? [singleCustomer] : customers;
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return <Spinner />;
  }

  const isEmpty = data.length === 0;

  const EmptyState = () => (
    <tr>
      <td colSpan={5} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {hasActiveFilters ? (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Search size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <p className="text-black-true text-xl max-w-lg">
                  Nothing was found for your search criteria.
                </p>
                <p className="text-gray-dark text-lg">
                  Try changing your search criteria or clearing your filters.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Users size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black-true">
                  No customers
                </h3>
                <p className="text-black-true max-w-lg">
                  There are no clients in the system yet. The first clients will
                  appear after registration.
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
        <tr className="bg-gray-light divide-x divide-gray-soft">
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            User Info
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Email
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Address
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Register date
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-soft">
        {isEmpty ? (
          <EmptyState />
        ) : (
          data.map((c) => (
            <tr
              key={c._id}
              className={`divide-x divide-gray-soft ${
                highlightId === c._id ? "bg-yellow-100" : ""
              }`}
            >
              <td className="px-6 py-3 flex items-center gap-3">
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt={c.name}
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
                  className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center 
                  text-xs font-medium text-gray-dark"
                  style={{ display: c.photo ? "none" : "flex" }}
                >
                  {c.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <span className="text-sm font-medium text-black-true">
                  {c.name}
                </span>
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {c.email}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {c.address}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {c.phone}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {new Date(c.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
