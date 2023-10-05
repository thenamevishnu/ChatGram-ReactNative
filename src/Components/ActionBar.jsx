import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useRef } from 'react'
import { Image, SafeAreaView, Text } from 'react-native'
import { View } from 'react-native'

function ActionBar({ route }) {

    const userData = useRef(null)
    userData.current = route.params.item

    return (
        <SafeAreaView className="px-6 bg-[#111] p-2 flex-row justify-between items-center">
            <View className="flex-row items-center">
                <Image source={{uri: userData.current.pic}} className="w-16 h-16 rounded-full"/>
                <View className="ml-2">
                    <Text className="text-white text-xl">{userData.current.name}</Text>
                    <Text className="text-white text-sm">Online</Text>
                </View>
            </View>
            <View className="flex-row items-center">
                <FontAwesome name={"video-camera"} color={"#fff"} size={25} style={{marginRight:20}}/>
                <FontAwesome name={"phone"} color={"#fff"} size={25} style={{marginRight:20}}/>
                <Entypo name={"dots-three-vertical"} color={"#fff"} size={25}/>
            </View>
        </SafeAreaView>
    )
}

export default ActionBar
