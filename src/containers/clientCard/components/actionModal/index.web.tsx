import React, {memo, useRef, useState} from "react";
import CustomPressable from "../../../../components/customPressable";
import {Modal} from "react-native";

interface IActionModal {
    children?: React.ReactNode;
    pressableComponent: React.ReactNode;

}


const ActionModal = ({children, pressableComponent}: IActionModal) => {
    const [isOpen, setIsOpen] = useState(false);

    const onPressButton = () => {
        setIsOpen(true);
    };


    return (
        <>
            <CustomPressable
                onPress={onPressButton}
                onHoverOpacity
                style={{justifyContent: 'center', padding: 1}}
            >
                {pressableComponent}
            </CustomPressable>
            <Modal
                visible={isOpen}
                onDismiss={() => setIsOpen(false)}
            >
                {children}
            </Modal>
        </>

    );



};

export default memo(ActionModal);