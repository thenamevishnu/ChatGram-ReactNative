import { StatusBar } from "react-native";
import AppNavigation from "./src/Navigations/AppNavigation";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor={"#111"} barStyle={"light-content"}/>
            <AppNavigation/>
        </>
    )
}