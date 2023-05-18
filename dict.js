import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {FontAwesome5, FontAwesome} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient';


var json = require('./phrasalverbs.json'); //(with path)

const dict = json

// const [word, setWord] = useState(null)

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
    // console.log(array)
}

iterowanie()


const addKnowledgeDegree = (degree) => {
    console.log(degree, 'degree')
    console.log(typeof(degree), 'typeof')
    console.log(degree, ' slowo z degree')
    // return drawRandom()
}
  // _onPressButton() {
  //   Alert.alert('You tapped the button!');
  // }


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
        // backgroundColor: 'red',
        // flex: 1,
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
        // height: '53%',
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
        borderWidth: isHighlighted ? 2 : 4,
        borderBottomWidth: isHighlighted ? 0 : 2,
        // height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272338',
        flex: 2
    },
    meaningText: {
        // display: 'none',
        display: isHighlighted ? 'none' : 'flex',
        fontSize: 30,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center',
        color: '#b4a9ec',
    },
    exampleContainer: {
        // height: '10%',
        borderWidth: isHighlighted ? 2 : 4,
        borderTopWidth: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#29253e',
        flex:1
    },
    exampleText: {
        // display: 'none',
        display: isHighlighted ? 'none' : 'flex',
        fontSize: 25,
        textAlign: 'center',
        color: '#b4a9ec',
    },

    buttonsContainer: {
        // width: '100%',
        // height: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        flex:1
    },

    redButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#650404',
        width: '50%',
        // width: '50%',
        // height: '58%',
        // margin: '5%',
        // borderRadius: 4,
        elevation: 2,
    },

    greenButton: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#043907',
        width: '50%',
        //
        // shadowOffset: { width: 45, height: 40 },
        // shadowColor: 'black',
        // shadowOpacity: 1,
        // elevation: 3,
        // // background color must be set
        // backgroundColor : "#1234" // invisible color

        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 11,
        elevation: 3, // Ta właściwość jest wymagana na niektórych platformach Android
        backgroundColor: '#1234', // Domyślne tło przycisku
        borderRadius: 8,
        padding: 10,

    },
    redButtonText: {
        fontSize: 30,
        color: '#a18787',
    },
    greenButtonText: {
        fontSize: 30,
        color: '#a3d9a6',
        //   shadowOffset: { width: 10, height: 10 },
        //   shadowColor: 'black',
        //   shadowOpacity: 1,
        //   elevation: 3,
        //   // background color must be set
        //   backgroundColor : "#0000", // invisible color
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
        // backgroundColor: 'blue',
        margin: 30,
        padding: 20,
        fontSize: 20
    }
})

    const playSample = () => {

    }
    if (word) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{word.verb}</Text>
                    <TouchableOpacity style={styles.sample} onPress={playSample}>
                        <Text style={styles.sampleText}><FontAwesome5 name="play" style={styles.iconStyle}/>Speech example</Text>
                    </TouchableOpacity>
                </View>
                <TouchableHighlight underlayColor='gray' style={styles.meaningContainer} onPress={toggleHighlighted}>
                    <Text style={styles.meaningText}>{word.meaning}</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='gray' style={styles.exampleContainer} onPress={toggleHighlighted}>
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
                    <TouchableOpacity style={styles.redButton} onPress={() => {
                        addKnowledgeDegree(word)
                        drawRandom()
                        setIsHighlighted('none')
                        // this.forceUpdate()
                        }
                    }>
                        <Text style={styles.redButtonText}>Nie znam</Text>
                    </TouchableOpacity>


                    <LinearGradient
                        colors={['#ff0000', '#00ff00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}
                        >
                        <TouchableOpacity style={styles.greenButton} onPress={() => {
                            addKnowledgeDegree(word)
                            drawRandom()
                            setIsHighlighted('none')
                            // this.forceUpdate()
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
                    <Text onPress={drawRandom}>Rozpocznij</Text>
                </TouchableOpacity>
            </View>
            )


    }

}



export default Words