// import { UserBaseModel } from "@/api/UserModel";
// import { ModelWithAdditionalInfo } from "@/api/ModelWithAdditionalInfo";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


const jwtToken = process.env.JSON_WEB_TOKEN_SECRET

if (!jwtToken) {
  throw new Error("JSON_WEB_TOKEN_SECRET not found in env")
}

export type jwtUserPayloadType = {
  id: string;
  isRecruiter: boolean;
  email: string;
  fName: string;
  lName: string;
};


export const setAuthTokenAsCookie = (
    res: NextResponse,
    user: User,
    ) => {
  // create auth token
  const jwtPayload: jwtUserPayloadType = {
    id: user.id,
    email: user.email,
    isRecruiter: user.isRecruiter,
    fName: user.firstName,
    lName: user.lastName,

  };
  const token = jwt.sign(jwtPayload, jwtToken);
  res.cookies.set("cocoAPI", token, {
    secure: process.env.USE_SECURE_COOKIE === "1" ? true : false,
    sameSite: "lax",
    httpOnly: true,
    maxAge: 7 * 24 * 3600000, // 7 days
  });
  return res;
};


export const getJwtPayloadFromCookie = (cookie: string | undefined) => {
  try {
    const payload = jwt.verify(cookie as string, jwtToken) as jwtUserPayloadType
    return payload
  } catch (err) {
    return null
  }
}
