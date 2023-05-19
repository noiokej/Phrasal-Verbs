import {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import * as Speech from "expo-speech";
import {FontAwesome5} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";


var json = require('../phrasalverbs.json'); //(with path)
const decks = json

const Words = () => {

    const [isHighlighted, setIsHighlighted] = useState('none');
    const [word, setWord] = useState('');

    const toggleHighlighted = () => {
        setIsHighlighted(!isHighlighted);
    };

    const iterowanie = async () => {
        const array = []
        let i = 0
        for (const [key, value] of Object.entries(decks)) {
            i+=1
            array.push({verb:key, meaning:value[0], example:value[1], degree:0, id:i})
        }
        console.log("ITEROWANIE")
        await saveArrayToFile(array, 'Decks').then(readArrayFromFile).then(drawRandom)
    }

    const drawRandom = async () => {
        const array = await readArrayFromFile()
        // const random = Math.floor(Math.random() * array.length)
        const random = Math.floor(Math.random() * 10)
        console.log('DRAW RANDOm')
        setWord(array[random])
    }

    const checkPermission = async () => {
        try {
            // Sprawdź uprawnienia do odczytu na urządzeniu
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Brak uprawnień do odczytu plików.');
                return null;
            }
        }catch (e){
            console.log(e)}
    }

    const saveArrayToFile = async (array, fileUri) => {
        try {
            await checkPermission()
            const fileUri = FileSystem.documentDirectory + 'Decks';
            // Konwertuj tablicę na format tekstowy
            const arrayText = JSON.stringify(array);

            // Zapisz tablicę do pliku
            await FileSystem.writeAsStringAsync(fileUri, arrayText);

            console.log('Tablica została zapisana do pliku.');
            return array
        } catch (error) {
            console.log('Wystąpił błąd podczas zapisywania tablicy do pliku:', error);
        }
    };

    const readArrayFromFile = async () => {
    try {
        await checkPermission()
        const fileUri = FileSystem.documentDirectory + 'Decks';

        // Odczytaj zawartość pliku
        const fileContent = await FileSystem.readAsStringAsync(fileUri);

        // Konwertuj tekst na tablicę
        const array = JSON.parse(fileContent);
        console.log('TABLICA ZOSTALA ODCZYTANA Z PLIKU')
        return array

    } catch (error) {
        console.log('Wystąpił błąd podczas odczytywania tablicy z pliku:', error);
        return null;
    }
}
    const changeDegree = async (word, known) => {
        try {
            const fileUri = FileSystem.documentDirectory + 'Decks';
            // Odczytaj zawartość pliku
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            // Konwertuj tekst na tablicę
            const array = JSON.parse(fileContent);
            if (known) {
                const verb = word.verb
                const meaning = word.meaning
                const example = word.example
                const degree = word.degree
                const id = word.id

                array[id] = {verb:verb, meaning:meaning, example:example, degree:degree + 1, id:id}

                console.log("DEGREE ZOSTAL DODANY")
            }
            await saveArrayToFile(array)
            return drawRandom();
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany stopnie', error);
            return null;
        }
    }

    const speak = (text) => {

        Speech.speak(text, {
        language: 'en-GB',
        voice: "en-gb-x-gbb-local" //spoko meski chyba najlepszy
        });
    };
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 11
        },
        contentContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '80%',
            flex: 3
        },
        wordContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#29253e',
            flex: 3
        },
        wordText: {
            fontSize: 40,
            color: '#b4a9ec',
        },
        meaningContainer: {
            borderWidth: 1,
            borderBottomWidth: isHighlighted ? 0 : 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#272338',
            flex: 2
        },
        meaningText: {
            display: isHighlighted ? 'none' : 'flex',
            fontSize: 30,
            marginLeft: '5%',
            marginRight: '5%',
            textAlign: 'center',
            color: '#b4a9ec',
        },
        exampleContainer: {
            borderWidth: 1,
            borderTopWidth: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#29253e',
            flex:2
        },
        exampleText: {
            display: isHighlighted ? 'none' : 'flex',
            fontSize: 25,
            textAlign: 'center',
            color: '#b4a9ec',
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            flex:1
        },
        redButton: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        },
        greenButton: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        },
        redButtonText: {
            fontSize: 30,
            color: '#c7a0a0',
            padding: 10,
        },
        greenButtonText: {
            fontSize: 30,
            color: '#a3d9a6',
            padding: 10,
        },
        sample: {
            backgroundColor: '#aaa',
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: 4,
            margin: 5,
            justifyContent: 'space-between'
        },
        sampleText: {
            fontSize: 20,
            margin: 5
        },
        iconStyle: {
            marginRight: '30%',

            margin: 30,
            padding: 20,
            fontSize: 20
        },
        knowledgeDegree: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingLeft: 5,
        },
    })

    if (word) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{word.verb}</Text>
                    <Text style={styles.knowledgeDegree}>Znajomość: {word.degree}</Text>
                    <TouchableOpacity style={styles.sample} onPress={() => speak(word.example)}>
                        <Text style={styles.sampleText}><FontAwesome5 name="play" style={styles.iconStyle}/>Speech example</Text>
                    </TouchableOpacity>
                </View>
                <TouchableHighlight underlayColor='#413e53' style={styles.meaningContainer} onPress={toggleHighlighted}>
                    <Text style={styles.meaningText}>{word.meaning}</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#413e53' style={styles.exampleContainer} onPress={toggleHighlighted}>
                    <Text style={styles.exampleText}>{word.example}</Text>
                </TouchableHighlight>
                <View style={styles.buttonsContainer}>
                    <LinearGradient
                        colors={['#581616', '#7d2424', '#581616']}
                        style={{ flex: 1 }}
                        >
                        <TouchableOpacity style={styles.redButton} onPress={async () => {
                            setIsHighlighted('none')
                            await changeDegree(word, false)
                        }
                        }>
                            <Text style={styles.redButtonText}>Nie znam</Text>
                        </TouchableOpacity>
                    </LinearGradient>


                    <LinearGradient
                        colors={['#104212', '#1d7221', '#104212']}
                        style={{ flex: 1 }}
                        >
                        <TouchableOpacity style={styles.greenButton} onPress={async () => {
                            setIsHighlighted('none')
                            await changeDegree(word, true)
                            }
                        }>
                            <Text style={styles.greenButtonText}>Znam</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>

    )
    } else {
        return (
            <View>
                <TouchableOpacity>
                    <Text onPress={() => {
                        iterowanie()
                    }
                    }>Rozpocznij</Text>
                </TouchableOpacity>
            </View>
            )
    }
}

export default Words