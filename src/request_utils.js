import axios from "axios"

// export const BASE_PATH = "http://ec2-34-226-153-183.compute-1.amazonaws.com/weather"
export const BASE_PATH = "https://weather-django-valeria.herokuapp.com/weather"

export const SUBSCRIPTIONS_URL = `${BASE_PATH}/subscriptions`

export const SUBSCRIPTIONS_IMPORT_URL = `${SUBSCRIPTIONS_URL}/import`

export const CURRENT_USER = `${BASE_PATH}/users/current`

export const TOKEN = `${BASE_PATH}/token/`

export function getHeader() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        // go to login
        window.location.href = `${BASE_PATH}/login`
    }
    return {headers: {Authorization: 'Token ' + token}}
}