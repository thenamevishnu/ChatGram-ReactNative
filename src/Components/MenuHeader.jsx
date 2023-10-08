import { FontAwesome } from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function MenuHeader({ title, icon , setShowSearch, navigation}) {

    return (
        <SafeAreaView className="bg-[#111] p-4 pr-0 flex-row justify-between">
            <View className="flex-row items-center">
                {title === "ChatGram" ? <Image source={{uri: icon}} className="w-8 h-8 rounded-full"/> : <FontAwesome name={"phone"} size={25} color={"white"}/>}
                <Text className="text-white ml-5 text-xl font-semibold">{title}</Text>
            </View>
            <View className="flex-row items-center">
                {icon && <FontAwesome name={"search"} color={"#fff"} size={25} style={{marginEnd:20}} onPress={()=>setShowSearch((prev) => !prev)}/>}
            </View>
        </SafeAreaView>
    )
}
