import React, {useRef, useState} from "react";
import {Modal, StyleSheet, View} from "react-native";


interface ICustomContextMenu {
    /**
     * Custom Context Menu with View Wrapper position absolute fill parent view with zIndex
     * children React Node
     */
    children: React.ReactNode;
    /**
   * zIndex for absolute position default 1
   */
    zIndex?: number;

    disabled?: boolean;
}

const CustomContextMenu = ({children, zIndex, disabled}: ICustomContextMenu) => {
    const ref = useRef(null);
    const contextMenuOffset = useRef({verticalOffset: 0, horizontalOffset: 0}).current;
    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);

    const onTouchStart = ({nativeEvent}: any) => {
        const {isRightButton, locationX, locationY} = nativeEvent;
        if (isRightButton && !disabled) {
            setIsOpenContextMenu(true);
        }
    };

    const onDissmiss = () => {
        setIsOpenContextMenu(false);
    };

    return (
        <>
            <View style={[StyleSheet.absoluteFill, {zIndex: zIndex || 1, backgroundColor: 'transparent'}]}
                onTouchStart={onTouchStart}
            // tooltip={'*Click Right Mouse Button For Context Menu*'}
            />

            <Modal
                visible={isOpenContextMenu}
                onDismiss={onDissmiss}
            >
                {children}
            </Modal>
        </>

    );

};

export default CustomContextMenu;