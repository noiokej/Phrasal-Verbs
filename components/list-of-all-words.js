import {Text, View} from "react-native";
import * as FileSystem from "expo-file-system";
import {useEffect, useState} from "react";
import {StyleSheet, ScrollView, ActivityIndicator} from "react-native";



const ListOfAllWords = () => {

    const [array, setArray] = useState(null)

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
    const saveArray = async () => {
        await readArrayFromFile()
            .then((array) => {
                setArray(array)
                console.log(array[2], 'xDDDDDDDDDDDDDDDDDDDDDD')
            })
            .catch((error) => {
                // Obsługa błędu
                console.error(error);
            });
    }

    useEffect(() => {
        saveArray()
    },[])

    const purple = '#4d347d'
    const styles = StyleSheet.create({
        container: {
            flexDirection: array ? 'row': 'column',
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
        },

        meaning: {
            // flex: 5,
            width: '69%',
        },
        loading: {
            flex: 2,

        },

    })

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    {array &&
                    array.map((item, index) => (
                        <Text key={index} style={styles.items}>
                            <Text style={styles.verb}>{item.verb}   </Text>
                            <Text>{item.meaning}</Text>
                        </Text>
                    ))}
                </View>
            </ScrollView>
            {!array && <View style={styles.loading}><ActivityIndicator size="large" color={purple} /></View> }

        </View>

)
}


export default ListOfAllWords