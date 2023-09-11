
import * as signServer from "../server/sign.server.js"

export async function signup(req, res) {
    const { name, email, password } = req.body
    try {
        await signServer.signIn(name, email, password)
        console.log('aqui')
        res.sendStatus(201)
    } catch (err) {
        if (err.message === 'This email already exist') return res.status(409).send(err.message)
        res.status(500).send(err.message)
    }
}

export async function signin(req, res) {
    const id = res.locals.id
    try {
        const token = await signServer.getToken(id)
        res.status(200).send({ token })
    } catch (err) {

        res.status(500).send(err.message)
    }
}