import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import MenuHeader from './MenuHeader'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import NewChat from './NewChat'
import { socket } from '../socket'
import { useMyContext } from '../Hooks/ContextApi'
import { useEffect, useState } from 'react'
import { getAllChatList } from '../Services/chat'
import { getMyData } from '../Services/myData'
import { FontAwesome } from '@expo/vector-icons'
import { TextInput } from 'react-native'

export default function ChatList({ navigation }) {

    const {setSocket} = useMyContext()
    const [user, setUser] = useState({})
    const [chatList,setChatList] = useState([])
    const {changeList} = useMyContext()
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        getMyData().then(data => {
            const users = JSON.parse(data).user
            setUser(users)
            const fetchData = async () => {
                const userLists = await getAllChatList(users.id)
                const lists = userLists.map(obj => {
                    return{
                        ...obj,users: obj.users.filter(item => item.id != users.id)
                    }
                })
                setChatList(lists)
           }
           fetchData()
        })
    },[changeList])

    useEffect(()=>{
        if(user.id){
            socket.emit("setup", user.id)
            setSocket(socket)
        }
    },[user.id])

    const manageChatSelection = async (item) => {
        navigation.navigate("singleChat", {item: item})
    }

    return (
        <>
        <SafeAreaView> 
           <MenuHeader title={"ChatGram"} icon={user.pic} setShowSearch={setShowSearch}/>
           {showSearch && <View className="bg-[#222222] px-2 pt-1.5">
                <TextInput className="p-2 border-2 border-gray-600 rounded-xl text-gray-400 placeholder:text-gray-400" placeholder="search number or name..."></TextInput>
           </View>}
           <ScrollView className="bg-[#222222] w-screen h-screen pb-42" contentContainerStyle={{paddingBottom:60}}>
                {
                    chatList?.length > 0 && chatList.map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className="flex-row active:bg-black items-center justify-between p-2 relative border-b-2" onPress={async ()=>await manageChatSelection(item)}>
                                <View className="flex-row items-center">
                                    <View>
                                        <Image source={{uri:item.users[0].pic}} className="w-16 h-16 rounded-full"/>
                                    </View>
                                    <View className="ml-3">
                                        <Text className="text-white mb-2">{item.users[0].user}</Text>
                                        <Text className="text-gray-400">{item.lastMessage ?? <><FontAwesome name={"dot-circle-o"} color={"green"}/> <Text>New</Text></>}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white">{new Date(item.updatedAt).toLocaleString("default",{day:"2-digit",month:"2-digit",year:"2-digit"}) == new Date().toLocaleString("default",{day:"2-digit",month:"2-digit",year:"2-digit"}) ? new Date(item.updatedAt).toLocaleString("default",{hour:"2-digit",minute:"2-digit",hour12:true}) : new Date(item.updatedAt).toLocaleString("default",{day:"2-digit",month:"2-digit",year:"numeric"})}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                {
                    chatList?.length === 0 && 
                        <View className="flex justify-center items-center">
                            <Image source={require("../assets/Images/empty.png")} />
                        </View>
                }
           </ScrollView>     
           
        </SafeAreaView>
        <NewChat navigation={navigation}/>
        </>
    )
}
