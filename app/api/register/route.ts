import { NextResponse } from "next/server";

import client from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, sex, college, level, profession, introduction } = body;

        const register = await client.register.create({
            data: {
                name,
                sex,
                college,
                level,
                profession,
                introduction,
            },
        });

        return NextResponse.json(register);
    } catch (error) {
        return NextResponse.json({ error: `Failed cause of ${error}` }, { status: 500 });
    }
}
