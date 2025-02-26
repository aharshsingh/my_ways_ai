import { verifyToken } from "@/utlis/jwt";
import { NextResponse } from "next/server";

export function auth(req){
    try {
        console.log("Middleware executed")
        const authHeader = req.headers.get("authorization");
        if(!authHeader){
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        const accessToken = authHeader.split(" ")[1];
        if(!accessToken){
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        try {
            const payload = verifyToken(accessToken);
            console.log(payload)
            req.user = payload;
            console.log(req.user)
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json({ error: "Forbidden: Invalid or expired token" }, { status: 403 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

