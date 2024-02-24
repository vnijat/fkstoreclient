import React, {memo, useMemo, useRef, useState} from "react";
import {useWindowDimensions, View, Animated, Modal} from "react-native";
import CustomPressable from "../customPressable";
import {Colors} from "../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import {getStyle} from "./style";

interface ICustomModal {
    isShowModal: boolean;
    closeModal: () => void;
    isDissmissEnabled?: boolean;
    children?: React.ReactNode;
    width?: number;
    borderColor?: string;

}


const CustomModal = ({children, isShowModal, closeModal, isDissmissEnabled, width, borderColor}: ICustomModal) => {
    const style = useMemo(() => getStyle(width, borderColor), [width, borderColor]);
    return (
        <Modal
            visible={isShowModal}
            onDismiss={closeModal}
        >
            <View style={{flex: 1}}>
                <CustomPressable onHoverOpacity onPress={closeModal} style={style.closeButton}>
                    <Icon name={'circle-with-cross'} size={22} color={Colors.DEFAULT_TEXT_COLOR} />
                </CustomPressable>
                <View style={style.modalContent}>
                    {children}
                </View>
            </View>
        </Modal >
    );


};

export default memo(CustomModal);