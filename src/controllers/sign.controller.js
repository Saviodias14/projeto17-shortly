import { v4 } from "uuid";
import { db } from "../database/dtabase.connection.js";
import bcrypt from "bcryptjs"

export async function signup(req, res) {
    const { name, email, password } = req.body
    try {
        const existEmail = await db.query(`SELECT * FROM usuarios WHERE email=$1;`, [email])
        if (existEmail.rowCount !== 0) return res.sendStatus(409)
        const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        await db.query(`INSERT INTO usuarios (name, email, password)
        VALUES ($1, $2, $3);`, [name, email, cryptoPassword])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signin(req, res) {
    try {
        const token = v4()
        const id = res.locals.id
        await db.query(`INSERT INTO tokens ("userId", token)
        VALUES ($1,$2)`,[id, token])
        res.status(200).send({token})
    } catch (err) {
        res.status(500).send(err.message)
    }
}