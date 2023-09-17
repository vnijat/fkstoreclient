import { RouteProp, useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, View, Text } from "react-native";
import { CameraScreen } from "react-native-camera-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RouteNames } from "../../../enums/routes";
import { useGetItemQuery } from "../../../modules/api/apiSlice";
import { RootState } from "../../../modules/redux/store";
import { BottomTabMobileStack } from "../../../types/navigation";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";
import { regExPatterns } from "../../../utils/validation";
import CustomPressable from "../../../components/customPressable";
import HELP from "../../../services/helpers";
import { trigger } from "react-native-haptic-feedback";


const ScanView = () => {
    const { params: { isFromOrder, isFromPurchase, addScannedProductToOrder } = {} } = useRoute<RouteProp<BottomTabMobileStack, RouteNames.SCAN>>();
    const [alerted, setAlerted] = useState(false);
    const productCountOnActiveOrder = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost?.orderItems?.length);
    const [lastScannedBarcode, setLastScannedBarcode] = useState('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const isFoucused = useIsFocused();

    useFocusEffect(useCallback(() => {
        return () => navigation.setParams({ isFromOrder: false, isFromPurchase: false });
    }, [isFromOrder, isFromPurchase]));

    const onReadBarcode = async (event: any) => {
        const regEx = new RegExp(regExPatterns.IS_BARCODE, 'g');
        const codeFromScan = event.nativeEvent.codeStringValue;
        if (regEx.test(codeFromScan)) {
            if (lastScannedBarcode === codeFromScan) { return; }
            trigger('notificationSuccess')
            HELP.playScanSound();
            if (isFromOrder && addScannedProductToOrder) {
                await addScannedProductToOrder(codeFromScan);
                setLastScannedBarcode(codeFromScan);
            } else {
                setLastScannedBarcode('');
                navigation.navigate('Info', { barcode: codeFromScan });
            }
        } else {
            if (!alerted) {
                trigger('notificationError')
                Alert.alert("Wrong Barcode Type:", `Barcode Type Is Not Correct`, [
                    { onPress: () => { setAlerted(false); } }
                ]);
                setLastScannedBarcode('');
                setAlerted(true);
            }
        }
    };


    const onPressOrdersCount = () => {
        const route = isFromOrder ? RouteNames.ORDERS : RouteNames.PURCHASES;
        navigation.navigate(route);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            {isFromOrder && productCountOnActiveOrder &&
                <CustomPressable
                    android_ripple={{ color: Colors.METALLIC_GOLD, radius: 25, }}
                    onPress={onPressOrdersCount}
                    style={{ position: 'absolute', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', top: 20, zIndex: 3, left: 10 }}>
                    < View style={{ position: 'absolute', width: 20, height: 20, borderRadius: 20, backgroundColor: Colors.METALLIC_GOLD, justifyContent: 'center', alignItems: 'center', top: -5, zIndex: 4, alignSelf: 'center', }}>
                        <Text style={{ color: Colors.CARD_COLOR, fontSize: FONT.FONT_SIZE_SMALL, fontWeight: FONT.FONT_BOLD, textAlign: 'center', }} adjustsFontSizeToFit>
                            {`${productCountOnActiveOrder}`}
                        </Text>
                    </View>
                    <MIcon name={'basket-plus'} size={40} color={Colors.CARD_COLOR} />
                </CustomPressable>
            }
            {
                isFoucused && < CameraScreen
                    scanBarcode={true}
                    onReadCode={onReadBarcode}
                    showFrame={true}
                    laserColor={Colors.INFRA_RED}
                    frameColor={Colors.METALLIC_GOLD}
                    focusMode={'on'}
                />
            }
        </SafeAreaView >
    );
};

export default ScanView;