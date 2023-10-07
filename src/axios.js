import axios from "axios";
import { getMyData } from "./Services/myData";
import { config } from "../config";

export const api_call = axios.create({
    baseURL: config.SERVER_URL
})

api_call.interceptors.request.use(async config => {

    const userInfo = await getMyData()
    const token = userInfo ? JSON.parse(userInfo).token : null

    config.headers.Authorization = `Bearer ${token}`

    return config
})