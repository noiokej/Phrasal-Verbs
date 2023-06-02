import {View, StyleSheet, Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import {TouchableHighlight} from "react-native";
import Menu from "./menu";
import ThemeContext from "../context/themeContext";
import {useContext, useState} from "react";
import {useNavigation, useNavigationState, StackActions} from "@react-navigation/native";




const TopBar = ({ openMenu, showMenu}) => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    // const [navigationState, setNavigationState] = useState(null)
    const navigationState = useNavigationState((state) => state);

    const checkStateAndNavigate = () => {
        if (navigationState.routes[navigationState.index].name === "Menu") {
        navigateToHome();
    } else {
        navigation.navigate('Menu');
    }
    };



    const navigateToHome = () => {
        navigation.goBack()
    };

    // const handleThemeChange = () => {
    //     setTheme(theme === 'light' ? 'dark' : 'light')
    // }
    const brighterLight = '#f5f1fa'
    const navigation = useNavigation();

    return (

        <View style={styles.topBarContainer}>
            <View style={styles.menu}>
                <>
                    <TouchableHighlight style={styles.changeTheme} underlayColor="transparent" onPress={toggleTheme}><Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={30} color={'#e1d0fc'}/></TouchableHighlight>

                    <TouchableHighlight style={styles.menuText} underlayColor="transparent" onPress={checkStateAndNavigate}>
                        <Text>
                            <Ionicons name="menu" size={30} color={'#e1d0fc'} />
                        </Text>
                    </TouchableHighlight>

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
        width: '110%',
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