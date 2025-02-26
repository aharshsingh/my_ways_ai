import { NextResponse } from "next/server";
import { auth } from "@/lib/middleware/auth"; 

export function middleware(req) {
    return auth(req); 
}

export const config = {
    matcher: [
        "/api/test",
        "/api/user"
    ],
};
