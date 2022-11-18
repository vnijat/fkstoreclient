import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Flyout } from "react-native-windows";


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
}




const CustomContextMenu = ({ children, zIndex }: ICustomContextMenu) => {
    const ref = useRef(null);
    const contextMenuOffset = useRef({ verticalOffset: 0, horizontalOffset: 0 }).current;
    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);

    const onTouchStart = ({ nativeEvent }: any) => {
        const { isRightButton, locationX, locationY } = nativeEvent;
        if (isRightButton) {
            setIsOpenContextMenu(true);
            contextMenuOffset.horizontalOffset = locationX;
            contextMenuOffset.verticalOffset = locationY;
        }
    };

    const onDissmiss = () => {
        setIsOpenContextMenu(false);
    };

    return (
        <>
            <View style={[StyleSheet.absoluteFill, { zIndex: zIndex || 1, backgroundColor: 'transparent' }]}
                onTouchStart={onTouchStart}
                ref={ref} />

            <Flyout
                isOpen={isOpenContextMenu}
                target={ref.current}
                onDismiss={onDissmiss}
                showMode={'transient-with-dismiss-on-pointer-move-away'}
                verticalOffset={contextMenuOffset.verticalOffset}
                horizontalOffset={contextMenuOffset.horizontalOffset}
            >
                {children}
            </Flyout>
        </>

    );

};

export default CustomContextMenu;