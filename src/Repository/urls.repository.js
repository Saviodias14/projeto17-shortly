import { db } from "../database/dtabase.connection.js";

export async function shortUrl(url, userId, shortUrl) {
    return await db.query(`INSERT INTO urls (url, "shortUrl", "userId")
    VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId])
}

export async function getUrl(id) {
    return await db.query(`SELECT urls.id, urls.url, urls."shortUrl" FROM urls WHERE id=$1`, [id])
}

export async function updateVisitCount(shortUrl) {
    return await db.query(`UPDATE urls SET "visitCount" = "visitCount"+1 
                            WHERE "shortUrl"=$1 RETURNING url`, [shortUrl])
}