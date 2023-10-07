import { SafeAreaView } from "react-native";
import SingleChat from "../Components/SingleChat";

export default function Conversation({ navigation, route }) {
    
    return (
        <SafeAreaView>
            <SingleChat route={route} navigation={navigation}/>
        </SafeAreaView>
    )
}
