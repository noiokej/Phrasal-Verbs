import {Text, TouchableOpacity, View, StyleSheet} from "react-native";


const StartPage = ({iterowanie, theme, setTheme}) => {
    const dark = '#242129'
    const darkButtonColor = '#4d347d'
    const darkTextInButton = '#dad0e8'

    const light = '#dad0e8'
    const lightButtonColor = '#242129'
    const lightTextInButton = '#4d347d'

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
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText} onPress={() => {
                    iterowanie()
                }
                }>Rozpocznij</Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartPage