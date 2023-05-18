import {View, StyleSheet, Text} from "react-native";


const TopBar = () => {
    return (
        <View style={styles.topBarContainer}>
            <Text style={styles.topBarText}>costam</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        backgroundColor: '#3c3561',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    topBarText: {
        fontSize: 20,
        color: 'white',
    }
})

export default TopBar