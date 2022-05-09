import React, { FC, useMemo } from "react";
import { Text, View } from "react-native";
import { Flyout, Popup, useWindowDimensions } from "react-native-windows";
import { Colors } from "../../utils/colors";
import { PrimaryButton } from "../primaryButton";



interface IAlertModal {
    isShowAlert: boolean;
    title: string;
    description?: string;
    declineText: string;
    approveText: string;
    onDecline: () => void;
    onApprove: () => void;
}

export const AlertModal: FC<IAlertModal> = ({ isShowAlert, title, description, declineText, approveText, onApprove, onDecline, }) => {

    return (
        <Flyout
            isOpen={isShowAlert}
            isLightDismissEnabled={false}
            placement={'full'}
        >
            <View style={{ height: 200, width: 300, borderRadius: 3, backgroundColor: Colors.ALABASTER, justifyContent: 'space-evenly' }}>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    <Text>{description}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <PrimaryButton onPress={onApprove} title={approveText} />
                    <PrimaryButton onPress={onDecline} title={declineText} />
                </View>
            </View>
        </Flyout >
    );

};