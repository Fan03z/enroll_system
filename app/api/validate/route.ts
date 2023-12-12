import { NextResponse } from "next/server";

import client from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const admin = await client.admin.findMany();

        return NextResponse.json(admin);
    } catch (error) {
        return NextResponse.json({ error: `Failed cause of ${error}` }, { status: 500 });
    }
}
