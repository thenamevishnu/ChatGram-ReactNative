import localStorage from "@react-native-async-storage/async-storage"

export const getMyData = async () => {
    const response = await localStorage.getItem("localDB")
    return response
}