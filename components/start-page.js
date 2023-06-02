import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ThemeContext from "../context/themeContext";
import {useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {dark, darkerDark, darkText, light, darkButtonColor, darkTextInButton, backgroudLight, lightButtonColor, lightTextInButton} from "../utils/colors"


const StartPage = ({iterowanie, letter}) => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useContext(ThemeContext);


    const styles = StyleSheet.create({
        start: {
            // backgroundColor: '#29253e',
            backgroundColor: theme === 'dark' ? dark : light,
            flex: 11,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        startButton: {
            // overflow: 'visible',
            backgroundColor: darkButtonColor,
            padding: 20,
            margin: 10,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 5,
            elevation: 10,
        },
        startButtonText: {
            fontSize: 20,
            color: darkTextInButton,
        }
    })

    return (
        <View style={styles.start}>
            {letter &&
            <Text>{letter}</Text>
            }
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText} onPress={iterowanie}
                    // onPress={() => {
                    //     iterowanie()
                    // // navigation.navigate("Words")
                    // }}
                >Rozpocznij</Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartPage