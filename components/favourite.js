import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import {View, Text} from "react-native";



export const addFavourite = async (word) => {

        try {

            const fileUri = FileSystem.documentDirectory + 'Favourite';
            // Odczytaj zawartość pliku
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            // Konwertuj tekst na tablicę
            const favourite = JSON.parse(fileContent);
            favourite.push(word)
            console.log(word.verb)
            // Zapisz tablicę do pliku
            // await FileSystem.writeAsStringAsync(fileUri, favourite);

            console.log('Tablica została zapisana do pliku.');
            // return array
        } catch (error) {
            console.log('Wystąpił błąd podczas zapisywania tablicy do pliku:', error);
        }

    }

const Favourite = () => {


    return (
        <View><Text>xd</Text></View>
    )

}

export default {Favourite, addFavourite}