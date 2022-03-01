import React, { FC } from "react";
import { View } from "react-native";
import { Popup } from "react-native-windows";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/redux/store";
import { getStyle } from "./styles";


interface AddItemProps {
}

export const AddItem: FC<AddItemProps> = ({ }) => {
    const style = getStyle();
    const isOpen = useSelector((state: RootState) => state.appStateSlicer.isShowAddItemPopUp);

    return (
        <Popup isOpen={isOpen}  >
            <View style={style.container}>
            </View>
        </Popup>
    );
};