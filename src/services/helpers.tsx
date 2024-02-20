import React from "react";
import {Alert, Text, View, StyleSheet, Platform} from "react-native";
import {CompletedIcon, CorporateClientIcon, DeclinedIcon, IndividualClientIcon, InProgressIcon, UnknownClientIcon, VipIcon} from "../assets/icons/clientCardIcons";
import {IMultipleSelectData} from "../containers/customPicker/components/multipleSelectItem";
import {ClientType} from "../enums/clientType";
import {ProjectStatus} from "../enums/projectStatus";
import {IICON} from "../types/icon";
import {Colors} from "../utils/colors";
import countries from 'i18n-iso-countries';
import {IsingelSelectData} from "../containers/customPicker";
import {Item} from "../types/item";
import {ToastVariants, toastVariants} from "../types/toast";
import {Toast} from "react-native-toast-notifications";
import {IToastData} from "../components/customToastComponent";
import {Role} from "../enums/userRole";
import store, {RootState} from "../modules/redux/store";
var Sound;
if (Platform.OS !== 'windows') {
    Sound = require('react-native-sound');
}

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/az.json'));
const countryobjects = countries.getNames('en', {select: 'official'});
const scanSignal = Platform.OS !== 'windows' ? new Sound('scan.mp3', Sound.MAIN_BUNDLE) : null;

const modifieErrorMessage = (error: any) => {
    return error.data.message.reduce((errorObject: {[key: string]: string[];}, message: string,) => {
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




const hasPermission = (canAccessRoles: Role[]) => {
    const currentUser = (store.getState() as RootState).user.user;
    if (!currentUser) {
        return false;
    }
    return canAccessRoles.some(role => role === currentUser.role);
};



const modifyItemForEdit = <T extends {[key: string]: any;}>(data: T[] | T, itemId?: number) => {
    const itemForPost: any = {};
    const selectedItem: T = Array.isArray(data) ? data.filter(item => item.id === itemId)[0] : data;
    for (let key in selectedItem) {
        const objectValue = selectedItem[key as keyof T];
        const isObject = objectValue && typeof objectValue === 'object';
        if (isObject) {
            itemForPost[`${key}Id`] = objectValue?.id?.toString();
        } else {
            itemForPost[key] = !!(objectValue as string)?.length ? ((isNaN(Number(objectValue)) || key === 'code') ? objectValue : Number(objectValue).toString()) : objectValue;
        }
    }
    return itemForPost;
};


const alertPromise = (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        Alert.alert(title, message, [
            {text: 'Cancel', onPress: () => reject('rejected'), style: 'cancel'},
            {text: 'Yes', onPress: () => resolve(true), style: 'destructive'},
        ], {onDismiss: () => reject('rejected')});

    });
};


const playScanSound = () => {
    if (scanSignal) scanSignal.play();
};

const getSlicesForPaginationPage = (currentPage: number, pageCount: number, show?: number) => {
    const maxToshow = show || 5;
    let diffFromMax = 2;
    let diff = pageCount! - currentPage;
    if (diff <= 2) {
        for (let i = maxToshow; diff >= 0; i--) {
            diff--;
            diffFromMax = i;
        }
    }
    const sliceStart = currentPage >= maxToshow ? currentPage - diffFromMax : 0;
    const sliceEnd = currentPage >= maxToshow ? currentPage + 3 : maxToshow;

    return {sliceStart, sliceEnd};
};



const getNestedCategoriesIds = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const {nested, id} = curr;
        if (!!nested?.length) {
            acc = acc.concat(getNestedCategoriesIds(nested));
        }
        !nested?.length && acc.push(id);
        return acc;
    }, [] as number[]);

};

const isNotSameValue = (value1: number | boolean | string, value2: number | boolean | string) => {
    if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
        return value1 !== value2;
    } else if (!(isNaN(Number(value1)) && isNaN(Number(value2)))) {
        return Number(value1) !== Number(value2);
    } else {
        return value1 !== value2;
    }
};

const getNestedDataValues = (tree: IsingelSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const {nested, value} = curr;
        if (nested?.length) {
            acc = acc.concat(getNestedDataValues(nested));
        }
        acc.push(value);
        return acc;
    }, [] as any[]);

};

const getNestedCategoriesForSelect = (tree: IMultipleSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const {nested, id, label, } = curr;
        if (!!nested?.length) {
            acc = acc.concat(getNestedCategoriesForSelect(nested));
        }
        acc.push({id, label, hasNested: !!nested?.length});
        return acc;
    }, [] as any[]);

};


const flatNestedCategories = (tree: IMultipleSelectData[] | IsingelSelectData[]) => {
    return tree?.reduce((acc, curr) => {
        const {nested, ...rest} = curr;
        if (nested?.length) {
            acc = acc.concat(flatNestedCategories(nested));
        }
        acc.push({...rest, hasNested: nested?.length});
        return acc;
    }, [] as IMultipleSelectData[] | IsingelSelectData[]);
};

const mapNestedForPicker = (tree: IsingelSelectData[]): IsingelSelectData[] => {
    return tree?.map((data) => ({label: data?.label, value: data.id ? data.id : data.value, nested: mapNestedForPicker(data?.nested!)}));
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

const alertError = (error?: {status: string, data: {message: string | string[];};}, title?: string, message?: string) => {
    const errorTitle = title || `Conflict Status Code  ${error?.status}` || '';
    const dataMessage = Array.isArray(error?.data.message) ? error?.data.message.join('*\n') : error?.data.message;
    const errorMessage = message || dataMessage || '';
    showToast('warning', errorMessage, errorTitle, 5000);
};

const showToast = (toastType: ToastVariants = 'normal', message: string, title?: string, duration?: number) => {
    const toastVariant = toastVariants.includes(toastType) ? toastType : 'normal';
    Toast.show('Custom Toast', {
        duration: duration || 3000,
        data: {
            title: title,
            message: message,
            type: toastVariant,
        } as IToastData
    });
};


/**
* @returns Text formatted to lower camelCase 
*/
const modifyTextForLangSelect = (text: string) => {
    const lowerCaseText = text.toLowerCase();
    const regExFindAfterSpace = new RegExp(/(?!^)\b\w/, 'gi');
    const regExfindSpaces = new RegExp(/\s/, 'gi');
    return lowerCaseText.replace(regExFindAfterSpace, (v) => v.toUpperCase()).replace(regExfindSpaces, '');
};


const getCountriesForPicker = () => Object.keys(countryobjects).map((key) => ({value: key, label: countryobjects[key]}));

const getUTCAddTZ = (date: Date) => {
    const minutsToMilliSeconds = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + minutsToMilliSeconds);
};

const getUTCSubTZ = (date: Date) => {
    const minutsToMilliSeconds = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - minutsToMilliSeconds);
};


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
    getNestedDataValues,
    alertError,
    isNotSameValue,
    getSlicesForPaginationPage,
    showToast,
    modifyTextForLangSelect,
    getUTCAddTZ,
    getUTCSubTZ,
    playScanSound,
    hasPermission
};

export default HELP;