import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Words from "./components/decks";
import TopBar from "./components/top-bar";
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from "react";
import Menu from "./components/menu";
import {AppRegistry} from "react-native";
import { NavigationContainer } from '@react-navigation/native';


AppRegistry.registerComponent('PhrasalVerbs', () => Menu);

export default function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [theme, setTheme] = useState('dark')

    const openMenu = () => {
        setShowMenu(showMenu === false)
    }

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <TopBar
                    theme = {theme}
                    setTheme = {setTheme}
                    openMenu = {openMenu}
                    showMenu = {showMenu}
                    setShowMenu = {setShowMenu}
                />
                {showMenu ?
                    <Menu
                        theme = {theme}
                        setTheme = {setTheme}
                        openMenu = {openMenu}
                    />:
                    <Words
                        theme = {theme}
                        setTheme = {setTheme}/>
                }
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
