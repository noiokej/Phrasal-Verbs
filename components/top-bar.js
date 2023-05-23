import {View, StyleSheet, Text} from "react-native";
import Menu from "./menu";


const TopBar = () => {
    return (
        <View style={styles.topBarContainer}>
            <Menu/>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        // backgroundColor: '#3c3561',
        backgroundColor: '#4d347d',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },

})

export default TopBar