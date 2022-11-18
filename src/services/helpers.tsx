import React from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import { CompletedIcon, CorporateClientIcon, DeclinedIcon, IndividualClientIcon, InProgressIcon, VipIcon } from "../assets/icons/clientCardIcons";
import { IMultipleSelectData } from "../containers/customPicker/components/multipleSelectItem";
import { ClientType } from "../enums/clientType";
import { ProjectStatus } from "../enums/projectStatus";
import { IICON } from "../types/icon";
import { Item } from "../types/ItemsQuery";
import { Colors } from "../utils/colors";

const modifieErrorMessage = (error: any) => {
    return error.data.message.reduce((errorObject: { [key: string]: string[]; }, message: string,) => {
        if (!!message?.length) {
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


const modifyItemForEdit = (data: Item[] | Item, itemId: number) => {
    const itemForPost: any = {};
    const selectedItem: Item = Array.isArray(data) ? data.filter(item => item.id === itemId)[0] : data;
    for (let key in selectedItem) {
        const objectValue = selectedItem[key as keyof Item];
        const isObject = objectValue && typeof objectValue === 'object';
        if (isObject) {
            itemForPost[`${key}Id`] = objectValue.id.toString();
        } else {
            itemForPost[key] = !!(objectValue as string).length ? (isNaN(Number(objectValue)) ? objectValue : Number(objectValue).toString()) : objectValue;
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


const getNestedCategoriesIds = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, id } = curr;
        if (nested?.length) {
            acc = acc.concat(getNestedCategoriesIds(nested));
        }
        acc.push(id);
        return acc;
    }, [] as number[]);

};

const getNestedCategoriesForSelect = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, id, label, } = curr;
        if (nested?.length) {
            acc = acc.concat(getNestedCategoriesForSelect(nested));
        }
        acc.push({ id, label });
        return acc;
    }, [] as IMultipleSelectData[]);

};


const flatNestedCategories = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, ...rest } = curr;
        if (nested?.length) {
            acc = acc.concat(flatNestedCategories(nested));
        }
        acc.push(rest);
        return acc;
    }, [] as IMultipleSelectData[]);
};

const getClientTypeIcons = (type: ClientType, size?: number, color?: string) => {
    const style = StyleSheet.create({
        iconVipText: {
            fontSize: size ? (size * 0.2 | 0) : 10,
            fontWeight: '700',
            position: 'absolute',
            top: size ? size / 2 : 22,
            color: Colors.METALLIC_GOLD
        }
    });

    const ClientTypeIconOptions: IICON = {
        size: size || 50,
        color: color || Colors.CARD_COLOR
    };

    const IconVip = () => {
        return (
            <VipIcon {...ClientTypeIconOptions} />
        );
    };
    const clientTypeIcon = {
        [ClientType.INDIVIDUAL]: <IndividualClientIcon {...ClientTypeIconOptions} />,
        [ClientType.CORPORATE]: <CorporateClientIcon {...ClientTypeIconOptions} />,
        [ClientType.VIP]: <IconVip />
    };
    return clientTypeIcon[type];
};


const getProjectStatusIcons = (status: ProjectStatus, size?: number, color?: string) => {
    const icons = {
        [ProjectStatus.INPROGRESS]: <InProgressIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />,
        [ProjectStatus.COMPLETED]: <CompletedIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />,
        [ProjectStatus.DECLINED]: <DeclinedIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />
    };
    return icons[status];
};


const HELP = {
    modifieErrorMessage,
    modifyItemForEdit,
    alertPromise,
    flatNestedCategories,
    getNestedCategoriesIds,
    getNestedCategoriesForSelect,
    getClientTypeIcons,
    getProjectStatusIcons
};

export default HELP;