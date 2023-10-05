import { FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts"
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function NewChat({ navigation }) {

    const [loading, setLoading] = useState(false)

    const handleContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === 'granted') {
            const {data} = await Contacts.getContactsAsync()
            setLoading(false)
            navigation.navigate("Contacts", {data: data})
        } else {
            console.log('Contact permission denied.');
        }
    }

    return (
        <>
        {
            loading ? 
            <TouchableOpacity activeOpacity={1} className="absolute bottom-6 animate-spin right-6 bg-[#000] p-4 px-5 rounded-full" onPress={()=>{setLoading(true); handleContacts();}}>
                <Text>
                    <FontAwesome name={"spinner"} size={30} color={"white"}/>
                </Text>
            </TouchableOpacity> : 
            <TouchableOpacity activeOpacity={1} className="absolute bottom-6 right-6 bg-[#000] p-4 px-5 rounded-full" onPress={()=>{setLoading(true); handleContacts();}}>
                <Text>
                    <FontAwesome name={"plus"} size={30} color={"white"}/>
                </Text>
            </TouchableOpacity>
        }
        </>
        
    )
}
