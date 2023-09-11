import { nanoid } from "nanoid"
import * as urlRepository from "../Repository/urls.repository.js"

export async function shortUrl(url, userId) {
    const shortUrl = nanoid(8)
    const result = await urlRepository.shortUrl(url, userId, shortUrl)
    const { id } = result.rows[0]
    return { id, shortUrl }
}

export async function getUrl(id){
    const result = await urlRepository.getUrl(id)
    if(!result.rowCount) throw new Error('Url not found')
    return result
}

export async function updateVisitCount(shortUrl){
    const update = await urlRepository.updateVisitCount(shortUrl)
    if (update.rowCount === 0) throw new Error('Url not found')
    return update.rows[0].url
}

export async function deleteUrl(id, userId){
    const result = await urlRepository.getUrl(id)
    if(result.rowCount===0) throw new Error('Url not found')
    if(result.rows[0].userId!==userId) throw new Error('Unauthorized')
    await urlRepository.deleteUrl(id)
}