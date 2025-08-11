import { customers } from "./123";
import { Customer } from "@/types/customers";

export function CustomersPageTable({
  singleCustomer,
  highlightId,
}: {
  singleCustomer?: Customer;
  highlightId?: string;
}) {
  const data = singleCustomer ? [singleCustomer] : customers;

  return (
    <table className="w-[1300px] desktop:w-full border-collapse">
      <thead>
        <tr className="bg-gray-light divide-x divide-gray-300">
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
      <tbody className="divide-y divide-gray-300">
        {data.map((c) => (
          <tr
            key={c._id}
            className={`divide-x divide-gray-300 ${
              highlightId === c._id ? "bg-yellow-100" : ""
            }`}
          >
            <td className="px-6 py-3 flex items-center gap-3">
              {c.photo && (
                <img
                  src={c.photo}
                  alt={c.name}
                  className="w-9 h-9 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const initialsElement = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (initialsElement) initialsElement.style.display = "flex";
                  }}
                />
              )}
              {!c.photo && (
                <div className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
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
              {new Date(c.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
