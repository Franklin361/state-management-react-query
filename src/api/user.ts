import { User } from '../interface';

const URL_BASE = 'https://jsonplaceholder.typicode.com/users'
const headers = { 'Content-type': 'application/json' }

export const getUsers = async (): Promise<User[]> => {
    return await (await fetch(URL_BASE)).json()
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const body = JSON.stringify(user)
    const method = 'POST'
    return await (await fetch(URL_BASE, { body, method, headers })).json()
}

export const editUser = async (user: User): Promise<User> => {
    const body = JSON.stringify(user)
    const method = 'PUT'
    return await (await fetch(`${URL_BASE}/${user.id}`, { body, method, headers })).json()
}

export const deleteUser = async (id: number): Promise<number> => {
    const method = 'DELETE'
    await fetch(`${URL_BASE}/${id}`, { method })
    return id
}

