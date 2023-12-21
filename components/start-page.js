import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ThemeContext from "../context/themeContext";
import {useContext} from "react";
import {dark, darkText, light, purple} from "../utils/colors"


const StartPage = ({iterowanie, letter}) => {

    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        start: {
            backgroundColor: theme === 'dark' ? dark : light,
            flex: 11,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        startButton: {
            backgroundColor: purple,
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
            color: light,
            fontFamily: 'Montserrat',
        },
        letter: {
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 30,
            fontFamily: 'Montserrat',
            color: theme === "dark" ? darkText : "black"
        },
        text: {
            fontFamily: 'Montserrat',
            color: theme === "dark" ? darkText : "black"
        },
    })

    return (
        <View style={styles.start}>
            {letter &&
                <>
                    <Text style={styles.text}>Losuj słowa rozpoczynające się na literę:</Text>
                    <Text style={styles.letter}>{letter}</Text>
                </>

            }
            <TouchableOpacity style={styles.startButton} onPress={iterowanie}>
                <Text style={styles.startButtonText}>Rozpocznij</Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartPage
