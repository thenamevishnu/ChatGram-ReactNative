import { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";
import { getMyData } from "../Services/myData";

export default function WelcomeScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            getMyData().then(res => {
                if(res){
                    navigation.reset({
                        index:0,
                        routes:[{name:"chatList"}]
                    })
                }else{
                    navigation.reset({
                        index:0,
                        routes:[{name:"login"}]
                    })
                }
            })
        }, 1500);
    },[])

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-[#111]">
                <Image source={require("../assets/Images/logo.png")} className="animate-pulse" />
        </SafeAreaView>
    )
}
