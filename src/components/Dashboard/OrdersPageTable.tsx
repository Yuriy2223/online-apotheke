import { Order } from "@/types/orders";

export function OrdersPageTable({
  orders,
  singleOrder,
  highlightId,
}: {
  orders?: Order[];
  singleOrder?: Order;
  highlightId?: string;
}) {
  const data = singleOrder ? [singleOrder] : orders || [];

  const statusClasses: Record<string, string> = {
    delivered: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    confirmed: "bg-teal-100 text-teal-700",
    cancelled: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700",
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getStatusClass = (status: string) => {
    return statusClasses[status.toLowerCase()] || statusClasses.default;
  };

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-green-light text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-[1300px] desktop:w-full border-collapse">
        <thead>
          <tr className="bg-gray-light divide-x divide-gray-300">
            <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
              User Info
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
              Address
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
              Products
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
              Order Date
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
          {data.map((order) => (
            <tr
              key={order._id}
              className={`divide-x divide-gray-300 hover:bg-gray-50 ${
                highlightId === order._id ? "bg-yellow-100" : ""
              }`}
            >
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  {order.photo ? (
                    <img
                      src={order.photo}
                      alt={order.name}
                      className="w-10 h-10 rounded-full object-cover"
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
                    className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center text-xs font-medium text-white-true"
                    style={{ display: order.photo ? "none" : "flex" }}
                  >
                    {order.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-black-true">
                      {order.name}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-3">
                <span className="text-sm text-black-true line-clamp-2">
                  {order.address}
                </span>
              </td>

              <td className="px-6 py-3">
                <span className="text-sm text-black-true line-clamp-2">
                  {order.products}
                </span>
              </td>

              <td className="px-6 py-3">
                <span className="text-sm font-medium text-black-true">
                  {formatDate(order.order_date)}
                </span>
              </td>

              <td className="px-6 py-3">
                <span className="text-sm font-medium text-black-true">
                  ${formatPrice(order.price)}
                </span>
              </td>

              <td className="px-6 py-3">
                <span
                  className={`flex items-center justify-center rounded-full text-sm font-medium w-24 h-8 ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
