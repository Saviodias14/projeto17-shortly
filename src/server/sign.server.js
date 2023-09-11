import * as signRepository from '../Repository/sign.repository.js'
import * as bcrypt from 'bcrypt'
import { v4 } from "uuid";

export async function signIn(name, email, password) {
    const existEmail = await signRepository.verifyEmail(email)
    if (existEmail.rowCount !== 0) throw new Error('This email already exist')
    const cryptoPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return await signRepository.postUser(name, email, cryptoPassword)
}

export async function getToken(id) {
    const token = v4()
    await signRepository.createToken(id, token)
    return token
}