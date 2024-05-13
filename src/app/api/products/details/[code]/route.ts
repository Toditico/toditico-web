import productService from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const { searchParams } = new URL(request.url);
    const inventory = searchParams.get("inventory");
    const currency = searchParams.get("currency");
    if (!inventory || !currency) {
      return NextResponse.json({}, { status: 401 });
    }
    const product = await productService.getDetails(code, inventory, currency);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({}, { status: 500 });
  }
}
