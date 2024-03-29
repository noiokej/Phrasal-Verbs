import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import Words from "./components/decks";
import TopBar from "./components/top-bar";
import {useCallback, useState} from "react";
import Menu from "./components/menu";
import {AppRegistry} from "react-native";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler'
import { ThemeProvider} from "./context/themeContext";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

AppRegistry.registerComponent('PhrasalVerbs', () => Menu);
SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat'
    },
});
const HomeScreen = () => {

    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(showMenu === false)
    }
    return (
        <View style={styles.container}>
            <Words
                navigation={navigation}
            />
        <StatusBar backgroundColor={'#242129'} style={"light"}/>
        </View>

    );
}

export default function App() {
const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1, fontFamily: 'Montserrat' }} onLayout={onLayoutRootView}>
            <ThemeProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerTitle: () => <TopBar />,
                            headerStyle: {
                                backgroundColor: '#242129',
                            },
                            headerTitleContainerStyle: { justifyContent: 'center', alignItems: 'center' },
                            headerLeft: null,
                            headerMode: "screen",
                        }}
                    >
                        <Stack.Screen name="Home" component={HomeScreen}  />
                        <Stack.Screen name="Menu" component={Menu}  />
                        <Stack.Screen name="Words" component={Words}  />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </View>
    );

}


