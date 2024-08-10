"use client"

const AppUserKey = `${process.env.APPLICATION_USER_KEY}`
const AppUserTokenKey = `${process.env.APPLICATION_USER_TOKEN_KEY}`

export const verifyIfUserLogged = () => {

    let userToken = localStorage.getItem(AppUserTokenKey)

    if (userToken) {
        return true
    }

    return false

}

export const saveSignIn = (token: string, user: any) => {

    try {
        localStorage.setItem(AppUserKey, token)
        localStorage.setItem(AppUserTokenKey, JSON.stringify(user))
        return true
    } catch (error) {
        return false
    }

}

export const getLoggedUser = () => {

    let user = localStorage.getItem(AppUserKey)

    if (user) {
        return JSON.parse(user)
    }

    return null
}

export const logoutUser = () => {

    localStorage.removeItem(AppUserTokenKey)

    return true
}