import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import CustomersModel, { CustomersDocument } from "@/models/Customers";

interface FilterOptions {
  name?: { $regex: string; $options: string };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const filter: FilterOptions = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    let sortOption: { [key: string]: 1 | -1 };
    switch (sortBy) {
      case "name":
        sortOption = { name: 1 };
        break;
      case "email":
        sortOption = { email: 1 };
        break;
      case "phone":
        sortOption = { phone: 1 };
        break;
      case "address":
        sortOption = { address: 1 };
        break;
      case "spent":
        sortOption = { spent: -1 };
        break;
      case "date":
      default:
        sortOption = { date: -1 };
    }

    const totalCount = await CustomersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const customers = await CustomersModel.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const transformedCustomers = customers.map(
      (customer: CustomersDocument) => ({
        _id: customer._id.toString(),
        photo: customer.photo,
        name: customer.name,
        email: customer.email,
        spent: customer.spent,
        phone: customer.phone,
        address: customer.address,
        date: customer.date,
      })
    );

    return NextResponse.json({
      customers: transformedCustomers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
