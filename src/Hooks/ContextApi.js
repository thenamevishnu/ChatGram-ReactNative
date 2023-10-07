import { createContext, useContext, useState } from "react";

const myContext = createContext()

export const MyProvider = ({ children }) => {
    const [socket, setSocket] = useState({})
    const [changeList, setChangeList] = useState(false)

    return(
        <myContext.Provider value={{socket, setSocket, changeList, setChangeList}}>
            { children }
        </myContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(myContext)
}