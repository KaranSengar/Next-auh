import { Database } from "@/dbconfig/dbconnfig";
import { NextRequest, NextResponse } from "next/server";

Database();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      msg: "logout succefully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response

  } catch (err: unknown) {
    return NextResponse.json({
      err: err,
      status: 500,
      msg: "error the post method",
    });
  }
}
