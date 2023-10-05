import React, { useEffect, useRef } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import ActionBar from './ActionBar'
import { ScrollView } from 'react-native'
import { messages } from '../dummy'
import { TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function SingleChat({ route }) {

    const scrollViewRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    },[])

    const scrollToBottom = () => {
        if(scrollViewRef.current){
            scrollViewRef.current.scrollToEnd({animated:true})
        }
    }
    
    return (
        <SafeAreaView className="h-screen">
            <ActionBar route={route} className="mb-1"/>
            <ScrollView ref={scrollViewRef} className="bg-[#222222]" onContentSizeChange={scrollToBottom}>
                {
                    messages.map((item, index) => {
                        return(
                            <TouchableOpacity onLongPress={(e)=>changeColor(e)} activeOpacity={1} key={index} className={item.from==="01" ? "px-1 items-start relative" : "px-1 items-end relative"}>
                                <Text className={item.from === "01" ? "bg-green-800 text-white p-3 max-w-xs rounded-xl" : "bg-gray-400 p-2 rounded-xl max-w-xs"}>{item.message}</Text>
                                <Text>{item.time}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <View className="bg-[#222222] px-5 flex-row items-center">
                <TextInput className="p-3 rounded-2xl mb-2 bg-white w-5/6" placeholder='Message...'></TextInput>
                <Text className="bg-white text-green-900 mb-2 rounded-full p-4 ml-3"><FontAwesome name={"paper-plane"} size={22}/></Text>
            </View>
        </SafeAreaView>
    )
}
