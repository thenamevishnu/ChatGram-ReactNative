import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import MenuHeader from './MenuHeader'
import { userList } from '../dummy'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import io from "socket.io-client"
import NewChat from './NewChat'

const socket = io("http://localhost:8080")

export default function ChatList({ navigation }) {

    const manageChatSelection = async (item) => {

        navigation.navigate("singleChat", {item: item, socket: socket})
    }

    return (
        <>
        <SafeAreaView> 
           <MenuHeader title={"ChatGram"}/>
           <ScrollView className="bg-[#222222] w-screen h-screen pb-42" contentContainerStyle={{paddingBottom:60}}>
                {
                    userList.map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className="flex-row active:bg-black items-center justify-between p-2 relative border-b-2" onPress={async ()=>await manageChatSelection(item)}>
                                <View className="flex-row items-center">
                                    <View>
                                        <Image source={{uri:item.pic}} className="w-16 h-16 rounded-full"/>
                                    </View>
                                    <View className="ml-3">
                                        <Text className="text-white">{item.name}</Text>
                                        <Text className="text-gray-400">{item.lastMessage}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white">{item.updatedAt}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
           </ScrollView>     
           
        </SafeAreaView>
        <NewChat navigation={navigation}/>
        </>
    )
}
