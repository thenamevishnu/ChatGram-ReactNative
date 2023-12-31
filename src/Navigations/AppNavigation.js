import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../Screens/WelcomeScreen"
import ChatListScreen from "../Screens/ChatListScreen"
import Conversation from "../Screens/Conversation"
import ContactsScreen from "../Screens/ContactsScreen"
import LoginScreen from "../Screens/LoginScreen"
import InitialSetupScreen from "../Screens/InitialSetupScreen"

const Stack = createNativeStackNavigator()

export default function AppNavigation(){

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{animation:"slide_from_right",headerShown:false}}>
                <Stack.Screen name="welcome" component={WelcomeScreen} />
                <Stack.Screen name="login" component={LoginScreen}/>
                <Stack.Screen name="initalProfile" component={InitialSetupScreen} />
                <Stack.Screen name="chatList" component={ChatListScreen} />
                <Stack.Screen name="singleChat" component={Conversation} />
                <Stack.Screen name="Contacts" component={ContactsScreen} />   
            </Stack.Navigator>
        </NavigationContainer>
    )
}