export interface Transaction {
  _id: string;
  type: "income" | "expense";
  name: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}
