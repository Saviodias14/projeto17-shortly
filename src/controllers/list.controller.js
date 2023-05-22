import { db } from "../database/dtabase.connection.js";

export async function getInfoUser(req, res) {
    const userId = res.locals.userId
    try {
        const result = await db.query(`
        SELECT u.id, u.name, url.id, url.url, url."shortUrl", url."visitCount", COALESCE(total."totalVisitCount", 0) AS "totalVisitCount"
        FROM usuarios u
        LEFT JOIN urls url ON u.id = url."userId"
        LEFT JOIN (
        SELECT "userId", SUM("visitCount") AS "totalVisitCount"
        FROM urls
        GROUP BY "userId"
        ) total ON u.id = total."userId"
        WHERE u.id = $1;`, [userId])
        const { name, totalVisitCount } = result.rows[0]
        const userInfo = { id: userId, name:name, visitCount: totalVisitCount, shortenedUrls: [] }
        console.log(result.rows)
        result.rows.map((e) => userInfo.shortenedUrls.push({ id: e.id, shortUrl: e.shortUrl, url: e.url, visitCount: e.visitCount }))
        res.status(200).send(userInfo)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRanking(req, res) {
    try {
        const result = await db.query(`
        SELECT u.id, u.name, COALESCE(total."visitCount", 0) AS "visitCount", COALESCE(total."linksCount", 0) AS "linksCount"
        FROM usuarios u
        LEFT JOIN (
          SELECT "userId", SUM("visitCount") AS "visitCount", COUNT(url) AS "linksCount"
          FROM urls
          GROUP BY "userId"
        ) total ON u.id = total."userId"
        ORDER BY COALESCE(total."visitCount", 0) DESC
        LIMIT 10;`)
        res.status(200).send(result.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}
