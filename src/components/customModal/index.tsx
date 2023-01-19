import React, { memo, useMemo, useRef, useState } from "react";
import { useWindowDimensions, View, Animated } from "react-native";
import { Popup, } from "react-native-windows";
import CustomPressable from "../../components/customPressable";
import { Colors } from "../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import { getStyle } from "./style";

interface ICustomModal {
    isShowModal: boolean;
    closeModal: () => void;
    isDissmissEnabled: boolean;
    children?: React.ReactNode;
    width?: number;
    borderColor?: string;

}


const CustomModal = ({ children, isShowModal, closeModal, isDissmissEnabled, width, borderColor }: ICustomModal) => {
    const style = useMemo(() => getStyle(width, borderColor), [width, borderColor]);
    return (
        <Popup
            isOpen={isShowModal}
            onDismiss={closeModal}
            isLightDismissEnabled={isDissmissEnabled ?? false}
        >
            <View style={{ flex: 1 }}>
                <CustomPressable onHoverOpacity onPress={closeModal} style={style.closeButton}>
                    <Icon name={'circle-with-cross'} size={22} color={Colors.DEFAULT_TEXT_COLOR} />
                </CustomPressable>
                <View style={style.modalContent}>
                    {children}
                </View>
            </View>
        </Popup >
    );


};

export default memo(CustomModal);