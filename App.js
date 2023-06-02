import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Words from "./components/decks";
import TopBar from "./components/top-bar";
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from "react";
import Menu from "./components/menu";
import {AppRegistry} from "react-native";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler'
import { ThemeProvider} from "./context/themeContext";
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

AppRegistry.registerComponent('PhrasalVerbs', () => Menu);

const styles = StyleSheet.create({
    container: {
        // paddingTop: '10%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const HomeScreen = () => {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);
    // const [theme, setTheme] = useState('dark')

    const openMenu = () => {
        setShowMenu(showMenu === false)
    }
    return (
        <View style={styles.container}>

            {/*{showMenu ? (*/}
            {/*<Menu*/}

            {/*    openMenu={openMenu}*/}
            {/*    navigation={navigation}*/}
            {/*/>*/}
            {/*) : (*/}
            <Words

                navigation={navigation}
            />
            {/*)}*/}
        </View>
    );
}

export default function App() {


    return (
        <ThemeProvider>
            <NavigationContainer>

                <Stack.Navigator
                    screenOptions={{
                        headerTitle: () => <TopBar />,
                        headerStyle: {
                            backgroundColor: '#f4511e',

                        },
                        headerTitleContainerStyle: { justifyContent: 'center', alignItems: 'center' },
                        headerLeft: null,
                        headerMode: "screen"
                    }}


                >
                    <Stack.Screen name="Home" component={HomeScreen}  />
                    <Stack.Screen name="Menu" component={Menu}  />
                    <Stack.Screen name="Words" component={Words}  />

                </Stack.Navigator>

            </NavigationContainer>

        </ThemeProvider>
    );
}


