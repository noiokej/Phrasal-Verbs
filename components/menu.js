import {View, Text, StyleSheet} from 'react-native';

const Menu = () => {
    return (
        <View style={styles.menu}>
            <Text style={styles.menuText}>Menu</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    menu: {
        // backgroundColor: 'red'
    },
    menuText: {
        fontSize: 20,
        color: '#dad0e8',
    }
})

export default Menu