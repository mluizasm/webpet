import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    console.log("chegou no handler:", req)
    let dogs = [
        {
            id: 1,
            user_id: 1,
            name: "Dog Teste",
            birth: "09/08/2023",
        }
    ]
    return NextResponse.json({ success: true, data: dogs }, { status: 200 })

}
