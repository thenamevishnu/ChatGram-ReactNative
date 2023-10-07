import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, TouchableHighlight } from 'react-native'
import { Image, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { api_call } from '../axios'
import localStorage from "@react-native-async-storage/async-storage"

export default function Login({ navigation }) {

    const [number, setNumber] = useState("")
    const [otpBox, setOtpBox] = useState(false)
    const [otp, setOtp] = useState("")

    const handleSubmit = async () => {
        try{
            if(number.length != 10){
                window.alert("Enter 10 digits!") 
            }else{
                const {data} = await api_call.post("/send_otp", {number}) 
                if(data.status){
                    setOtpBox(true)
                }
            }
        }catch(err){
            window.alert(err)
        }
    }

    const handleSubmitOtp = async () => {
        try{
            const {data} = await api_call.post("/verify_otp", {number, otp}) 
            if(data.status){
                await localStorage.setItem("localDB", JSON.stringify(data.user))
                navigation.reset({
                    index:0,
                    routes:[{name:"chatList"}]
                })
            }
        }catch(err){
            window.alert(err)
        }
    }
   
    return (
        <SafeAreaView className="bg-black w-screen h-screen flex-col justify-center items-center px-1">
            <Image source={require("../assets/Images/login.png")} className="w-1/2 h-1/3 object-contain"/>
            {
                otpBox ? 
                <>
                    <View className="w-full flex-row justify-around">
                        <TextInput placeholder='Enter number...' className="w-9/12 p-3 text-center round rounded-xl border-2 border-gray-500 text-white text-xl" value={otp && otp} onChangeText={(text) => setOtp(text)}></TextInput>
                    </View>
                    <TouchableOpacity activeOpacity={1} className="mt-10 rounded-xl bg-purple-900 p-2 px-5" onPress={handleSubmitOtp}>
                        <Text className="text-white text-lg font-semibold">Submit</Text>
                    </TouchableOpacity>
                </>
                 :
                <>
                    <View className="w-full flex-row justify-around">
                        <TouchableHighlight className="w-2/12 p-3 round rounded-xl border-2 border-gray-500 text-white"><Text className="text-white text-xl text-center">+91</Text></TouchableHighlight>
                        <TextInput placeholder='Enter number...' className="w-9/12 p-3 round rounded-xl border-2 border-gray-500 text-white text-xl" value={number && number} onChangeText={(text) => setNumber(text)}></TextInput>
                    </View>
                    <TouchableOpacity activeOpacity={1} className="mt-10 rounded-xl bg-purple-900 p-2 px-5" onPress={handleSubmit}>
                        <Text className="text-white text-lg font-semibold">Continue</Text>
                    </TouchableOpacity>
                </>
            }
        </SafeAreaView>
    )
}
