import { Database } from "@/dbconfig/dbconnfig";
import UserModel from "@/models/usermodel";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
Database();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(username,email,password)
    // validation
    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User is already  exists" },
        { status: 400 }
      );
    }
    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Save new user
    const newuser = new UserModel({
      username,
      email:email,
      password: hashpassword,
    });
    const saved = await newuser.save();
    console.log("jhdiggihasdgia",saved);


    /// send verification email
   await sendEmail({ email, emailType: "VERIFY", userId: saved._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      saved,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      err:err,
      status: 500,
      msg: "error the post method",
    });
  }
}
