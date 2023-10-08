import { ToastAndroid } from "react-native";
import { api_call } from "../axios";

export const getAllChatList = async (id) => {
    try{
        const {data} = await api_call.get(`/chat/getChatList/${id}`)
        if(data.error){
            ToastAndroid.show(
                data.error,
                ToastAndroid.BOTTOM
            )
        }else{
            return data.list
        }
    }catch(err){
        
    }
}

export const createChat = async (user, opponent) => {
    try{
        const {data} = await api_call.post(`/chat/createChat`,{user:user,opponent:opponent})
        if(data.status){
            return true
        }else{
            if(data.error){
                ToastAndroid.show(
                data.error,
                ToastAndroid.BOTTOM
            )
                return false
            }else{
                return false
            }
        }
    }catch(err){
       
    }
}

export const getUserExist = async (number) => {
    try{
        const {data} = await api_call.get(`/chat/getUserExist/${number}`)
        if(data.status){
            return {chat: data.info}
        }else{
            if(data.error){
                ToastAndroid.show(
                data.error,
                ToastAndroid.BOTTOM
            )
                return false
            }else{
                return false
            }
        }
    }catch(err){
       
    }
}

export const getMessagesByChat = async (chat_id) => {
    try{
        const {data} = await api_call.get(`/chat/get-all-messages/${chat_id}`)
        if(data.error){
            ToastAndroid.show(
                data.error,
                ToastAndroid.BOTTOM
            )
        }else{
            return data.messages
        }
    }catch(err){
        ToastAndroid.show(
            err,
            ToastAndroid.BOTTOM
        )
    }
}

export const sendMessageNow = async (messageData) => {
    try{
        const {data} = await api_call.post(`/chat/send-message`,{messageData})
        return data.message
    }catch(err){
        ToastAndroid.show(
            err,
            ToastAndroid.BOTTOM
        )
    }
}

export const setUnreadMessage = async (receiver,chat,setZero=false) => {
    try{
        const {data} = await api_call.post(`/chat/unreadMessage`,{chat,receiver,setZero})
        return data.unread
    }catch(err){
        ToastAndroid.show(
            err,
            ToastAndroid.BOTTOM
        )
    }
}

export const userNameCheck = async (username) => {
    try{
        const {data} = await api_call.get(`/usernameCheck/${username}`)
        return data.status
    }catch(err){
        ToastAndroid.show(
            err,
            ToastAndroid.BOTTOM
        )
    }
}

export const profileUpdate = async (profile, user) => {
    try{
        profile.user = user
        const {data} = await api_call.post(`/profileUpdate`,{profile})
        return data.status
    }catch(err){
        ToastAndroid.show(
            err,
            ToastAndroid.BOTTOM
        )
    }
}