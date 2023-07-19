import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {useContext, useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import AlphabeticalOrder from "./alphabetical-order";
import ListOfAllWords from "./list-of-all-words";
import KnownWords from "./known-words";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../context/themeContext";
import {dark, darkerDark, darkText, light, purple, itemText, backgroudLight} from "../utils/colors"
import Favourite from "./favourite";
import {FontAwesome} from "@expo/vector-icons";

const Menu = ({ openMenu}) => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const [alphabetIsOpen, setAlphabetIsOpen] = useState(false);
    const [listOfAllWordsIsOpen, setListOfAllWordsIsOpen] = useState(false);
    const [knownWordsIsOpen, setKnownWordsIsOpen] = useState(false);
    const [favouriteIsOpen, setFavouriteIsOpen] = useState(false)

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.goBack()
    };


    const styles = StyleSheet.create({
        menu: {
            backgroundColor: theme === 'dark' ? darkerDark : backgroudLight,
            flex: 11,
            width:'100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
            width: '90%',
            height: '90%',
            borderRadius: 20
        },
        menuContainerItem: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            padding: 5,
            margin: 5,
            backgroundColor: theme === 'dark' ? darkerDark : purple,
        },
        menuContainerItemText: {
            color: theme === 'dark' ? darkText : backgroudLight,
            fontSize: 20,
            padding: 10,
            fontFamily: 'Montserrat',
        },
        menuTitle: {
            fontSize: 25,
            marginBottom: 10,
            color: theme === 'dark' ? itemText : purple,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontFamily: 'Montserrat',
            letterSpacing: 2
        },
        backIcon: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            margin: 15,
        },
        starIcon: {
            textDecorationLine: "none",
            position: "absolute",
            right: 20,
            top: 15
        }
    })

    const handlePress = (param) => {
        if (param === 'alphabet') {
            setAlphabetIsOpen(!alphabetIsOpen)
        } else if (param === 'list') {
            setListOfAllWordsIsOpen(!listOfAllWordsIsOpen)
        } else if (param === 'known') {
            setKnownWordsIsOpen(!knownWordsIsOpen)
        } else if (param === 'favourite') {
            setFavouriteIsOpen(!favouriteIsOpen)
        }
         else {
            setKnownWordsIsOpen(false)
            setListOfAllWordsIsOpen(false)
            setAlphabetIsOpen(false)
            setFavouriteIsOpen(false)
        }
    }

    return (
        <View style={styles.menu}>
            <Text style={styles.menuTitle} onPress={openMenu}>
                {alphabetIsOpen ? "Wybierz literę" : 
                knownWordsIsOpen ? "Znane słowa" : 
                listOfAllWordsIsOpen ? "Lista wszystkich słów" : 
                favouriteIsOpen ? "Ulubione" : 
                "MENU"}
            </Text>
            {favouriteIsOpen ? <Text style={styles.starIcon}><FontAwesome name="star" size={30} color={purple} /></Text> : ""}
            <View style={styles.menuContainer}>
                {!alphabetIsOpen && !listOfAllWordsIsOpen && !knownWordsIsOpen &&!favouriteIsOpen ? <>
                <TouchableHighlight
                    style={styles.menuContainerItem}
                    onPress={() => navigation.navigate("Words")}
                >
                    <Text style={styles.menuContainerItemText}>Losuj słowa</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.menuContainerItem}
                    onPress={() => handlePress('alphabet')}>
                    <Text style={styles.menuContainerItemText}>Ucz się alfabetycznie</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.menuContainerItem}
                    onPress={() => handlePress('list')}>
                    <Text style={styles.menuContainerItemText}>Lista wszystkich słów</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.menuContainerItem}
                    onPress={() => handlePress('known')}>
                    <Text style={styles.menuContainerItemText}>Nauczone słowa</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.menuContainerItem}
                    onPress={() => handlePress('favourite')}>
                    <Text style={styles.menuContainerItemText}>Ulubione</Text>
                </TouchableHighlight>
                </>
               : null}
                {alphabetIsOpen ? <AlphabeticalOrder/> : null }
                {listOfAllWordsIsOpen ? <ListOfAllWords/> : null}
                {knownWordsIsOpen ? <KnownWords/> : null}
                {favouriteIsOpen ? <Favourite/> : null}


                {!alphabetIsOpen && !listOfAllWordsIsOpen && !knownWordsIsOpen && !favouriteIsOpen ?
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={navigateToHome}>
                        <Text>
                            <Ionicons name="close-sharp" size={30} color={theme === 'dark' ? darkText : dark} />
                        </Text>
                    </TouchableOpacity>
                        :
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={handlePress}>
                        <Text>
                            <Ionicons name="return-down-back" size={30} color={theme === 'dark' ? darkText : dark} />
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Menu