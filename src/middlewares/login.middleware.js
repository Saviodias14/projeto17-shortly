import { db } from "../database/dtabase.connection.js"
import bcrypt from "bcryptjs"
export async function validatePassword(req, res, next) {
    const { email, password } = req.body
    try {
        const dbPassword = await db.query(`SELECT usuarios.password, usuarios.id 
                                           FROM usuarios WHERE email=$1`, [email])
        if (dbPassword.rowCount===0) return res.sendStatus(401)
        const passwordMatch = bcrypt.compareSync(password, dbPassword.rows[0].password)
        if (!passwordMatch) return res.sendStatus(401)
        res.locals.id = dbPassword.rows[0].id
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }

}