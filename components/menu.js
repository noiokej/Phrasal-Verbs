import {View, Text, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {TouchableHighlight} from "react-native";


const Menu = ({theme, setTheme}) => {

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // const iconTheme = () => {
    //     const icon = theme === 'dark' ? 'sun' : 'moon'
    //     return icon
    // }

    return (
        <View style={styles.menu}>
            <TouchableHighlight style={styles.changeTheme} underlayColor="transparent" onPress={handleThemeChange}><Feather name={theme === 'dark' ? 'sun' : 'moon'} size={30} color={'#e1d0fc'}/></TouchableHighlight>
            <Text style={styles.menuText}>Menu</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',
        // flex: 1
    },
    menuText: {
        fontSize: 20,
        color: '#dad0e8',
        backgroundColor: 'red',
        marginRight: 10,
    },
    changeTheme: {
        marginLeft: 10,
    }
})

export default Menu