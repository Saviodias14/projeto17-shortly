import * as listsRepository from '../Repository/lists.repository.js'

export async function getInfoUser(userId) {
    const result = await listsRepository.getInfoUser(userId)
    const { name, totalVisitCount } = result.rows[0]
    const userInfo = { id: userId, name: name, visitCount: totalVisitCount, shortenedUrls: [] }
    console.log(result.rows)
    result.rows.map((e) => userInfo.shortenedUrls.push({ id: e.id, shortUrl: e.shortUrl, url: e.url, visitCount: e.visitCount }))
    return userInfo
}

export async function getRanking() {
    return await listsRepository.getRanking()
}