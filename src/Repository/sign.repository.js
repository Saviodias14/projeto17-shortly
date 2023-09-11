import { db } from "../database/dtabase.connection.js";

export async function verifyEmail(email) {
    return await db.query(`SELECT * FROM usuarios WHERE email=$1;`, [email])
}

export async function postUser(name, email, password) {

    return await db.query(`INSERT INTO usuarios (name, email, password)
    VALUES ($1, $2, $3);`, [name, email, password])
}

export async function createToken(id, token) {
    return await db.query(`INSERT INTO tokens ("userId", token)
        VALUES ($1,$2)`, [id, token])
}