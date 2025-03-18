import { NextRequest, } from "next/server";

import jwt from "jsonwebtoken";

export const getdatatoken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decode: any =  jwt.verify(token, process.env.SECRETKEY!);
    return decode.id;
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
};
