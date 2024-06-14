import productService from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await productService.filterProducts(
      searchParams.get("text") ?? "",
      searchParams.get("inventory") ?? "",
      searchParams.get("currency") ?? "",
      Number(searchParams.get("page")) ?? NaN,
      Number(searchParams.get("limit")) ?? NaN,
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({}, { status: 500 });
  }
}

