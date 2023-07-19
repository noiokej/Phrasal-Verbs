import {Text, View, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { readArrayFromFile } from "../utils/fileOperations";
import { purple} from "../utils/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    items: {
        paddingTop: 15,
        marginBottom: 10,
        fontFamily: 'Montserrat',
    },
    verb1: {
        fontWeight: 'bold',
        color: '#c88416',
        marginRight: 20,
    },
    verb2: {
        fontWeight: 'bold',
        marginRight: 20,
        color: '#c8b016',
    },
    verb3: {
        fontWeight: 'bold',
        marginRight: 20,
        color: '#bcc816',
    },
    verb4: {
        fontWeight: 'bold',
        marginRight: 20,
        color: '#6cc816',
    },
    verb5: {
        fontWeight: 'bold',
        marginRight: 20,
        color: '#1cc816',
    },
    meaning: {
        color: "#7b6f8b",
    },
    example: {
        color: "#483d56",
        fontStyle : "italic",
    },
    loading: {
        flex: 2,
    },
})

const KnownWords = () => {

    const [array, setArray] = useState(null)

    useEffect(() => {
        const fetchData = async () => {

            try {
                let arr = await readArrayFromFile()
                arr = arr.filter(x => x.degree > 0)
                arr.sort((a, b) => b.degree - a.degree)
                setArray(arr)

            } catch (error) {
                console.error('Wystąpił błąd:', error)
            }

        }
        fetchData()
    }, [])

    const renderItem = ({ item }) => {
        return (
         <Text style={styles.items}>
         <Text 
            style={item.degree === 1 ? styles.verb1 
                : item.degree === 2 ? styles.verb2 
                : item.degree === 3 ? styles.verb3 
                : item.degree === 4 ? styles.verb4 
                : item.degree === 5 ? styles.verb5 
                : ""}>
            {item.verb}   </Text>
         <Text style={styles.meaning}>{item.meaning}</Text>
         <Text style={styles.example}>{'\n'}{item.example}</Text>
         </Text>
         )
    }
    
    const keyExtractor = (_, index) => index.toString()

    return (
        <View style={styles.container}>
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
    )
}


export default KnownWords