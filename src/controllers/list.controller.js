import * as listsServer from '../servicelists.service.js'

export async function getInfoUser(req, res) {
    const userId = res.locals.userId
    try {
        const result = await listsServer.getInfoUser(userId)
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRanking(req, res) {
    try {
        const result = await listsServer.getRanking()
        res.status(200).send(result.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}
