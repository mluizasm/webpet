// const { createHmac } = require('node:crypto');
import { createHmac } from "node:crypto"

const toCrypt = (value: string) => {

    const secret = `${process.env.CRYPT_SECRET?.toString()}`;
    const hash = createHmac('sha256', secret)
        .update(value)
        .digest('hex');

    return hash
}

const compareWithHash = (text: string, hash: string) => {
    const secret = 'abcdefg';
    const textHash = createHmac('sha256', secret)
        .update(text)
        .digest('hex');
    console.log("textHash: ", textHash)
    console.log("hash: ", hash)
    return textHash == hash
}

const fromCrypt = () => {

    let text = ""


    return text
}

export {
    compareWithHash,
    toCrypt
}