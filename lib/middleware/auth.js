import { verifyToken } from "@/utlis/jwt";
import { NextResponse } from "next/server";

export async function auth(req){
    try {
        const authHeader = req.headers.get("authorization");
        if(!authHeader){
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        const accessToken = authHeader.split(" ")[1];
        if(!accessToken){
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        try {
            const payload = await verifyToken(accessToken);
            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("userId", payload.userId);
            requestHeaders.set("role", payload.role);
            return NextResponse.next({
                headers: requestHeaders,
            });
        } catch (error) {
            return NextResponse.json({ error: "Forbidden: Invalid or expired token" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

