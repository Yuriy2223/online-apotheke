import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import OrdersModel, { OrdersDocument } from "@/models/Orders";

interface FilterOptions {
  name?: { $regex: string; $options: string };
  status?: string;
}

interface OrderDocument extends Omit<OrdersDocument, "_id"> {
  _id: {
    toString(): string;
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const sortBy = searchParams.get("sortBy") || "orderDate";
    const filter: FilterOptions = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    let sortOption: { [key: string]: 1 | -1 };
    switch (sortBy) {
      case "name":
        sortOption = { name: 1 };
        break;
      case "price":
        sortOption = { price: 1 };
        break;
      case "status":
        sortOption = { status: 1 };
        break;
      case "orderDate":
      default:
        sortOption = { order_date: -1 };
    }

    const totalCount = await OrdersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const orders = await OrdersModel.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const statuses = await OrdersModel.distinct("status");

    const transformedOrders = orders.map((order: OrderDocument) => ({
      _id: order._id.toString(),
      name: order.name,
      address: order.address,
      products: order.products,
      price: order.price,
      status: order.status,
      order_date: order.order_date,
      photo: order.photo,
    }));

    return NextResponse.json({
      orders: transformedOrders,
      statuses,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
