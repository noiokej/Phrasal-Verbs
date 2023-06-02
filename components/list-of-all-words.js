import {FlatList, Text, View} from "react-native";
import * as FileSystem from "expo-file-system";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import ThemeContext from "../context/themeContext";
import React from "react";

    const purple = '#4d347d'
    const darkLightText = '#9890a5'
    const light = '#dad0e8'
    const darkerDark = '#1d1b22'


const areEqual = (prevProps, nextProps) => true;

const ListOfAllWords = React.memo(({theme}) => {

    const [array, setArray] = useState(null)
    // const { theme, toggleTheme } = useContext(ThemeContext);

    const readArrayFromFile = async () => {
        try {
            // await checkPermission()
            const fileUri = FileSystem.documentDirectory + 'Decks';

            // Odczytaj zawartość pliku
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            // Konwertuj tekst na tablicę
            const parsedArray = JSON.parse(fileContent);

            console.log('TABLICA ZOSTALA ODCZYTANA Z PLIKU')
            setArray(parsedArray);
            return parsedArray

        } catch (error) {
            console.log('Wystąpił błąd podczas odczytywania tablicy z pliku:', error);
            return null;
        }
    }


    useEffect(() => {
        // console.log(array, "ARRAY")
        readArrayFromFile();
    }, []);



const styles = StyleSheet.create({
        container: {
            // flexDirection: array ? 'row': 'column',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            // padding: 10,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 20,
            overflow: 'hidden',
        },
        items: {
            paddingTop: 15,
            marginBottom: 10,

        },
        verb: {
            fontWeight: 'bold',
            marginRight: 20,
            color: purple
        },

        meaning: {
            // flex: 5,
            color: "#7b6f8b"

        },
        loading: {
            flex: 2,

        },
    })
useEffect(() => {
    // Ta funkcja zostanie wywołana po każdej aktualizacji komponentu
    console.log("Komponent został zaktualizowany");


    // Tutaj możesz umieścić kod, który ma być wykonany po aktualizacji komponentu

    // Jeśli chcesz wykonać jakieś działanie tylko przy zmianie konkretnej zmiennej,
    // możesz to określić jako drugi argument w tablicy zależności
    // np. useEffect(() => { ... }, [count]);

  });
    const renderItem = ({ item }) => {

           return (
            <Text style={styles.items}>
            <Text style={styles.verb}>{item.verb}   </Text>
            <Text style={styles.meaning}>{item.meaning}</Text>
            </Text>
            );

    };


    const keyExtractor = (_, index) => index.toString();


    return (
        <View style={styles.container}>

                <View>
                    {/*{array &&*/}
                    {/*array.map((item, index) => (*/}
                    {/*    <Text key={index} style={styles.items}>*/}
                    {/*        <Text style={styles.verb}>{item.verb}   </Text>*/}
                    {/*        <Text style={styles.meaning}>{item.meaning}</Text>*/}
                    {/*    </Text>*/}
                    {/*))}*/}
                    {array ? (
                        <FlatList
                            data={array}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                        />
                        ) : (
                            <View style={styles.loading}><ActivityIndicator size="large" color={purple} /></View>
                        )}
                </View>

            {/*{!array && <View style={styles.loading}><ActivityIndicator size="large" color={purple} /></View> }*/}

        </View>

)
}, areEqual)

// const areEqual = (prevProps, nextProps) => {
//     console.log(prevProps, nextProps, prevProps !== nextProps, prevProps.theme, nextProps.theme)
//
//     return true
// }

export default (ListOfAllWords)