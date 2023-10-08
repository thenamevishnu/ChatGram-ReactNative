import React, { useRef, useState } from 'react'
import { ToastAndroid, TouchableOpacity } from 'react-native'
import { Text, TextInput, View } from 'react-native'
import { Image, SafeAreaView } from 'react-native'
import localStorage from "@react-native-async-storage/async-storage"
import { profileUpdate, userNameCheck } from '../Services/chat'

export default function InitialProfile({ route, navigation }) {

    const itemRef = useRef(null)
    itemRef.current = route.params.item
    const [profile, setProfile] = useState({username:"", pic:"https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"})

    const completeProfile = async () => {
        if(profile.username.trim() == ""){
            ToastAndroid.show(
                "username is empty",
                ToastAndroid.BOTTOM,
                ToastAndroid.SHORT
            )
        }else{
            const response = await userNameCheck(profile.username)
            if(response){
                ToastAndroid.show(
                    "username exist",
                    ToastAndroid.BOTTOM,
                    ToastAndroid.SHORT
                )
            }else{
                await profileUpdate(profile, itemRef.current.user.id)
                itemRef.current.user.user = profile.username
                await localStorage.setItem("localDB", JSON.stringify(itemRef.current))
                navigation.reset({
                    index:0,
                    routes:[{name:"chatList"}]
                })
            }
        }
        
    }

    return (
        <SafeAreaView className="h-screen w-screen bg-[#222222] flex-col items-center pt-20"> 
            <Image source={{uri: profile.pic}} className="rounded-full w-32 h-32"/>
            <View className="flex-row">
                <Text className="text-white font-semibold text-lg pt-4">Username: </Text>
                <TextInput defaultValue="ChatGramUser" onChangeText={(text) => setProfile({...profile,username:text})} value={profile.username} className="text-white border-b-2 border-gray-500 pt-4" autoFocus={true}/>
            </View>
            <TouchableOpacity onPress={completeProfile}>
                <Text className="bg-green-700 p-3 px-6 text-white rounded-xl mt-10">Completed</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
