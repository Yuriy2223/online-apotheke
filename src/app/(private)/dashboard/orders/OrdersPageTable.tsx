import { Order, orders, statusClasses } from "./123";

export function OrdersPageTable({
  singleOrder,
  highlightId,
}: {
  singleOrder?: Order;
  highlightId?: string;
}) {
  const data = singleOrder ? [singleOrder] : orders;

  return (
    <table className="w-[1300px] desktop:w-full border-collapse">
      <thead>
        <tr className="bg-gray-light divide-x divide-gray-300">
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Name
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Address
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Products
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Order date
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Price
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Status
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
              {c.photo ? (
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
              ) : null}

              <div
                className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark"
                style={{ display: c.photo ? "none" : "flex" }}
              >
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <span className="text-sm font-medium text-black-true">
                {c.name}
              </span>
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {c.address}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {c.products}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {new Date(c.order_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>

            <td className="px-6 py-3 text-sm font-medium text-black-true">
              {Number(c.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>

            <td className="px-6 py-3 text-sm font-medium">
              <span
                className={`flex items-center justify-center rounded-full text-sm font-medium w-24 h-9 ${
                  statusClasses[c.status] || statusClasses.Default
                }`}
              >
                {c.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
