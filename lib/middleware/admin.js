import { NextResponse } from "next/server";

export async function admin(req){
    try {
        const role = req.headers.get("role");
        if(role === "admin"){
            return NextResponse.next();
        } else{
            return NextResponse.json({error: "Unauthorized, admins only!"}, {status: 403})
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}