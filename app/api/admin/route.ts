import { NextResponse } from "next/server";

import client from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const register = await client.register.findMany();

        return NextResponse.json(register);
    } catch (error) {
        return NextResponse.json({ error: `Failed cause of ${error}` }, { status: 500 });
    }
}
