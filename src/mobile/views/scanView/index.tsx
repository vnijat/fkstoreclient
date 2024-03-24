import {RouteProp, useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Alert, View, Text, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {RouteNames} from "../../../enums/routes";
import {useGetItemQuery} from "../../../modules/api/apiSlice";
import {RootState} from "../../../modules/redux/store";
import {BottomTabMobileStack} from "../../../types/navigation";
import {Colors} from "../../../utils/colors";
import FONT from "../../../utils/font";
import {regExPatterns} from "../../../utils/validation";
import CustomPressable from "../../../components/customPressable";
import HELP from "../../../services/helpers";
import {trigger} from "react-native-haptic-feedback";
import {Camera, Code, Point, useCameraDevice, useCameraPermission, useCodeScanner} from "react-native-vision-camera";
import {getStyle} from "./styles";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {runOnJS} from "react-native-reanimated";


const ScanView = () => {
    const {params: {isFromOrder, isFromPurchase, addScannedProductToOrder} = {}} = useRoute<RouteProp<BottomTabMobileStack, RouteNames.SCAN>>();
    const device = useCameraDevice('back');
    const {hasPermission, requestPermission} = useCameraPermission();
    const style = useMemo(() => getStyle(), []);
    const camera = useRef<Camera>(null);
    const [alerted, setAlerted] = useState(false);
    const scanTimerId = useRef<NodeJS.Timeout>();
    const [isScanned, setIsScanned] = useState(false);
    const productCountOnActiveOrder = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost?.orderItems?.length);
    const [lastScannedBarcode, setLastScannedBarcode] = useState('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const isFoucused = useIsFocused();

    useFocusEffect(useCallback(() => {
        return () => {
            navigation.setParams({isFromOrder: false, isFromPurchase: false});
        };
    }, [isFromOrder, isFromPurchase]));


    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isFoucused) {
            setIsScanned(false);
            setLastScannedBarcode('');
        }
    }, [isFoucused]);


    const onCameraError = (error: any) => {
        HELP.alertError(error);
    };

    const onReadBarcode = async (codes: Code[]) => {
        const regEx = new RegExp(regExPatterns.IS_BARCODE, 'g');
        const codeFromScan = codes[0].value ?? '';
        if (!isScanned && regEx.test(codeFromScan)) {
            if (lastScannedBarcode === codeFromScan) {
                setAlerted(true);
                !alerted && HELP.showToast('info', 'Same Barcode', 'Barcode Already Scanned', 5000, () => {
                    setAlerted(false);
                });
                return;
            }
            HELP.playScanSound();
            if (isFromOrder && addScannedProductToOrder) {
                await addScannedProductToOrder(codeFromScan).then(() => {
                    setIsScanned(false);
                });
                setLastScannedBarcode(codeFromScan);
            } else {
                setIsScanned(true);
                setLastScannedBarcode('');
                navigation.navigate('Info', {barcode: codeFromScan});
            }
        } else {
            if (!alerted) {
                setAlerted(true);
                HELP.showToast('info', 'Wrong Barcode Type', 'Barcode Type Is Not Correct',
                    3000, () => {
                        setAlerted(false);
                    });
                setLastScannedBarcode('');
            }
        }
    };


    const codeScanner = useCodeScanner({
        codeTypes: ['code-128', 'qr'],
        onCodeScanned: onReadBarcode
    });


    const onPressOrdersCount = () => {
        const route = isFromOrder ? RouteNames.ORDERS : RouteNames.PURCHASES;
        navigation.navigate(route);
    };

    const focus = useCallback((point: Point) => {
        const c = camera.current;
        if (c == null) return;
        c.focus(point);
    }, []);

    const gesture = Gesture.Tap()
        .onEnd(({x, y}) => {
            runOnJS(focus)({x, y});
        });



    const renderSquareFrame = useMemo(() => {
        if (isFoucused && device) {
            return (
                <View style={style.suqareFrame}>
                </View>
            );
        } else {
            return null;
        }
    }, [isFoucused, device]);




    return (
        <GestureDetector gesture={gesture}>
            <SafeAreaView style={style.container}>
                {renderSquareFrame}
                {isFromOrder && productCountOnActiveOrder &&
                    <CustomPressable
                        android_ripple={{color: Colors.METALLIC_GOLD, radius: 25, }}
                        onPress={onPressOrdersCount}
                        style={style.counterContainer}>
                        < View style={style.counterTextContainer}>
                            <Text style={style.counterText} adjustsFontSizeToFit>
                                {`${productCountOnActiveOrder}`}
                            </Text>
                        </View>
                        <MIcon name={'basket-plus'} size={40} color={Colors.CARD_COLOR} />
                    </CustomPressable>
                }
                {device ?
                    <>
                        <Camera
                            ref={camera}
                            style={[StyleSheet.absoluteFill]}
                            device={device}
                            isActive={isFoucused}
                            codeScanner={codeScanner}
                            onError={onCameraError}
                        />
                    </> : <View>
                        <Text style={{}}>
                            {'No Camera Device Found'.toUpperCase()}
                        </Text>
                    </View>
                }
            </SafeAreaView >
        </GestureDetector>
    );
};

export default ScanView;