import { Alert } from "react-native";
import { Item } from "../types/ItemsQuery";

const modifieErrorMessage = (error: any) => {
    return error.data.message.reduce((errorObject: { [key: string]: string[]; }, message: string,) => {
        if (message) {
            const messageToArray = message.split(' ');
            const errorTitle = messageToArray.shift()!;
            if (!errorObject[errorTitle]) {
                errorObject[errorTitle] = [];
            }
            errorObject[errorTitle].push(messageToArray.join(' '));
        }
        return errorObject;
    }, {});
};


const modifyItemForEdit = (data: Item[], itemId: number) => {
    const itemForPost: any = {};
    const selectedItem: Item = data.filter(item => item.id === itemId)[0];
    for (let key in selectedItem) {
        const objectValue = selectedItem[key as keyof Item];
        const isObject = objectValue && typeof objectValue === 'object';
        if (isObject) {
            itemForPost[`${key}Id`] = objectValue.id.toString();
        } else {
            itemForPost[key] = isNaN(Number(objectValue)) ? objectValue : Number(objectValue).toString();
        }
    }
    return itemForPost;
};


const alertPromise = (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        Alert.alert(title, message, [
            { onPress: () => reject('cancelled') },
            { text: 'Cancel', onPress: () => reject('rejected'), style: 'cancel' },
            { text: 'Yes', onPress: () => resolve(true), style: 'destructive' }
        ]);

    });
};






const HELP = {
    modifieErrorMessage,
    modifyItemForEdit,
    alertPromise
};

export default HELP;