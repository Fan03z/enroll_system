import { NextResponse } from "next/server";

import client from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const register = await request.json();

        const updateRejectStauts = await client.register.update({
            where: {
                id: register.id,
            },
            data: {
                status: "reject",
            },
        });

        return NextResponse.json(updateRejectStauts);
    } catch (error) {
        return NextResponse.json({ error: `Failed cause of ${error}` }, { status: 500 });
    }
}
