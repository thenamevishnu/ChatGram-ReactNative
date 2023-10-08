import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import localstorage from "@react-native-async-storage/async-storage"
import { getMyData } from '../Services/myData';

export default function Menu({ navigation }) {

    const [menu, showMenu] = useState(false)
    const myData = useRef(null)

    useEffect(() => {
        getMyData().then(res => {
            myData.current = JSON.parse(res).user
        })
    },[])

    const logout = () => {
        localstorage.removeItem("localDB")
        navigation.reset({
            index: 0,
            routes:[{name:"login"}]
        })
    }

    return (
        <TouchableOpacity activeOpacity={1} className="absolute bottom-24 flex justify-center items-center right-6 bg-[#000] w-12 h-12 rounded-full"  onPress={()=>showMenu(!menu)}>
            <Text>
                <FontAwesome name={"bars"} size={20} color={"white"}/>
            </Text>
            {menu && <View className="absolute bg-[#444444] w-[50vw] h-auto rounded-xl px-1 right-8 bottom-8 p-2">
                <Text className="p-2 px-3 text-white font-semibold">{myData.current.user}</Text>
                <Text className="p-2 px-3 text-white font-semibold" onPress={logout}>LogOut</Text>
            </View>}
        </TouchableOpacity>
    )
}
