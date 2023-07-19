import {FlatList, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import React from "react";
import { readArrayFromFile } from "../utils/fileOperations";
import { purple } from "../utils/colors";

const areEqual = (prevProps, nextProps) => true

const ListOfAllWords = React.memo(({theme}) => {

    const [array, setArray] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const arr = await readArrayFromFile()
                setArray(arr)
            } catch (error) {
                console.error('Wystąpił błąd:', error)
            }            
        }
        fetchData()
        
    }, []);


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
        loading: {
            flex: 2,
        },
    })

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
        </View>

)
}, areEqual)

export default (ListOfAllWords)