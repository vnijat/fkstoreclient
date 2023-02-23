import React from "react";
import Toast, { BaseToast, ErrorToast, InfoToast, ToastConfigParams } from "react-native-toast-message";
import { ToastConfigType } from "../../types/toast";
import { Colors } from "../../utils/colors";
import FONT from "../../utils/font";




const ToastConfig: ToastConfigType = {

    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderColor: Colors.COMPLETED_COLOR, borderWidth: 1 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: FONT.FONT_SIZE_MEDIUM,
                fontWeight: FONT.FONT_BOLD,
                fontFamily: FONT.FONT_FAMILY
            }}
            text2Style={{
                fontSize: FONT.FONT_SIZE_SMALL,
                fontFamily: FONT.FONT_FAMILY
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderColor: Colors.INFRA_RED, borderWidth: 1 }}
            text1Style={{
                fontSize: FONT.FONT_SIZE_MEDIUM,
                fontWeight: FONT.FONT_BOLD,
                fontFamily: FONT.FONT_FAMILY
            }}
            text2Style={{
                fontSize: FONT.FONT_SIZE_SMALL,
                fontFamily: FONT.FONT_FAMILY
            }}
        />
    ),
    info: (props) => (
        <InfoToast
            {...props}
            style={{ borderColor: Colors.METALLIC_GOLD, borderWidth: 1 }}
            text1Style={{
                fontSize: FONT.FONT_SIZE_MEDIUM,
                fontWeight: FONT.FONT_BOLD,
                fontFamily: FONT.FONT_FAMILY
            }}
            text2Style={{
                fontSize: FONT.FONT_SIZE_SMALL,
                fontFamily: FONT.FONT_FAMILY
            }}
        />
    )

};

export default ToastConfig;