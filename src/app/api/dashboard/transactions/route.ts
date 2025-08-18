import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import TransactionModel from "@/models/Transactions";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "7");
    const type = searchParams.get("type");

    const filter: { type?: string } = {};
    if (type && (type === "income" || type === "expense")) {
      filter.type = type;
    }

    const transactions = await TransactionModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const transformedTransactions = transactions.map((transaction) => ({
      _id: transaction._id.toString(),
      type: transaction.type,
      name: transaction.name,
      amount: transaction.amount,
      createdAt: transaction.createdAt
        ? new Date(transaction.createdAt).toISOString()
        : null,
      updatedAt: transaction.updatedAt
        ? new Date(transaction.updatedAt).toISOString()
        : null,
    }));

    return NextResponse.json({
      transactions: transformedTransactions,
      total: transformedTransactions.length,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
