import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log("queryParams: ", searchParams);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({}, { status: 500 });
  }
}
