import {Text, View, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { readArrayFromFile } from "../utils/fileOperations";
import { purple } from "../utils/colors";

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
    verb: {
        fontWeight: 'bold',
        marginRight: 20,
        color: purple,
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

const Favourite = () => {

    const [array, setArray] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let arr = await readArrayFromFile()
                arr = arr.filter(x => x.favourite === true)
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
            <Text style={styles.verb}>{item.verb}   </Text>
            <Text style={styles.meaning}>{item.meaning}</Text>
            <Text style={styles.example}>{'\n'}{item.example}</Text>
         </Text>
         );
    };
    
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


export default Favourite