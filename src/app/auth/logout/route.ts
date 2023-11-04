import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const res = NextResponse.redirect(new URL('/', request.url))
        res.cookies.set("cocoAPI", 'token', {
            secure: process.env.USE_SECURE_COOKIE === "1" ? true : false,
            sameSite: "lax",
            httpOnly: true,
            maxAge: -1,
        });
        return res;
    } catch (err: any) {
        console.error(err);
        return NextResponse.redirect(err.message);
    }
}