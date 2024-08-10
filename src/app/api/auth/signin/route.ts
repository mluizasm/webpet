import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/services/db";
import { toCrypt, compareWithHash } from "@/utils/functions";

const searchUserByEmail = async (email: string) => {

    const result: any = await executeQuery({
        query: "select * from users where email = ?",
        values: [email]
    })

    console.log(result)

    return result.length >= 1 ? result[0] : null
}

const executeLogin = async ({ email, password }: any) => {

    const user = await searchUserByEmail(email)

    if (user) {
        let hash = toCrypt(password)

        if (hash == user.password) {
            delete user.password
            return {
                user,
                token: btoa(user.uuid)
            }
        }
    }

    return null

}

export const POST = async (req: any) => {
    const data = await req.json();

    const result = await executeLogin({ email: data.email, password: data.password })

    if (result) {
        return NextResponse.json({ success: true, data: result, message: "Usuário criado com sucesso!" }, { status: 201 })
    } else {
        return NextResponse.json({ success: false, message: "Não foi possível criar o usuário." }, { status: 400 })

    }

}
