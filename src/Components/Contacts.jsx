import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import MenuHeader from "./MenuHeader"

export default function Contacts({ navigation, data }) {

    const getNumber = (item) => {
        if(item.phoneNumbers){
            window.alert(item?.phoneNumbers[0]?.number)
        }
    }

    return (
        <SafeAreaView> 
           <MenuHeader title={"Contacts"}/>
           <ScrollView className="bg-[#222222] w-screen h-screen pb-42" contentContainerStyle={{paddingBottom:60}}>
                {
                    data.filter(item => item.phoneNumbers && item.phoneNumbers[0].number.length >= 10).map((item, index) => {
                        return(
                            <TouchableOpacity activeOpacity={1} key={index} className="flex-row active:bg-black items-center justify-between p-2 relative border-b-2" onPress={async ()=>await getNumber(item)}>
                                <View className="flex-row items-center">
                                    <View>
                                        <Image source={{uri:item.imageAvailable ? item.image.uri : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}} className="w-16 h-16 rounded-full"/>
                                    </View>
                                    <View className="ml-3">
                                        <Text className="text-white">{item.name}</Text>
                                        <Text className="text-white">{item?.phoneNumbers[0]?.number}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
           </ScrollView>     
           
        </SafeAreaView>
    )
}
