import React from 'react';
import Icon from "react-native-vector-icons/Entypo";
import { IICON } from '../../types/icon';



export const ItemsIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="list" size={size} color={color} />
    );
};

export const ClientsIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="users" size={size} color={color} />
    );
};

export const OrdersIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="open-book" size={size} color={color} />
    );
};

export const PurchasesIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="credit" size={size} color={color} />
    );
};

export const AddItemIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="add-to-list" size={size} color={color} />
    );
};

export const DefaultMenuIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="layers" size={size} color={color} />
    );
};