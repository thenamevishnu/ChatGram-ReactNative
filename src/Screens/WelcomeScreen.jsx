import { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";

export default function WelcomeScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("chatList")
        }, 100);
    },[])

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-[#111]">
                <Image source={require("../assets/Images/logo.png")} className="animate-pulse" />
        </SafeAreaView>
    )
}
