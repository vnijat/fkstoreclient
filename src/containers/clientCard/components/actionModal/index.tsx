import React, { memo, useRef, useState } from "react";
import { Flyout, View } from "react-native-windows";
import CustomPressable from "../../../../components/customPressable";

interface IActionModal {
    children?: React.ReactNode;
    pressableComponent: React.ReactNode;

}


const ActionModal = ({ children, pressableComponent }: IActionModal) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const onPressButton = () => {
        setIsOpen(true);
    };


    return (
        <>
            <CustomPressable ref={ref}
                onPress={onPressButton}
                onHoverOpacity
                style={{ justifyContent: 'center', padding: 1 }}
            >
                {pressableComponent}
            </CustomPressable>
            <Flyout
                isOpen={isOpen}
                target={ref.current}
                placement={'bottom-edge-aligned-right'}
                showMode={'transient-with-dismiss-on-pointer-move-away'}
                onDismiss={() => setIsOpen(false)}
            >
                {children}
            </Flyout>
        </>

    );



};

export default memo(ActionModal);