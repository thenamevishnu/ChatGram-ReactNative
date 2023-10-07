import { Image, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import MenuHeader from "./MenuHeader"
import { getMyData } from "../Services/myData"
import { createChat, filterContact, getUserExist } from "../Services/chat"
import { TextInput } from "react-native"
import { useEffect, useRef, useState } from "react"


export default function Contacts({ navigation, data }) {

    const [showSearch, setShowSearch] = useState(false)
    const [search, setSearch] = useState("")
    const contacts = useRef(null)
    contacts.current = data
    
    const getNumber = async (item) => {
        if(item.phoneNumbers){
            let number = item.phoneNumbers[0].number.replace(/\s+/igm,"")
            if(number.slice(0,3) == "+91"){
                number = number.slice(3)
            }
            const myId = JSON.parse(await getMyData()).user.id
            const response = await getUserExist(number)
            if(response){
                await createChat(myId, response.chat._id)
                navigation.reset({
                    index:0,
                    routes:[{name:"chatList"}]
                })
            }else{
                ToastAndroid.show(
                    "User not in ChatGram",
                    ToastAndroid.BOTTOM
                )
            }
        }
    }

    return (
        <SafeAreaView> 
           <MenuHeader title={"Contacts"} icon={""} setShowSearch={setShowSearch}/>
           {showSearch && <View className="bg-[#222222] px-2 pt-1.5">
                <TextInput onChangeText={text => setSearch(text)} value={search} className="p-2 border-2 border-gray-600 rounded-xl text-gray-400 placeholder:text-gray-400" placeholder="search number or name..."></TextInput>
           </View>}
           <ScrollView className="bg-[#222222] w-screen h-screen pb-42" contentContainerStyle={{paddingBottom:60}}>
                {
                    contacts.current?.filter(item => item.phoneNumbers && item.phoneNumbers[0]?.number?.length >= 10).map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className="flex-row active:bg-black items-center justify-between p-2 relative border-b-2" onPress={async ()=>await getNumber(item)}>
                                <View className="flex-row items-center">
                                    <View>
                                        <Image source={{uri:item.imageAvailable ? item.image.uri : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}} className="w-16 h-16 rounded-full"/>
                                    </View>
                                    <View className="ml-3">
                                        <Text className="text-white">{item.name}</Text>
                                        <Text className="text-white">{item?.phoneNumbers[0]?.number}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
           </ScrollView>     
           
        </SafeAreaView>
    )
}
