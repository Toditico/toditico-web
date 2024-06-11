import productService from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await productService.getAutocomplete(
      searchParams.get("text") ?? "",
      searchParams.get("inventory") ?? "",
      searchParams.get("currency") ?? ""
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({}, { status: 500 });
  }
}
