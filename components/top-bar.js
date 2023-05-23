import {View, StyleSheet, Text} from "react-native";
import Menu from "./menu";


const TopBar = (props) => {
    console.log(props, 'topbar')
    return (
        <View style={styles.topBarContainer}>
            <Menu
                theme = {props.theme}
                setTheme = {props.setTheme}
            />
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