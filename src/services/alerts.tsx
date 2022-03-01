import { Alert } from "react-native";

export const areYouSure = () => {
    return new Promise((resolve, reject) => {
        Alert.alert('Are you sure?', "you can't restore deleted items!", [
            { text: 'Cancel', onPress: () => reject('user cancelled') },
            { text: 'Yes Delete ', onPress: () => resolve('user aproved') }
        ]);
    });
};