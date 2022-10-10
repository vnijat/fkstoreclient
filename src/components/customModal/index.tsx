import React from "react";
import { View } from "react-native";
import { Popup, } from "react-native-windows";
import CustomPressable from "../../components/customPressable";
import { Colors } from "../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import { getStyle } from "./style";

interface IaddOptionsModal {
    isShowModal: boolean;
    closeModal: () => void;
    isDissmissEnabled: boolean;
    children?: React.ReactNode;

}


const CustomModal = ({ children, isShowModal, closeModal, isDissmissEnabled }: IaddOptionsModal) => {
    const style = getStyle();

    return (
        <Popup
            isOpen={isShowModal}
            onDismiss={closeModal}
            isLightDismissEnabled={isDissmissEnabled || true}
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

export default CustomModal;