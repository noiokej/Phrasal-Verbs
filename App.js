import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Words from "./components/decks";
import TopBar from "./components/top-bar";
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from "react";

export default function App() {
    const [theme, setTheme] = useState('dark')
    return (
        <View style={styles.container}>
            <TopBar
                theme = {theme}
                setTheme = {setTheme}/>
            <Words
                theme = {theme}
                setTheme = {setTheme}/>
        </View>
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
