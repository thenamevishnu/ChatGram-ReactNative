import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, Text, View } from "react-native";

export default function MenuHeader({ title }) {
    return (
        <SafeAreaView className="px-6 bg-[#111] p-4 flex-row justify-between">
            <View className="flex-row items-center">
                {title === "ChatGram" ? <FontAwesome name={"bars"} size={25} color={"white"}/> : <FontAwesome name={"phone"} size={25} color={"white"}/>}
                <Text className="text-white ml-5 text-xl font-semibold">{title}</Text>
            </View>
            <View className="flex items-center">
                <FontAwesome name={"search"} color={"#fff"} size={25}/>
            </View>
        </SafeAreaView>
    )
}
