import { auth } from "@/lib/middleware/auth"; 
import { admin } from "@/lib/middleware/admin";

export function middleware(req) {
    return auth(req); 
}

export const config = {
    matcher: [],
};
