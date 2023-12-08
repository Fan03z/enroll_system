import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const registerPass = request.cookies.get("registerPass");

    // match the referer
    if (request.headers.get("referer") == "http://localhost:3000/") {
        const nextResponse = NextResponse.next();
        return nextResponse;
    }

    const homeResponse = NextResponse.redirect(new URL("/", request.url));
    homeResponse.cookies.delete("registerPass");

    return homeResponse;
}

export const config = { matcher: ["/register"] };
