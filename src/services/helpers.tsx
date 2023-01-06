import React from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import { CompletedIcon, CorporateClientIcon, DeclinedIcon, IndividualClientIcon, InProgressIcon, UnknownClientIcon, VipIcon } from "../assets/icons/clientCardIcons";
import { IMultipleSelectData } from "../containers/customPicker/components/multipleSelectItem";
import { ClientType } from "../enums/clientType";
import { ProjectStatus } from "../enums/projectStatus";
import { IICON } from "../types/icon";
import { Item } from "../types/ItemsQuery";
import { Colors } from "../utils/colors";
import countries from 'i18n-iso-countries';
import { IsingelSelectData } from "../containers/customPicker";

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/az.json'));
const countryobjects = countries.getNames('en', { select: 'official' });

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





const modifyItemForEdit = (data: any[] | any, itemId?: number) => {
    const itemForPost: any = {};
    const selectedItem: Item = Array.isArray(data) ? data.filter(item => item.id === itemId)[0] : data;
    for (let key in selectedItem) {
        const objectValue = selectedItem[key as keyof Item];
        const isObject = objectValue && typeof objectValue === 'object';
        if (isObject) {
            itemForPost[`${key}Id`] = objectValue?.id?.toString();
        } else {
            itemForPost[key] = !!(objectValue as string).length ? ((isNaN(Number(objectValue)) || key === 'code') ? objectValue : Number(objectValue).toString()) : objectValue;
        }
    }
    return itemForPost;
};


const alertPromise = (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        Alert.alert(title, message, [
            { text: 'Cancel', onPress: () => reject('rejected'), style: 'cancel' },
            { text: 'Yes', onPress: () => resolve(true), style: 'destructive' },
        ], { onDismiss: () => reject('rejected') });

    });
};



const getNestedCategoriesIds = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, id } = curr;
        if (!!nested?.length) {
            acc = acc.concat(getNestedCategoriesIds(nested));
        }
        !nested?.length && acc.push(id);
        return acc;
    }, [] as number[]);

};

const getNestedDataValues = (tree: IsingelSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, value } = curr;
        if (nested?.length) {
            acc = acc.concat(getNestedDataValues(nested));
        }
        acc.push(value);
        return acc;
    }, [] as any[]);

};

const getNestedCategoriesForSelect = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, id, label, } = curr;
        if (!!nested?.length) {
            acc = acc.concat(getNestedCategoriesForSelect(nested));
        }
        acc.push({ id, label, hasNested: !!nested?.length });
        return acc;
    }, [] as any[]);

};


const flatNestedCategories = (tree: IMultipleSelectData[] | IsingelSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const { nested, ...rest } = curr;
        if (nested?.length) {
            acc = acc.concat(flatNestedCategories(nested));
        }
        acc.push({ ...rest, hasNested: nested?.length });
        return acc;
    }, [] as IMultipleSelectData[] | IsingelSelectData[]);
};

const mapNestedForPicker = (tree: IsingelSelectData[]): IsingelSelectData[] => {
    return tree?.map((data) => ({ label: data?.label, value: data.id ? data.id : data.value, nested: mapNestedForPicker(data?.nested!) }));
};

const getClientTypeIcons = (type: ClientType, size?: number, color?: string) => {

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
        [ClientType.VIP]: <IconVip />,
        default: <UnknownClientIcon {...ClientTypeIconOptions} />
    };
    return clientTypeIcon[type] ?? clientTypeIcon['default'];
};


const getProjectStatusIcons = (status: ProjectStatus, size?: number, color?: string) => {
    const icons = {
        [ProjectStatus.INPROGRESS]: <InProgressIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />,
        [ProjectStatus.COMPLETED]: <CompletedIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />,
        [ProjectStatus.DECLINED]: <DeclinedIcon size={size || 30} color={color || Colors.METALLIC_GOLD} />
    };
    return icons[status];
};

const getCountriesForPicker = () => Object.keys(countryobjects).map((key) => ({ value: key, label: countryobjects[key] }));


const HELP = {
    modifieErrorMessage,
    modifyItemForEdit,
    alertPromise,
    flatNestedCategories,
    getNestedCategoriesIds,
    getNestedCategoriesForSelect,
    getClientTypeIcons,
    getProjectStatusIcons,
    getCountriesForPicker,
    mapNestedForPicker,
    getNestedDataValues
};

export default HELP;