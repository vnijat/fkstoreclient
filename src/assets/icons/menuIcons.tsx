import React from 'react';
import Icon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IICON } from '../../types/icon';



export const WarehouseIcon = ({ size, color }: IICON) => {
    return (
        <MIcon name="warehouse" size={size} color={color} />
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

export const ProjectsIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="suitcase" size={size} color={color} />
    );
};