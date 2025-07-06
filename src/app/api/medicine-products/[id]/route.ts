import { NextRequest, NextResponse } from "next/server";
import MedicineProduct from "@/models/MedicineProduct";
import MedicineProductReviewModel from "@/models/MedicineProductReview";
import { connectDB } from "@/database/MongoDB";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await MedicineProduct.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviewsStats = await MedicineProductReviewModel.aggregate([
      { $match: { productId: product._id } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const productWithDetails = {
      ...product,
      rating: reviewsStats[0]?.averageRating || 0,
      reviewsCount: reviewsStats[0]?.totalReviews || 0,
      description:
        product.description || generateDefaultDescription(product.name),
    };

    return NextResponse.json({
      product: productWithDetails,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateDefaultDescription(productName: string): string {
  const defaultDescriptions: { [key: string]: string } = {
    Moringa:
      "Although it's typically considered safe, excessive consumption can lead to side effects. Therefore, it's recommended to consult a healthcare professional before using moringa, especially if you're pregnant, nursing, or taking other medications. This balanced approach allows for the benefits of moringa while recognizing the importance of proper usage and caution.",
    default:
      "This medicine product is designed to support your health and wellness. Please consult with a healthcare professional before use, especially if you're pregnant, nursing, or taking other medications. Follow the recommended dosage and usage instructions for optimal results.",
  };

  return defaultDescriptions[productName] || defaultDescriptions["default"];
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const updatedProduct = await MedicineProduct.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    console.error("Error updating product:", error);
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

    const deletedProduct = await MedicineProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await MedicineProductReviewModel.deleteMany({ productId: id });

    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
