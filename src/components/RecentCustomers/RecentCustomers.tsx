interface Customer {
  id: number;
  name: string;
  email: string;
  spent: number;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Alex Shatov",
    email: "alexshatov@gmail.com",
    spent: 2890.66,
  },
  {
    id: 2,
    name: "Philip Harbach",
    email: "philip.h@gmail.com",
    spent: 2767.04,
  },
  {
    id: 3,
    name: "Mirko Fisuk",
    email: "mirkofisuk@gmail.com",
    spent: 2996.0,
  },
  {
    id: 4,
    name: "Olga Semklo",
    email: "olga.s@cool.design",
    spent: 1220.66,
  },
  {
    id: 5,
    name: "Burak Long",
    email: "longburak@gmail.com",
    spent: 1890.66,
  },
  {
    id: 6,
    name: "Burakus Longna",
    email: "longrak@gmail.com",
    spent: 4890.66,
  },
];

export function RecentCustomers() {
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
            {customers.map((c) => (
              <tr key={c.id} className="divide-x divide-gray-300">
                <td className="px-6 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark">
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
                  {c.email}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-black-true">
                  {c.spent.toLocaleString(undefined, {
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
