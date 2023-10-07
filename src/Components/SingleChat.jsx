import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import ActionBar from './ActionBar'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useMyContext } from '../Hooks/ContextApi'
import { getMyData } from '../Services/myData'
import { getMessagesByChat, sendMessageNow, setUnreadMessage } from '../Services/chat'
import { skelten } from '../constants'

export default function SingleChat({ route , navigation }) {

    const scrollViewRef = useRef(null)
    const {socket} = useMyContext()
    const [user, setUser] = useState({})
    const [message, setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const selectedChat = useRef(null)
    const {changeList, setChangeList} = useMyContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        scrollToBottom()
        getMyData().then(async data => {
            const user = JSON.parse(data).user
            setUser(user)
            selectedChat.current = route.params.item
            const msg = await getMessagesByChat(selectedChat.current._id)
            socket.emit("join_chat",selectedChat.current._id)
            setMessages(msg)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        socket.on("receive_message",async (receivedData)=>{ 
            console.log(receivedData);
            if(selectedChat.current._id === receivedData.chat_id._id){ 
                setMessages((messages) => [...messages,receivedData])
            }else{
                await setUnreadMessage(receivedData.sender._id, receivedData.chat_id._id)
            }
            setChangeList(receivedData)
        })
    },[socket])

    const scrollToBottom = () => {
        if(scrollViewRef.current){
            scrollViewRef.current.scrollToEnd({animated:true})
        }
    }

    const sendMessage = async () => {
        if(message.trim().length === 0) return
        const messageData = {
            content: message.trim(),
            chat_id:selectedChat.current._id,
            sender:user.id
        }
        const response = await sendMessageNow(messageData)
        socket.emit("new_message",response)
        setMessages([...messages,response])
        setMessage("")
        setChangeList(!changeList)
    }
    
    return (
        <SafeAreaView className="h-screen">
            
            <ActionBar route={route.params} className="mb-1"/>

            <ScrollView ref={scrollViewRef} className="bg-[#222222]" onContentSizeChange={scrollToBottom}>
                {
                    loading ? skelten?.map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className={item===1 ? "px-1 items-start relative" : "px-1 items-end relative"}>
                                <Text className="w-1/2 rounded-xl bg-[#444] p-2 my-2 animate-pulse"></Text>
                            </TouchableOpacity>
                        )
                    }) : messages?.map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className={item.sender._id!=user.id ? "px-1 items-start relative" : "px-1 items-end relative"}>
                                <Text className={item.sender._id!=user.id ? "bg-green-800 text-white p-3 max-w-xs rounded-xl" : "bg-gray-400 p-2 rounded-xl max-w-xs"}>{item.content}</Text>
                                <Text className="text-gray-400 text-xs">{new Date(item.updatedAt).toLocaleString("default",{hour:"2-digit", minute:"2-digit", hour12:true})}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <View className="bg-[#222222] px-5 flex-row items-center">
                <TextInput numberOfLines={2} multiline className="p-3 rounded-2xl mb-2 bg-white w-5/6" placeholder='Message...' value={message} onChangeText={(text) => setMessage(text)}></TextInput>
                <Text className="bg-white text-green-900 mb-2 rounded-full p-4 ml-3" onPress={sendMessage}><FontAwesome name={"paper-plane"} size={22}/></Text>
            </View>
        </SafeAreaView>
    )
}
