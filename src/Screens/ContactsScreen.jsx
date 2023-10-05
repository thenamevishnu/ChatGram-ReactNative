import Contacts from '../Components/Contacts'

export default function ContactsScreen({ navigation, route }) {

    const data = route.params.data 

    return (
        <Contacts navigation={navigation} data={data}/>
    )
}
