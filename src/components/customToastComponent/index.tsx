import {Text, View} from "react-native";
import {ToastProps} from "react-native-toast-notifications/lib/typescript/toast";
import {ToastVariants} from "../../types/toast";
import {Colors} from "../../utils/colors";
import {useMemo} from "react";
import {getStyle} from "./styles.";



export interface IToastData {
    title: string;
    message: string;
    type: ToastVariants;
}


export interface IToastOptions extends ToastProps {
    data: IToastData;
}

interface ICustomToastComponent {
    toastOptions: IToastOptions;
}

const CustomToastComponent = ({toastOptions}: ICustomToastComponent) => {
    const {data: {title = '', message, type}} = toastOptions;
    const style = useMemo(() => getStyle(), []);
    const BorderColors: {[k in ToastVariants]: string} = {
        'normal': Colors.CARD_COLOR,
        'success': Colors.COMPLETED_COLOR,
        'danger': Colors.INFRA_RED,
        'warning': Colors.INFRA_RED,
        'info': Colors.OLD_GOLD,
    };
    const toastTitle = !!title.length && !message.length ? type : title;
    const toasMessage = !!title.length && !message.length ? title : message;

    return (
        <View style={[style.toastContainer, {borderColor: BorderColors[type]}]}>
            <View style={style.toastTitleContainer}>
                <Text style={style.toastTitleText}>
                    {toastTitle.toUpperCase()}
                </Text>
            </View>
            <View style={style.toastMessageContainer}>
                <Text style={style.toastMessageText}>
                    {toasMessage.toUpperCase()}
                </Text>
            </View>
        </View>
    );
};


export default CustomToastComponent;