import { SafeAreaView } from "react-native";
import ChatList from "../Components/ChatList";

export default function ChatListScreen({ navigation }) {
    return (
        <SafeAreaView className="bg-white w-screen h-screen">
            <ChatList navigation={navigation}/>
        </SafeAreaView>
    )
}
