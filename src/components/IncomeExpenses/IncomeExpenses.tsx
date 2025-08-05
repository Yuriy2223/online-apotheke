export function IncomeExpenses() {
  const transactions = [
    {
      id: "1",
      type: "expense",
      description: "Qonto billing",
      amount: -49.88,
    },
    {
      id: "2",
      type: "income",
      description: "Cruip.com Market Ltd 70 Wilson St London",
      amount: 249.88,
    },
    {
      id: "3",
      type: "income",
      description: "Notion Labs Inc",
      amount: 99.99,
    },
    {
      id: "4",
      type: "income",
      description: "Market Cap Ltd",
      amount: 1200.88,
    },
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
      amount: -49.88,
    },
  ];

  return (
    <div className="bg-white-true rounded-lg border border-gray-light">
      <div className="p-4 border-b border-gray-light bg-green-soft">
        <h2 className="font-semibold text-black-true">Income/Expenses</h2>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-dark mb-4">Today</div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-3">
              <div
                className={`
                px-2 py-1 rounded text-xs font-medium capitalize flex-shrink-0
                ${
                  transaction.type === "income"
                    ? "bg-green-soft text-green-dark"
                    : transaction.type === "expense"
                    ? "bg-red-light text-red-dark"
                    : "bg-gray-light text-gray-dark"
                }
              `}
              >
                {transaction.type}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm text-black-true truncate">
                  {transaction.description}
                </div>
              </div>

              <div
                className={`text-sm font-medium ${
                  transaction.type === "income"
                    ? "text-green-dark"
                    : transaction.type === "expense"
                    ? "text-red-dark"
                    : "text-black-true"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
