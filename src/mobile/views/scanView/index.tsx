import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { CameraScreen } from "react-native-camera-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetItemQuery } from "../../../modules/api/apiSlice";
import { Colors } from "../../../utils/colors";
import { regExPatterns } from "../../../utils/validation";



const ScanView = () => {
    // const [codeValue, setCodeValue] = useState('');
    const [alerted, setAlerted] = useState(false);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const isFoucused = useIsFocused();
    const onReadBarcode = (event: any) => {
        const regEx = new RegExp(regExPatterns.IS_BARCODE, 'g');
        const codeFromScan = event.nativeEvent.codeStringValue;
        if (regEx.test(codeFromScan)) {
            navigation.navigate('Info', { barcode: codeFromScan });
        } else {
            if (!alerted) {
                Alert.alert("Wrong Barcode Type:", `Barcode Type Is Not Correct`, [
                    { onPress: () => { setAlerted(false); } }
                ]);
                setAlerted(true);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            {isFoucused && < CameraScreen
                scanBarcode={true}
                onReadCode={onReadBarcode}
                showFrame={true}
                laserColor={Colors.INFRA_RED}
                frameColor={Colors.METALLIC_GOLD}
                focusMode={'on'}
            />
            }
        </SafeAreaView>
    );
};

export default ScanView;