import { db } from "../database/dtabase.connection.js";
import * as urlServer from '../server/urls.server.js'

export async function shortUrl(req, res) {
    const { url } = req.body
    const userId = res.locals.userId
    try {
        const result = await urlServer.shortUrl(url, userId)
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getUrl(req, res) {
    const id = parseInt(req.params.id)
    try {
        if(isNaN(id)) res.status(400).send('This id is not valid')
        const result = await urlServer.getUrl(id)
        res.status(200).send(result.rows[0])
    } catch (error) {
        if(error.message==='Url not found') return res.sendStatus(404)
        res.status(500).send(error.message)
    }
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params
    try {
        const result = await urlServer.updateVisitCount(shortUrl)
        //res.send(result)
        res.redirect(result)
    } catch (err) {
        if(err.message==='Url not found') return res.sendStatus(404)
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params
    const userId = res.locals.userId
    try {
        const result = await db.query(`SELECT urls."userId" FROM urls WHERE id=$1`, [id])
        if(result.rowCount===0) return res.sendStatus(404)
        if(result.rows[0].userId!==userId) return res.sendStatus(401)
        await db.query(`DELETE FROM urls WHERE id=$1`, [id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}