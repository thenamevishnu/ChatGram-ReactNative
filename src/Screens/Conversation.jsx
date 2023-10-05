import { SafeAreaView } from "react-native";
import SingleChat from "../Components/SingleChat";

export default function Conversation({ route }) {
    
    return (
        <SafeAreaView>
            <SingleChat route={route}/>
        </SafeAreaView>
    )
}
