import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import Words from "./decks";
import {useNavigation} from "@react-navigation/native";
import { readArrayFromFile } from "../utils/fileOperations";
import {itemText, purple} from '../utils/colors.js'


const AlphabeticalOrder = ({theme}) => {

    const [array, setArray] = useState(null)
    const [result, setResult] = useState(null);
    const navigation = useNavigation();


    useEffect(() => {
        const fetchData = async () => {
        try {
            const array = await readArrayFromFile();
            setArray(array);

            if (array) {
                const words = array.map(item => item.verb);

                const result = alphabet.map(letter => ({
                letter,
                matchingWords: words.filter(word => word.startsWith(letter))
            }));
                setResult(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (array === null) {
            fetchData();
        }
    }, [array]);


    const styles = StyleSheet.create({
        view: {
            alignItems: "flex-start",
            justifyContent: "center",
        },
        containerBlock: {
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "flex-start",
            justifyContent: "center",
        },
        letterItem: {
            width: 60,
            height: 60,
            borderRadius: 10,
            margin: 5,
            backgroundColor: purple,
            alignItems: "center",
            justifyContent: "center",
        },
        letterItemText: {
            color: theme === "dark" ? itemText : "white",
            fontFamily: 'Montserrat',
            fontWeight: "bold"
        },
    })

    const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index))

    if(array && result) {
        return (
            <View style={styles.view}>
                        <View style={styles.containerBlock}>
                            {array &&
                                alphabet.map(letterAlph =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (result) {
                                                navigation.navigate('Words', { letter: letterAlph })
                                                }
                                            }}
                                        key={letterAlph}
                                        style={styles.letterItem}>
                                        <Text style={styles.letterItemText}>{letterAlph} ({result && result.find(item => item.letter === letterAlph)?.matchingWords.length})</Text>
                                    </TouchableOpacity>
                            )}
                        </View>
            </View>
        )
    }
}


export default AlphabeticalOrder