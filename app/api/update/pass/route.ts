import { NextResponse } from "next/server";

import client from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const register = await request.json();

        const updatePassStauts = await client.register.update({
            where: {
                id: register.id,
            },
            data: {
                status: "pass",
            },
        });

        return NextResponse.json(updatePassStauts);
    } catch (error) {
        return NextResponse.json({ error: `Failed cause of ${error}` }, { status: 500 });
    }
}
