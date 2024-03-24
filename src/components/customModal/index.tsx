import React, {memo, useMemo, useRef, useState} from "react";
import {useWindowDimensions, View, Animated, Modal, ModalBaseProps, Pressable, StyleSheet} from "react-native";
import CustomPressable from "../../components/customPressable";
import {Colors} from "../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import {getStyle} from "./style";

interface ICustomModal extends ModalBaseProps {
    isShowModal: boolean;
    closeModal: () => void;
    children?: React.ReactNode;
    width?: number;
    height?: number;
    borderColor?: string;

}


const CustomModal = ({children, isShowModal, closeModal, width, borderColor, height, ...rest}: ICustomModal) => {
    const style = useMemo(() => getStyle(width, height, borderColor), [width, borderColor, height]);
    return (
        <Modal
            visible={isShowModal}
            onDismiss={closeModal}
            transparent={true}
            animationType={'slide'}
            {...rest}
        >
            <Pressable style={[StyleSheet.absoluteFill]}
                onTouchStart={() => closeModal()}
            />
            <View style={style.modalContent}>
                {children}
            </View>
        </Modal >
    );


};

export default memo(CustomModal);