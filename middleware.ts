import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const registerPass = request.cookies.get("registerPass");

    if (registerPass && registerPass.value == "1") {
        request.cookies.delete("registerPass");

        const nextResponse = NextResponse.next();
        nextResponse.cookies.delete("registerPass");

        return nextResponse;
    }

    const homeResponse = NextResponse.redirect(new URL("/", request.url));
    homeResponse.cookies.delete("registerPass");

    return homeResponse;
}
7;

export const config = { matcher: ["/register"] };
