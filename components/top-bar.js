import {View, StyleSheet, Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import {TouchableHighlight} from "react-native";
import Menu from "./menu";


const TopBar = ({theme, setTheme, openMenu, showMenu}) => {


    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const brighterLight = '#f5f1fa'

    return (
        <View style={styles.topBarContainer}>
            <View style={styles.menu}>
                <>
                    <TouchableHighlight style={styles.changeTheme} underlayColor="transparent" onPress={handleThemeChange}><Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={30} color={'#e1d0fc'}/></TouchableHighlight>

                    <TouchableHighlight style={styles.menuText} underlayColor="transparent" onPress={openMenu}><Text><Ionicons name="menu" size={30} color={'#e1d0fc'} /></Text></TouchableHighlight>

                </>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        // backgroundColor: '#3c3561',
        backgroundColor: '#4d347d',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
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
        marginRight: 10,
    },
    changeTheme: {
        marginLeft: 10,
    }

})

export default TopBar