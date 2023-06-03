import {StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity} from "react-native";
import * as FileSystem from "expo-file-system";
import {useEffect, useState} from "react";
import Words from "./decks";
import {useNavigation} from "@react-navigation/native";



const AlphabeticalOrder = ({theme}) => {

    const [array, setArray] = useState(null)
    const [result, setResult] = useState(null);
    const [arrayOfWords, setArrayOfWords] = useState(null)

    const navigation = useNavigation();

    const readArrayFromFile = async () => {
        try {
            // await checkPermission()
            const fileUri = FileSystem.documentDirectory + 'Decks';

            // Odczytaj zawartość pliku
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            // Konwertuj tekst na tablicę
            const array = JSON.parse(fileContent);
            console.log(array[1], 'pierwszy obiekt z read arr')
            console.log('TABLICA ZOSTALA ODCZYTANA Z PLIKU')
            return array

        } catch (error) {
            console.log('Wystąpił błąd podczas odczytywania tablicy z pliku:', error);
            return null;
        }
    }



    // const saveArray = async () => {
    //     await readArrayFromFile()
    //         .then((array) => {
    //             setArray(array)
    //
    //
    //         })
    //         .catch((error) => {
    //             // Obsługa błędu
    //             console.error(error);
    //         });
    // }
    // const saveArray = async () => {
    //     try {
    //         const array = await readArrayFromFile();
    //         setArray(array);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // useEffect(() => {
    //     if (array === null) {
    //         saveArray()
    //
    //         const words = []
    //         array.map(item => words.push(item.verb))
    //
    //         const result = alphabet.map(letter => {
    //             const matchingWords = words.filter(word => word.startsWith(letter));
    //             return { letter, matchingWords };
    //
    //         });
    //
    //         setResult(result)
    //     }
    //
    // },[array])


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
                // console.log(result)
            }
        } catch (error) {
            console.error(error);
        }
    };

        if (array === null) {
            fetchData();
        }
    }, [array]);

    const purple = '#4d347d'
    const darkLightText = '#9890a5'
    const itemText = "#e1d0fc"
    const styles = StyleSheet.create({
        view: {
            alignItems: "flex-start",
            justifyContent: "center",
            // width: "100%",
            // flexDirection: "column"
        },
        container: {

            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 30,
            // overflow: 'hidden',
        },
        blockScroll: {

            backgroundColor: 'red',
            height: 60,
            width: "100%",

            borderRadius: 32,
        },

        containerBlock: {
            // backgroundColor: 'blue',
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "flex-start",
            justifyContent: "center",

        },
        alphabetItem :{
            // width: 100,
            borderRadius: 30,
        },
        alphabetItemText :{
            // borderRadius: 30

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


    // const getAlphabet = () => {
    //     const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));
    //     console.log(alphabet)
    //         return alphabet.map(item => (
    //             <TouchableOpacity key={item} style={styles.alphabetItem}>
    //                 {/*<Text style={styles.alphabetItemText}>{item}{"\n"}{getWord(item)}</Text>*/}
    //             </TouchableOpacity>)
    //         )
    //         // return <Text><TouchableOpacity>{alphabet.join("\n")}</TouchableOpacity></Text>
    // }

    //     const getWord = (letter) => {
    //
    //         const verbs = []
    //         array.map((word) => {
    //             console.log(word)
    //             if (word.verb[0] === letter) {
    //                 verbs.push(word.verb)
    //                 // console.log(verbs.length, letter)
    //                 // return <Text key={word.id}>{word.verb}</Text>;
    //                 // return verbs
    //             }
    //         })
    //         return verbs
    // }


    const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

// const findWordsOnLetter = (result, letterAlph) => {
//     const WordsOnLetter = result.find(item => item.letter === letterAlph)?.matchingWords
//     setArrayOfWords(WordsOnLetter)
//     return WordsOnLetter
// }

    if(array && result) {
        return (
            <View style={styles.view}>
                {/*<View style={styles.container}>*/}
                    {/*<Text>{array !== null ? array.map(item => item.verb[0]):null}</Text>*/}
                    {/*<ScrollView style={styles.blockScroll}>*/}


                        <View style={styles.containerBlock}>
                            {/*<ScrollView>{array ? getWord('a'): null}</ScrollView>*/}
                            {/*    {array ? getAlphabet() : null}*/}
                            {array &&
                                alphabet.map(letterAlph =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (result) {
                                                // findWordsOnLetter(result, letterAlph);
                                                navigation.navigate('Words', { letter: letterAlph });
                                                }
                                            }}
                                        key={letterAlph}
                                        style={styles.letterItem}>
                                        <Text style={styles.letterItemText}>{letterAlph} ({result && result.find(item => item.letter === letterAlph)?.matchingWords.length})</Text>
                                    </TouchableOpacity>
                            )}

                        </View>

                    {/*</ScrollView>*/}
                {/*</View>*/}
            </View>
        )
    }
}


export default AlphabeticalOrder