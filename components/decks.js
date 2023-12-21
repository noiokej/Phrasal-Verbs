import {useContext, useRef, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as Speech from "expo-speech";
import {FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import StartPage from "./start-page";
import ThemeContext from "../context/themeContext";
import {checkFileExists, readArrayFromFile, saveArrayToFile} from "../utils/fileOperations"
import {backgroudLight, dark, darkerDark, darkText, light, purple,} from "../utils/colors"
import Modal from 'react-native-modal'
import {useNavigation} from "@react-navigation/native";

var json = require('../sorted_data.json') //(with path)
const decks = json

const Words = ({route}) => {

    const [isHighlighted, setIsHighlighted] = useState('none');
    const [word, setWord] = useState('');
    const {theme} = useContext(ThemeContext);
    const [array, setArray] = useState(null)
    const [isNoteVisible, setNoteVisible] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [reverse, setReverse] = useState(null)

    const noteInputRef = useRef(null)
    const letter = route?.params?.letter

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.goBack()
    };

    const handleSetReverse = () => {
        setReverse(!reverse)
    }

    const toggleHighlighted = () => {
        setIsHighlighted(!isHighlighted);
    };

    const iterowanie = async () => {
        try {
            if (await checkFileExists()) {
                console.log('Baza słów istnieje')
            } else {
                const array = []
                let i = 0
                for (const [key, value] of Object.entries(decks)) {
                    array.push({
                        verb: key,
                        meaning: value[0],
                        example: value[1],
                        degree: 0,
                        id: i,
                        note: '',
                        favourite: 0
                    })
                    i += 1
                }
                console.log('save')
                await saveArrayToFile(array, 'Decks')
            }
            const newArray = await readArrayFromFile()
            const newWord = await drawRandom(newArray);
            await setWord(newWord)
            await setArray(newArray)
        } catch (e) {
            console.log('blad w iterowniu', e)
        }
    }

    const drawRandom = (array, word) => {
        try {
            let random = null
            const draw = (tab) => {
                let availableEls = tab.filter(el => el.degree < 5)
                if (availableEls.length > 0) {
                    let index = Math.floor(Math.random() * availableEls.length)
                    random = availableEls[index].id
                    while (availableEls.length > 1 && random === word?.id) {
                        index = Math.floor(Math.random() * availableEls.length)
                        random = availableEls[index].id
                    }
                    return random
                } else {
                    console.log("kazdy element jest wiekszy od 5, zwraca 'brak'")
                    return 'brak'
                }
            }
            if (letter) {
                const verbs = array.filter(el => el.verb[0] === letter)
                random = draw(verbs)
            } else {
                random = draw(array)
            }
            if (random === "brak") {
                return random
            } else {
                return array[random]
            }

        } catch (e) {
            console.log('blad w drawRandom', e)
        }
    }


    const changeDegree = async (word, known) => {
        try {
            const updatedArray = array.map((item) => {
                if (item.id === word.id) {
                    const updatedDegree = known ? item.degree + 1 : item.degree
                    return {...item, degree: updatedDegree}
                }
                return item
            })
            await saveArrayToFile(updatedArray)
            setArray(updatedArray)
            return updatedArray
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany stopni:', error)
            return null
        }
    };

    const changeFavourite = async (word) => {
        try {
            const updatedArray = array.map((item) => {
                if (item.id === word.id) {
                    const updatedFavourite = !item.favourite
                    return {...item, favourite: updatedFavourite}
                }
                return item
            })
            await saveArrayToFile(updatedArray)
            setArray(updatedArray)
            return updatedArray
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany Favourite:', error)
            return null
        }
    }

    const changeNote = async (word, note) => {
        try {
            const updatedArray = array.map((item) => {
                if (item.id === word.id) {
                    return {...item, note: note}
                }
                return item
            })
            await saveArrayToFile(updatedArray);
            setArray(updatedArray)
            return updatedArray;
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany Note:', error);
            return null;
        }
    };


    const nextWord = async (word, known) => {
        await changeDegree(word, known);
        const newArray = await readArrayFromFile();
        const newWord = await drawRandom(newArray, word);
        await setWord(newWord)
    }

    const speak = (text) => {
        Speech.speak(text, {
            language: 'en-GB',
            voice: "en-gb-x-gbb-local"
        })
    }

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
            backgroundColor: theme === 'dark' ? darkerDark : backgroudLight
        },
        wordContainer: {
            width: '90%',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
            justifyContent: 'center',
            flex: 3,

            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 5,
            marginTop: 20,
            borderRadius: 32,
            elevation: 7,
            shadowColor: '#4d347d',
        },
        wordText: {
            fontSize: 31,
            color: theme === 'dark' ? darkText : dark,
            textAlign: 'center',
            fontFamily: 'Montserrat',
        },
        meaningContainer: {
            borderColor: '#4d347d',
            borderWidth: isHighlighted ? 0 : 1,
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
            flex: 2,
            paddingLeft: 10,
            paddingRight: 10,
            margin: 5,
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
            color: theme === 'dark' ? darkText : dark,
            fontFamily: 'Montserrat',
        },
        meaningDescription: {
            position: 'absolute',
            top: '5%',
            fontFamily: 'Montserrat',
            color: theme === 'dark' ? darkText : 'black',
        },
        exampleContainer: {
            borderWidth: isHighlighted ? 0 : 1,
            borderColor: '#4d347d',
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
            flex: 2,
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
            color: theme === 'dark' ? darkText : dark,
            fontFamily: 'Montserrat'
        },
        exampleDescription: {
            position: 'absolute',
            top: '5%',
            fontFamily: 'Montserrat',
            color: theme === 'dark' ? darkText : 'black',
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            borderRadius: 11,
        },
        redButton: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,

        },
        greenButton: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
        },
        redButtonText: {
            fontSize: 20,
            color: theme === 'dark' ? '#c7a0a0' : '#f1d7d7',
            padding: 10,
            fontFamily: 'Montserrat',
            fontWeight: "bold",
            letterSpacing: 2,
        },
        greenButtonText: {
            fontSize: 20,
            color: theme === 'dark' ? '#94cb97' : '#d3f6d5',
            padding: 10,
            fontFamily: 'Montserrat',
            fontWeight: "bold",
            letterSpacing: 2
        },
        sample: {
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: 10,
            margin: 5,
            padding: 10
        },
        iconStyle: {
            marginRight: '30%',
            margin: 30,
            padding: 20,
            fontSize: 20,
            color: purple
        },
        starIcon: {
            position: 'absolute',
            right: 20,
            top: 20,
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
            fontFamily: 'Montserrat',
            color: theme === 'dark' ? darkText : 'black'
        },
        notes: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 10,
            margin: 10,
            padding: 10
        },
        noteBox: {
            backgroundColor: light,
            height: '40%',
            borderRadius: 20,
            paddingBottom: 4
        },
        noteText: {
            margin: '1%',
            textAlign: 'center',
            flex: 4,
            backgroundColor: 'white',
            borderRadius: 20,
        },
        noteTextEdit: {
            margin: '1%',
            textAlign: 'center',
            flex: 4,
            backgroundColor: 'white',
            borderRadius: 20,
        },
        noteOption: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            borderRadius: 20,
            alignItems: 'center'
        },
        noteSave: {
            height: '90%',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: purple
        },
        noteCancel: {
            height: '90%',
            width: '30%',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#887aa1'
        },
        reverse: {},
        start: {
            backgroundColor: theme === 'dark' ? dark : light,
            flex: 11,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center"
        },
        startButton: {
            backgroundColor: purple,
            padding: 20,
            margin: 10,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 5,
            elevation: 10,
        },
        startButtonText: {
            fontSize: 20,
            color: light,
            fontFamily: 'Montserrat',
        },
        letter: {
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 30,
            fontFamily: 'Montserrat',
        },

    })

    if (word === 'brak') {
        return (
            <View style={styles.start}>
                {letter &&
                <>
                    <Text style={{fontFamily: 'Montserrat', textAlign: "center"}}>Nauczyłeś się wszystkich czasowników
                        frazowych na literę:</Text>
                    <Text style={styles.letter}>{letter}</Text>
                    <Text style={{fontFamily: 'Montserrat'}}>Wybierz inny zestaw:</Text>
                </>
                }
                <TouchableOpacity style={styles.startButton} onPress={navigateToHome}>
                    <Text style={styles.startButtonText}>Cofnij</Text>
                </TouchableOpacity>
            </View>
        )

    } else if (word) {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.wordContainer}>
                        <TouchableOpacity style={styles.notes} onPress={() => {
                            setNoteVisible(true)
                            setNoteText(word.note)
                        }}>
                            {word.note ?
                                <Image
                                    source={require(`../assets/note1.png`)}
                                    style={{width: 30, height: 30}}
                                />
                                :
                                <Image
                                    source={require(`../assets/note0.png`)}
                                    style={{width: 30, height: 30}}
                                />
                            }

                        </TouchableOpacity>
                        <Text style={styles.wordText}>{reverse ? word.verb : word.meaning}</Text>
                        <Text style={styles.knowledgeDegree}>Znajomość: {word.degree} id: {word.id}</Text>
                        {reverse ?
                            <TouchableOpacity style={styles.sample} onPress={() => speak(word.verb)}>
                                <Text><FontAwesome5 name="play" style={styles.iconStyle}/></Text>
                            </TouchableOpacity>
                            : null}

                        <TouchableOpacity style={styles.starIcon}
                                          onPress={() => {
                                              changeFavourite(word)
                                              word.favourite = !word.favourite
                                          }}>
                            {word.favourite ?
                                <FontAwesome name="star" size={30} color={purple}/>
                                :
                                <FontAwesome name="star-o" size={30} color={theme === 'dark' ? purple : 'black'}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.reverse} onPress={handleSetReverse}><Ionicons name="swap-vertical"
                                                                                                  size={33}
                                                                                                  color={purple}/></TouchableOpacity>
                    <TouchableOpacity
                        underlayColor={theme === 'dark' ? '#413e53' : backgroudLight}
                        style={styles.meaningContainer}
                        onPress={toggleHighlighted}>
                        <>
                            <Text style={styles.meaningText}>{reverse ? word.meaning : word.verb}</Text>
                            <Text style={styles.meaningDescription}>Znaczenie</Text>
                            {!reverse && !isHighlighted ?
                                <TouchableOpacity style={styles.sample} onPress={() => speak(word.verb)}>
                                    <Text><FontAwesome5 name="play" style={styles.iconStyle}/></Text>
                                </TouchableOpacity>
                                : null}
                        </>
                    </TouchableOpacity>
                    <TouchableOpacity
                        underlayColor={theme === 'dark' ? '#413e53' : backgroudLight}
                        style={styles.exampleContainer}
                        onPress={toggleHighlighted}>
                        <>
                            <Text style={styles.exampleText}>{word.example}</Text>
                            <Text style={styles.exampleDescription}>Przykład</Text>
                            {!isHighlighted &&
                            <TouchableOpacity style={styles.sample} onPress={() => speak(word.example)}>
                                <Text><FontAwesome5 name="play" style={styles.iconStyle}/></Text>
                            </TouchableOpacity>
                            }
                        </>
                    </TouchableOpacity>
                    <FontAwesome5 name="hand-point-left" style={styles.handIconStyle} onPress={toggleHighlighted}/>
                    <View style={styles.buttonsContainer}>
                        <LinearGradient
                            colors={theme === 'dark' ? ['#581616', '#7d2424', '#581616'] : ['#a01b1b', '#b43a3a', '#9c1717']}
                            style={{flex: 1, borderRadius: 11, margin: 5}}
                        >
                            <TouchableOpacity style={styles.redButton} onPress={async () => {
                                setIsHighlighted('none')
                                await nextWord(word, false)
                            }}>
                                <Text style={styles.redButtonText}>Nie znam</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient
                            colors={theme === 'dark' ? ['#104212', '#155518', '#104212'] : ['#147d18', '#1b9921', '#19841e']}
                            style={{flex: 1, borderRadius: 11, margin: 5}}
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
                <Modal
                    isVisible={isNoteVisible}
                    onBackdropPress={() => setNoteVisible(false)}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={400}
                    animationOutTiming={500}
                    backdropTransitionInTiming={100}
                    backdropTransitionOutTiming={100}
                >
                    <View style={styles.noteBox}>
                        <TextInput
                            ref={noteInputRef}
                            style={styles.noteTextEdit}
                            placeholder={`Dodaj notatkę do słowa "${word.verb}"`}
                            onChangeText={setNoteText}
                            value={noteText}
                        />

                        <View style={styles.noteOption}>
                            <TouchableOpacity
                                style={styles.noteCancel}
                                onPress={() => setNoteVisible(false)}
                            >
                                <Text style={{color: '#887aa1'}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.noteSave}
                                onPress={() => {
                                    changeNote(word, noteText)
                                    word.note = noteText
                                    setNoteText(word.note)
                                    // setNoteVisible(false)
                                }}
                            >
                                <Text style={{color: purple}}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Modal>
            </View>
        )
    } else {
        return (
            letter ? <StartPage
                    iterowanie={iterowanie}
                    letter={letter}
                /> :
                <StartPage
                    iterowanie={iterowanie}
                />
        )
    }
}

export default Words
