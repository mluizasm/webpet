import executeQuery from "@/services/db";
import { toCrypt } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

const createRegister = async (data: any) => {

    let newRegister = {
        ...data,
    }

    try {
        const result = await executeQuery({
            query: 'INSERT INTO dog_registers (user_id, name, text, image, created) VALUES(?, ?, ?, ?, ?)',
            values: [newRegister.user_id, newRegister.name, newRegister.text, newRegister.image, newRegister.created],
        });

        console.log("execucao da query: ", result)
    } catch (error: any) {
        console.log(error);

        return false
    }

    return true

}

const getListRegisters = async () => {
    try {

        const result = await executeQuery({
            query: 'select * from dog_registers',
        });
        console.log(result)
        return (result)
    } catch (error: any) {
        console.log(error);
        return ([])
        // return false
    }
}
const getListRegistersOfUser = async (user_id: any) => {
    try {

        const result = await executeQuery({
            query: 'select * from dog_registers where user_id = ? order by id desc',
            values: [user_id]
        });
        console.log(result)
        return (result)
    } catch (error: any) {
        console.log(error);
        return ([])
        // return false
    }
}

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("id")

    if (user_id) {
        const result = await getListRegistersOfUser(user_id);
        return NextResponse.json({ success: true, data: result }, { status: 200 })

    } else {
        const result = await getListRegisters();
        return NextResponse.json({ success: true, data: result }, { status: 200 })

    }

}


export const POST = async (req: any) => {
    const data = await req.json();

    const result = await createRegister(data)

    if (result) {
        return NextResponse.json({ success: true, message: "Registro criado com sucesso!" }, { status: 201 })
    } else {
        return NextResponse.json({ success: false, message: "Não foi possível criar o registro." }, { status: 400 })

    }

}
