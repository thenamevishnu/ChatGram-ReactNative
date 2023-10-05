import { TextInput } from "react-native";
import { styles } from "../Style";

export default function SearchBar({placeholder}) {
    return (
        <TextInput placeholder={placeholder} className="p-4 mx-1 rounded-2xl" style={styles.SearchBar}/>
    )
}

