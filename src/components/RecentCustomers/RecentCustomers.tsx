export function RecentCustomers() {
  const customers = [
    {
      id: "1",
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      spent: 2890.66,
    },
    {
      id: "2",
      name: "Philip Harbach",
      email: "philip.h@gmail.com",
      spent: 2767.04,
    },
    {
      id: "3",
      name: "Mirko Fisuk",
      email: "mirkofisuk@gmail.com",
      spent: 2996.0,
    },
    {
      id: "4",
      name: "Olga Semklo",
      email: "olga.s@cool.design",
      spent: 1220.66,
    },
    {
      id: "5",
      name: "Burak Long",
      email: "longburak@gmail.com",
      spent: 1890.66,
    },
  ];

  return (
    <div className="bg-white-true rounded-lg border border-gray-light">
      <div className="p-4 border-b border-gray-light bg-green-soft">
        <h2 className="font-semibold text-black-true">Recent Customers</h2>
      </div>

      <div className="p-4">
        <div className="hidden tablet:block">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-dark mb-4">
            <div>Name</div>
            <div>Email</div>
            <div className="text-right">Spent</div>
          </div>

          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-3 gap-4 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-light rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-dark">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="text-sm text-black-true">
                    {customer.name}
                  </span>
                </div>
                <div className="text-sm text-gray-dark">{customer.email}</div>
                <div className="text-sm text-black-true text-right">
                  {customer.spent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tablet:hidden space-y-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center gap-3 p-3 border border-gray-light rounded-lg"
            >
              <div className="w-10 h-10 bg-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-gray-dark">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-black-true truncate">
                  {customer.name}
                </div>
                <div className="text-xs text-gray-dark truncate">
                  {customer.email}
                </div>
              </div>
              <div className="text-sm font-medium text-black-true">
                {customer.spent.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
