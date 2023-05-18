import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {FontAwesome5, FontAwesome} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

var json = require('./phrasalverbs.json'); //(with path)

const dict = json

const Verb = () => {
    return(
        <>
            {/*{array.map(el => el.verb + "  " + el.meaning + '\n\n')}*/}
            {/*{array.map(el => <Page verb="" meaning="" example=""/>)}*/}
        </>
    )
}

const array = []
const iterowanie = () => {
    for (const [key, value] of Object.entries(dict)) {
        // console.log(key, value[0]);
        array.push({verb:key, meaning:value[0], example:value[1]})
    }
}

iterowanie()

const addKnowledgeDegree = (degree) => {
    console.log(degree, 'degree')
    console.log(typeof(degree), 'typeof')
    console.log(degree, ' slowo z degree')
}


const Words = () => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [word, setWord] = useState(array[1]);

    const toggleHighlighted = () => {
        setIsHighlighted(!isHighlighted);
    };

    const drawRandom = () => {
        const random = Math.floor(Math.random() * array.length)
        setWord(array[random])
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
        flex:1
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
})

    const speak = (text) => {
        Speech.speak(text, {
        language: 'en',
        voice: "com.apple.speech.synthesis.voice.Fred",
        });
    };

    if (word) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{word.verb}</Text>
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
                    {/*<Button*/}
                    {/*      onPress={() => {*/}
                    {/*        console.log('You tapped the button!');*/}
                    {/*        styles.meaningText.backgroundColor = 'green'*/}
                    {/*      }}*/}
                    {/*      title="Press Me"*/}
                    {/*    />*/}

                    <LinearGradient
                        colors={['#581616', '#7d2424', '#581616']}
                        style={{ flex: 1 }}
                        >
                        <TouchableOpacity style={styles.redButton} onPress={() => {
                            addKnowledgeDegree(word)
                            drawRandom()
                            setIsHighlighted('none')
                            console.log(array.indexOf(word), 'TOOOOOO')
                        }
                        }>
                            <Text style={styles.redButtonText}>Nie znam</Text>
                        </TouchableOpacity>
                    </LinearGradient>


                    <LinearGradient
                        colors={['#104212', '#1d7221', '#104212']}
                        style={{ flex: 1 }}
                        >
                        <TouchableOpacity style={styles.greenButton} onPress={() => {
                            addKnowledgeDegree(word)
                            drawRandom()
                            setIsHighlighted('none')
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
                    <Text onPress={() => drawRandom()}>Rozpocznij</Text>
                </TouchableOpacity>
            </View>
            )
    }
}


export default Words