import { NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import MedicineProduct from "@/models/MedicineProduct";
import SuppliersModel from "@/models/Suppliers";
import CustomersModel from "@/models/Customers";

export async function GET() {
  try {
    await connectDB();

    const [productsCount, suppliersCount, customersCount] = await Promise.all([
      MedicineProduct.countDocuments(),
      SuppliersModel.countDocuments(),
      CustomersModel.countDocuments(),
    ]);

    const statistics = [
      {
        icon: "Package" as const,
        label: "All products",
        value: productsCount,
      },
      {
        icon: "Truck" as const,
        label: "All suppliers",
        value: suppliersCount,
      },
      {
        icon: "Users" as const,
        label: "All customers",
        value: customersCount,
      },
    ];

    return NextResponse.json({
      success: true,
      statistics,
    });
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
