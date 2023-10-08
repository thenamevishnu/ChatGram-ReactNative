import React from 'react'
import InitialProfile from '../Components/InitialProfile'

export default function InitialSetupScreen({ route, navigation }) {
    return (
        <InitialProfile navigation={navigation} route={route}/>
    )
}
