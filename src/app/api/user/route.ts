import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/services/db";
import { toCrypt } from "@/utils/functions";
const { v4: uuidv4 } = require('uuid');


const createUser = async (data: any) => {

    let newUser = {
        uuid: uuidv4(),
        ...data,
    }

    newUser.password = toCrypt(newUser.password)

    try {
        const result = await executeQuery({
            query: 'INSERT INTO users (uuid, name, email, password, birth) VALUES(?, ?, ?, ?, ?)',
            values: [newUser.uuid, newUser.name, newUser.email, newUser.password, newUser.birth],
        });

        console.log("execucao da query: ", result)
    } catch (error: any) {
        console.log(error);

        return false
    }

    return true

}

const getListUsers = async () => {
    try {

        const result = await executeQuery({
            query: 'select id, uuid, name, email, birth from users',
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
    const result = await getListUsers();
    return NextResponse.json({ success: true, data: result }, { status: 200 })

}


export const POST = async (req: any) => {
    const data = await req.json();

    const result = await createUser(data)

    if (result) {
        return NextResponse.json({ success: true, message: "Usuário criado com sucesso!" }, { status: 201 })
    } else {
        return NextResponse.json({ success: false, message: "Não foi possível criar o usuário." }, { status: 400 })

    }

}

export const UPDATE = async (req: NextRequest) => {
    console.log("chegou no handler:", req)
    let users = [
        {
            id: 1,
            name: "Rafael Guimaraes",
            username: "rafaGostoso",
            birth: "03/07/1999",
            email: "contato@rafaelgcs.com.br"
        }
    ]
    return NextResponse.json({ success: true, data: users }, { status: 200 })

}

export const DELETE = async (req: NextRequest) => {
    console.log("chegou no handler:", req)
    let users = [
        {
            id: 1,
            name: "Rafael Guimaraes",
            username: "rafaGostoso",
            birth: "03/07/1999",
            email: "contato@rafaelgcs.com.br"
        }
    ]
    return NextResponse.json({ success: true, data: users }, { status: 200 })

}