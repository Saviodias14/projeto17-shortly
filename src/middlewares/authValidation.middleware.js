import { db } from "../database/dtabase.connection.js"

export async function authValidation (req,res, next) {

    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Acesso Inválido")
    
    try{
        const acesso = await db.query(`SELECT * FROM tokens WHERE token=$1`, [token])
        if(acesso.rowCount===0) return res.status(401).send("Acesso Inválido")

        res.locals.userId = acesso.rows[0].userId
        res.locals.token = token

        next()

    } catch(err)
    {
        res.status(500).send(err.message)
    }
}