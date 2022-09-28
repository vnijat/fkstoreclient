import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { IICON } from "../../types/icon";

export const FilterByIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="funnel" size={size} color={color} />
    );
};


export const ClearIcon = ({ size, color }: IICON) => {
    return (
        <Icon name="eraser" size={size} color={color} />
    );
};