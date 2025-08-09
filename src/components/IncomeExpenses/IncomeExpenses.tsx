interface Transaction {
  id: string;
  type: "income" | "expense" | "error";
  description: string;
  amount: number;
}

export function IncomeExpenses() {
  const transactions: Transaction[] = [
    { id: "1", type: "expense", description: "Qonto billing", amount: -49.88 },
    {
      id: "2",
      type: "income",
      description: "Cruip.com Market Ltd 70 Wilson St London",
      amount: 249.88,
    },
    { id: "3", type: "income", description: "Notion Labs Inc", amount: 99.99 },
    { id: "4", type: "income", description: "Market Cap Ltd", amount: 1200.88 },
    {
      id: "5",
      type: "error",
      description: "App.com Market Ltd 70 Wilson St London",
      amount: 99.99,
    },
    {
      id: "6",
      type: "expense",
      description: "App.com Market Ltd 70 Wilson St London",
      amount: -490.5,
    },
  ];

  const badgeClasses: Record<Transaction["type"], string> = {
    income: "bg-green-soft text-green-light ",
    expense: "bg-red-dark text-white-true",
    error: "bg-red-light text-red-dark",
  };

  const amountClasses: Record<Transaction["type"], string> = {
    income: "text-green-light",
    expense: "text-red-dark",
    error: "text-gray-dark line-through",
  };

  return (
    <div className="bg-white-true rounded-lg shadow border border-gray-300 p-2">
      <header className="bg-green-soft px-4 py-3 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-black-true">
          Income/Expenses
        </h2>
      </header>

      <div className="overflow-x-auto">
        <div className="bg-gray-light px-6 py-3">
          <h3 className="text-base text-gray-dark">Today</h3>
        </div>

        <ul className="divide-y divide-gray-300 w-[684px] desktop:w-full">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
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
                <span className="text-sm text-black-true truncate">
                  {transaction.description}
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
                  amountClasses[transaction.type]
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString(undefined, {
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
