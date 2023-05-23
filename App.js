import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Words from "./components/decks";
import TopBar from "./components/top-bar";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

    return (
        <View style={styles.container}>
            <TopBar/>
            <Words/>
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
