import { db } from "../database/dtabase.connection.js";
import { nanoid } from "nanoid";

export async function shortUrl(req, res) {
    const { url } = req.body
    try {
        const shortUrl = nanoid(8)
        const userId = res.locals.userId
        const result = await db.query(`INSERT INTO urls (url, "shortUrl", "userId")
                                       VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId])
        const id = result.rows[0].id
        res.status(201).send({ id, shortUrl })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export function getUrl(req, res) {
    const { id } = req.params
    db.query(`SELECT urls.id, urls.url, urls."shortUrl" FROM urls WHERE id=$1`, [id])
        .then((result) => {
            if (result.rowCount === 0) return res.sendStatus(404)
            res.status(200).send(result.rows[0])
        })
        .catch((err) => res.status(500).send(err.message))
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params
    try {
        const update = await db.query(`UPDATE urls SET "visitCount" = "visitCount"+1 
                                       WHERE "shortUrl"=$1 RETURNING url`, [shortUrl])
        if (update.rowCount === 0) return res.sendStatus(404)
        res.redirect(update.rows[0].url)
    } catch (err) {
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