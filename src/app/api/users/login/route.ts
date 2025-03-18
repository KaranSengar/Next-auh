import { Database } from "@/dbconfig/dbconnfig";
import UserModel from "@/models/usermodel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

Database();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();

    const { email, password } = reqbody;
    //validation
    console.log(email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        msg: "user not found  database",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({
        status: 401,
        msg: "incrediation passsword",
      });
    }

    const token = await jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRETKEY!,
      { expiresIn: "24h" }
    );

    const reponse = NextResponse.json({
        success:true,
      msg: "login successfully",
      status: 200,
      user,
      token,
    });
    reponse.cookies.set("token", token, {
      httpOnly: true,
    });

    return reponse;
  } catch (err: unknown) {
    return NextResponse.json({
      err: err,
      status: 500,
      msg: "error the post method",
    });
  }
}
