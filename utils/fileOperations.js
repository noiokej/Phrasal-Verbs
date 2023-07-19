// import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";

// export const checkPermission = async () => {
//         try {
//             // Sprawdź uprawnienia do odczytu na urządzeniu
//             let {status} = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Brak uprawnień do odczytu plików.');
//                 return null;
//             }
//         }catch (e){
//             console.log(e)}
//     }

export const checkFileExists = async () => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'Decks')
            return fileInfo.exists

        } catch (error) {
            console.error('Błąd podczas sprawdzania pliku:', error)
        }
    }

export const saveArrayToFile = async (array) => {
        try {
            // await checkPermission()
            const fileUri = FileSystem.documentDirectory + 'Decks'
            // Konwertuj tablicę na format tekstowy
            // array.sort((a, b) => b.id - a.id)
            const arrayText = JSON.stringify(array)
            // Zapisz tablicę do pliku
            await FileSystem.writeAsStringAsync(fileUri, arrayText)

            console.log('Tablica została zapisana do pliku.')
            // return array
        } catch (error) {
            console.log('Wystąpił błąd podczas zapisywania tablicy do pliku:', error)
        }
    }

export const readArrayFromFile = async () => {
    try {
        // await checkPermission()
        const fileUri = FileSystem.documentDirectory + 'Decks'

        // Odczytaj zawartość pliku
        const fileContent = await FileSystem.readAsStringAsync(fileUri)

        // Konwertuj tekst na tablicę
        const array = JSON.parse(fileContent)
        console.log('TABLICA ZOSTALA ODCZYTANA Z PLIKU')
        return array

    } catch (error) {
        console.log('Wystąpił błąd podczas odczytywania tablicy z pliku:', error)
        return null
    }
}

