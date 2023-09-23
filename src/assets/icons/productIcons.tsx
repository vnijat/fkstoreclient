import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IICON } from "../../types/icon";
import { Colors } from "../../utils/colors";

export const BarcodeIcon = ({ size, color }: IICON) => {
    return (
        <MIcon name={'barcode'} size={size || 18} color={color || Colors.DEFAULT_TEXT_COLOR} />
    );
};







