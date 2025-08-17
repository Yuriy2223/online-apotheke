import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import SuppliersModel from "@/models/Suppliers";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { error: "Invalid supplier ID" },
        { status: 400 }
      );
    }

    const updatedSupplier = await SuppliersModel.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedSupplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      supplier: updatedSupplier,
      message: "Supplier updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { error: "Invalid supplier ID" },
        { status: 400 }
      );
    }

    const deletedSupplier = await SuppliersModel.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Supplier deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
