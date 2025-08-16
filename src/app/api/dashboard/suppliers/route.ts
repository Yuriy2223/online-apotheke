import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import SuppliersModel, { SuppliersDocument } from "@/models/Suppliers";

interface FilterOptions {
  name?: { $regex: string; $options: string };
  status?: string;
}

interface SupplierDocument extends Omit<SuppliersDocument, "_id"> {
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
      case "company":
        sortOption = { company: 1 };
        break;
      case "status":
        sortOption = { status: 1 };
        break;
      case "date":
      default:
        sortOption = { date: -1 };
    }

    const totalCount = await SuppliersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const suppliers = await SuppliersModel.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const statuses = await SuppliersModel.distinct("status");

    const transformedSuppliers = suppliers.map(
      (supplier: SupplierDocument) => ({
        _id: supplier._id.toString(),
        name: supplier.name,
        address: supplier.address,
        company: supplier.company,
        date: supplier.date,
        amount: supplier.amount,
        status: supplier.status,
      })
    );

    return NextResponse.json({
      suppliers: transformedSuppliers,
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
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const requiredFields = [
      "name",
      "address",
      "company",
      "date",
      "amount",
      "status",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    const newSupplier = new SuppliersModel({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedSupplier = await newSupplier.save();

    return NextResponse.json(
      {
        supplier: savedSupplier,
        message: "Supplier created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating supplier:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "Supplier with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
