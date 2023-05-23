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

    // useEffect(() => {
    //     readArrayFromFile();
    // }, []);
    const [isHighlighted, setIsHighlighted] = useState('none');
    const [word, setWord] = useState('');

    const toggleHighlighted = () => {
        setIsHighlighted(!isHighlighted);
    };

    const iterowanie = async () => {
        try {
            const array = []
            let i = 0
            for (const [key, value] of Object.entries(decks)) {
                i+=1
                array.push({verb:key, meaning:value[0], example:value[1], degree:0, id:i})
            }
            console.log("ITEROWANIE")
            await saveArrayToFile(array, 'Decks')
            const newArray = await readArrayFromFile()
            const newWord = await drawRandom(newArray);
            await setWord(newWord)
        } catch (e) {
            console.log('blad w iterowniu', e)
        }

    }

    const drawRandom = (array) => {
        try {
            // const random = Math.floor(Math.random() * array.length)
            const random = Math.floor(Math.random() * 3)

            console.log('DRAW RANDOm')
            return array[random]
        } catch (e) {
            console.log('blad w drawRandom', e)
        }
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

    const saveArrayToFile = async (array) => {
        try {
            // await checkPermission()
            const fileUri = FileSystem.documentDirectory + 'Decks';
            // Konwertuj tablicę na format tekstowy
            const arrayText = JSON.stringify(array);
            // Zapisz tablicę do pliku
            await FileSystem.writeAsStringAsync(fileUri, arrayText);

            console.log('Tablica została zapisana do pliku.');
            // return array
        } catch (error) {
            console.log('Wystąpił błąd podczas zapisywania tablicy do pliku:', error);
        }
    };

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

    const changeDegree = async (word, known) => {
        try {
            const fileUri = FileSystem.documentDirectory + 'Decks';

            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            const array = JSON.parse(fileContent);

            const updatedArray = array.map((item) => {
            if (item.id === word.id) {
                const updatedDegree = known ? item.degree + 1 : 0;
                return { ...item, degree: updatedDegree };
            }
            return item;
            });

            await saveArrayToFile(updatedArray);
            return updatedArray;
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany stopni:', error);
        return null;
        }
};
    const nextWord = async (word, known) => {
        const Array = await changeDegree(word, known);
        await drawRandom(Array);
        const newArray = await readArrayFromFile();
        const newWord = await drawRandom(newArray);
        await setWord(newWord)
    }

    const speak = (text) => {

        Speech.speak(text, {
        language: 'en-GB',
        voice: "en-gb-x-gbb-local" //spoko meski chyba najlepszy
        });
    };
    const dark = '#242129'
    const darkerDark = '#1d1b22'
    const darkText = '#9890a5'

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
            flex: 3,
            backgroundColor: darkerDark
        },
        wordContainer: {
            width: '90%',

            // borderColor: '#9890a5',
            // borderBottomWidth: 1,
            alignItems: 'center',
            // // backgroundColor: '#242129',
            backgroundColor: dark,
            justifyContent: 'center',
            flex: 3,

            paddingLeft: 10,
            paddingRight: 10,
            margin: 20,
            borderRadius: 32,
            elevation: 7,
            shadowColor: '#4d347d',
        },
        wordText: {
            fontSize: 40,
            color: darkText,
            textAlign: 'center',
        },
        meaningContainer: {
            // borderWidth: 1,
            borderColor: '#4d347d',
            borderWidth: isHighlighted ? 0 : 1,
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: dark,
            flex: 2,
            paddingLeft: 10,
            paddingRight: 10,
            margin: 20,
            borderRadius: 32,
            elevation: 7,
            shadowColor: '#4d347d',
        },
        meaningText: {
            display: isHighlighted ? 'none' : 'flex',
            fontSize: 25,
            marginLeft: '5%',
            marginRight: '5%',
            textAlign: 'center',
            // color: '#b4a9ec',
            color: darkText,
        },
        meaningDescription: {
            position: 'absolute',
            top: '5%',
        },
        exampleContainer: {
            borderWidth: isHighlighted ? 0 : 1,
            // borderTopWidth: 1,
            borderColor: '#4d347d',
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: dark,
            flex:2,
            paddingLeft: 10,
            paddingRight: 10,
            margin: 20,
            borderRadius: 32,
            shadowColor: '#4d347d',
            elevation: 7,
        },
        exampleText: {
            display: isHighlighted ? 'none' : 'flex',
            fontSize: 20,
            textAlign: 'center',
            color: darkText,
        },
        exampleDescription: {
            position: 'absolute',
            top: '5%',
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
            fontSize: 20,
            color: '#c7a0a0',
            padding: 10,
        },
        greenButtonText: {
            fontSize: 20,
            color: '#a3d9a6',
            padding: 10,
        },
        sample: {
            backgroundColor: '#4d347d',
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: 12,
            margin: 9,
            justifyContent: 'space-between'
        },
        sampleText: {
            fontSize: 15,
            margin: 5
        },
        iconStyle: {
            marginRight: '30%',
            margin: 30,
            padding: 20,
            fontSize: 15,
        },
        handIconStyle: {
            position: 'absolute',
            right: '8%',
            top: "41%",
            color: '#4d347d',
            fontSize: 35,
        },
        knowledgeDegree: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingLeft: 15,
            paddingBottom: 5,
        },
        start: {
            // backgroundColor: '#29253e',
            backgroundColor: 'white',
            flex: 11,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        startButton: {
            // overflow: 'visible',
            backgroundColor: '#b4a9ec',
            padding: 20,
            margin: 10,
            borderRadius: 10,
            shadowColor: 'red',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 5,
            elevation: 10,
        },
        startButtonText: {
            fontSize: 20,
            // color: '#e0daf8',
        }
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
                    <>
                        <Text style={styles.meaningText}>{word.meaning}</Text>
                        <Text style={styles.meaningDescription}>Znaczenie</Text>
                    </>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#413e53' style={styles.exampleContainer} onPress={toggleHighlighted}>
                    <>
                        <Text style={styles.exampleText}>{word.example}</Text>
                        <Text style={styles.exampleDescription}>Przykład</Text>
                    </>
                </TouchableHighlight>
                <FontAwesome5 name="hand-point-left" style={styles.handIconStyle} onPress={toggleHighlighted}/>
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
                            await nextWord(word, true)
                            console.log('next')
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
}

export default Words