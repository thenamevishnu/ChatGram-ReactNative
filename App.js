import { StatusBar } from "react-native";
import AppNavigation from "./src/Navigations/AppNavigation";
import { MyProvider } from "./src/Hooks/ContextApi";

export default function App() {

    return (
        <MyProvider>
            <StatusBar backgroundColor={"#111"} barStyle={"light-content"}/>
            <AppNavigation/>
        </MyProvider>
    )
}