import { FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts"
import { useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function NewChat({ navigation }) {

    const [loading, setLoading] = useState(false)
    const animateRef = useRef(null)

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
            <TouchableOpacity activeOpacity={1} className="absolute bottom-6 flex justify-center items-center right-6 bg-[#000] w-12 h-12 rounded-full" onPress={()=>{setLoading(true); handleContacts();}}>
                <Text ref={animateRef}>
                    <FontAwesome name={"spinner"} size={20} color={"white"}/>
                </Text>
            </TouchableOpacity> : 
            <TouchableOpacity activeOpacity={1} className="absolute bottom-6 flex justify-center items-center right-6 bg-[#000] w-12 h-12 rounded-full" onPress={()=>{setLoading(true); handleContacts();}}>
                <Text>
                    <FontAwesome name={"plus"} size={20} color={"white"}/>
                </Text>
            </TouchableOpacity>
        }
        </>
        
    )
}
