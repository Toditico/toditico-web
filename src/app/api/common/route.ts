import commonService from "@/services/commonService";
import { getNearestMultipleOf50 } from "@/utils/numbers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await commonService.getData();
    data.stats.customers = getNearestMultipleOf50(data.stats.customers);
    data.stats.products = getNearestMultipleOf50(data.stats.products);
    data.stats.sales = getNearestMultipleOf50(data.stats.sales);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({}, { status: 500 });
  }
}
