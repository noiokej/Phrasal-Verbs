import {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image} from "react-native";
import * as Speech from "expo-speech";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
// import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import StartPage from "./start-page";
// import {useNavigation} from "@react-navigation/native";
import ThemeContext from "../context/themeContext";
import {addFavourite} from "./favourite";
import {checkPermission, checkFileExists, saveArrayToFile, readArrayFromFile} from "../utils/fileOperations"
import {dark, darkerDark, darkText, light, backgroudLight, lightButtonColor, lightTextInButton, purple} from "../utils/colors"


// make up zle
var json = require('../sorted_data.json'); //(with path)
const decks = json

const Words = ({ route }) => {

    const [isHighlighted, setIsHighlighted] = useState('none');
    const [word, setWord] = useState('');
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [array, setArray] = useState(null)


    const letter = route?.params?.letter;

    console.log(letter, 'arrayOOOOO')


    const toggleHighlighted = () => {
        setIsHighlighted(!isHighlighted);
    };

    const iterowanie = async () => {
        try {
            await checkPermission()

            if (await checkFileExists()) {
                console.log('istnieje')


            } else {
                console.log('nie istnieje')
                const array = []
                let i = 0
                for (const [key, value] of Object.entries(decks)) {
                    array.push({verb:key, meaning:value[0], example:value[1], degree:0, id:i, note:'', favourite:0})
                    i+=1
                    await saveArrayToFile(array, 'Decks')
                    console.log("ITEROWANIE")
                }
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
        // console.log(word, "WORDDD")
        try {
            // const random = Math.floor(Math.random() * array.length)
            if (letter) {
                // console.log(array[1], array[2], 'arr 1 i 2')
                // console.log(word, "WORD")
                // const firstEl = array.find(el => el.verb[0] === letter)
                // const lastEl = array.reverse().find(el => el.verb[0] === letter)
                const verbs = array.filter(el => el.verb[0] === letter)
                const firstEl = verbs[0].id
                const lastEl = verbs[verbs.length - 1].id

                let random = Math.floor(Math.random() * (lastEl - firstEl + 1)) + firstEl;

                if (firstEl !== lastEl) {
                    while (random === word?.id) {
                        random = Math.floor(Math.random() * (firstEl - lastEl + 1)) + lastEl;
                    }
                } else {
                    random = Math.floor(Math.random() * (firstEl - lastEl + 1)) + lastEl;
                }

                return array[random]

            } else {
                const random = Math.floor(Math.random() * 369)
                console.log('DRAW RANDOm')
                return array[random]
            }

        } catch (e) {
            console.log('blad w drawRandom', e)
        }
    }


    const changeDegree = async (word, known) => {
        try {

            // const fileUri = FileSystem.documentDirectory + 'Decks';
            //
            // const fileContent = await FileSystem.readAsStringAsync(fileUri);
            // const array = JSON.parse(fileContent);

            // console.log(array, "changedegree")

            const updatedArray = array.map((item) => {
            if (item.id === word.id) {
                const updatedDegree = known ? item.degree + 1 : item.degree;
                console.log(item, 'ITEM')
                console.log(known, 'known')
                return { ...item, degree: updatedDegree };
            }

            return item;
            });
            await saveArrayToFile(updatedArray);
            setArray(updatedArray)
            return updatedArray;
        } catch (error) {
            console.log('Wystąpił błąd podczas zmiany stopni:', error);
        return null;
        }
    };

        const changeFavourite = async (word) => {
            console.log('xd')
            try {
                console.log('zmiana fav')
                // const fileUri = FileSystem.documentDirectory + 'Decks';
                //
                // const fileContent = await FileSystem.readAsStringAsync(fileUri);
                // const array = JSON.parse(fileContent);

                // console.log(array, "changedegree")

                const updatedArray = array.map((item) => {
                if (item.id === word.id) {
                    const updatedFavourite = !item.favourite ;
                    console.log(item, 'ITEM')
                    return { ...item, favourite: updatedFavourite };
                }

                return item;
                });
                await saveArrayToFile(updatedArray);
                setArray(updatedArray)
                return updatedArray;
            } catch (error) {
                console.log('Wystąpił błąd podczas zmiany Favourite:', error);
            return null;
            }
    };




    const nextWord = async (word, known) => {
        await changeDegree(word, known);
        // await drawRandom(Array);
        const newArray = await readArrayFromFile();
        const newWord = await drawRandom(newArray, word);
        await setWord(newWord)
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
            margin: 20,
            borderRadius: 32,
            elevation: 7,
            shadowColor: '#4d347d',
        },
        wordText: {
            fontSize: 40,
            color: theme === 'dark' ? darkText : dark,
            textAlign: 'center',
            fontFamily: 'Montserrat',
        },
        meaningContainer: {
            // borderWidth: 1,
            borderColor: '#4d347d',
            borderWidth: isHighlighted ? 0 : 1,
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
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
            color: theme === 'dark' ? darkText : dark,
            fontFamily: 'Montserrat',
        },
        meaningDescription: {
            position: 'absolute',
            top: '5%',
            fontFamily: 'Montserrat',
        },
        exampleContainer: {
            borderWidth: isHighlighted ? 0 : 1,
            borderColor: '#4d347d',
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? dark : light,
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
            color: theme === 'dark' ? darkText : dark,
            fontFamily: 'Montserrat'
        },
        exampleDescription: {
            position: 'absolute',
            top: '5%',
            fontFamily: 'Montserrat',
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            flex:1,
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
            // backgroundColor: '#4d347d',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: 10,
            margin: 5,
            padding: 10
            // justifyContent: 'space-between'
        },
        // sampleText: {
        //     fontSize: 15,
        //     margin: 5,
        //     // color: theme === 'dark' ? 'black' : light
        //     // color: purple
        // },
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
        },
        notes: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 10,
            margin: 10,
            padding: 10
        }

    })

    if (word) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.wordContainer}>
                    <TouchableOpacity style={styles.notes} onPress={() => speak(word.verb)}>
                        <Image
                            source={require('../assets/note0.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.wordText}>{word.verb}</Text>
                    <Text style={styles.knowledgeDegree}>Znajomość: {word.degree} id: {word.id}</Text>
                    <TouchableOpacity style={styles.sample} onPress={() => speak(word.verb)}>
                        <Text><FontAwesome5 name="play" style={styles.iconStyle}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{
                        changeFavourite(word)
                        word.favourite = !word.favourite
                    }} style={styles.starIcon}>
                        {word.favourite?
                            <FontAwesome name="star" size={30} color={purple} />
                            :
                            <FontAwesome name="star-o" size={30} color="black" />
                        }

                    </TouchableOpacity>
                </View>
                <TouchableOpacity underlayColor={theme === 'dark' ? '#413e53' : backgroudLight} style={styles.meaningContainer} onPress={toggleHighlighted}>
                    <>
                        <Text style={styles.meaningText}>{word.meaning}</Text>
                        <Text style={styles.meaningDescription}>Znaczenie</Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity underlayColor={theme === 'dark' ? '#413e53' : backgroudLight} style={styles.exampleContainer} onPress={toggleHighlighted}>
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

                        style={{ flex: 1, borderRadius: 11, margin: 5 }}
                        >
                        <TouchableOpacity style={styles.redButton} onPress={async () => {
                            setIsHighlighted('none')
                            await nextWord(word, false)
                        }
                        }>
                            <Text style={styles.redButtonText}>Nie znam</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        colors={theme === 'dark' ? ['#104212', '#155518', '#104212'] : ['#147d18', '#1b9921', '#19841e']}
                        style={{ flex: 1, borderRadius: 11, margin: 5}}
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

                letter ? <StartPage
                iterowanie = {iterowanie}
                letter={letter}
                /> :
                <StartPage
                iterowanie = {iterowanie}

                />

        )

    }
}

export default Words