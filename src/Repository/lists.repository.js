import { db } from "../database/dtabase.connection.js";

export async function getInfoUser(userId) {
    return await db.query(`
    SELECT u.id, u.name, url.id, url.url, url."shortUrl", url."visitCount", COALESCE(total."totalVisitCount", 0) AS "totalVisitCount"
    FROM usuarios u
    LEFT JOIN urls url ON u.id = url."userId"
    LEFT JOIN (
    SELECT "userId", SUM("visitCount") AS "totalVisitCount"
    FROM urls
    GROUP BY "userId"
    ) total ON u.id = total."userId"
    WHERE u.id = $1;`, [userId])
}

export async function getRanking() {
    return await db.query(`
    SELECT u.id, u.name, COALESCE(total."visitCount", 0) AS "visitCount", COALESCE(total."linksCount", 0) AS "linksCount"
    FROM usuarios u
    LEFT JOIN (
      SELECT "userId", SUM("visitCount") AS "visitCount", COUNT(url) AS "linksCount"
      FROM urls
      GROUP BY "userId"
    ) total ON u.id = total."userId"
    ORDER BY COALESCE(total."visitCount", 0) DESC
    LIMIT 10;`)
}