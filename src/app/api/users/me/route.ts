import { Database } from "@/dbconfig/dbconnfig";
import UserModel from "@/models/usermodel";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getdatatoken } from "@/helpers/getdatatoken";

Database();

export async function POST(request: NextRequest) {
  //extract data from token
  const userId = await getdatatoken(request);
  const user = await UserModel.findOne({ _id: userId }).select("-password");
  return NextResponse.json({
    message: "USer not Found",
    data: user,
  });
}
