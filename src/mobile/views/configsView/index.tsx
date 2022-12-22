import React, { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-rooster";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { InputItem } from "../../../components/inputItem";
import { PrimaryButton } from "../../../components/primaryButton";
import { setApiURL } from "../../../modules/redux/configsSlicer";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Colors } from "../../../utils/colors";



const ConfigsView = () => {
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const ApiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const [value, setValue] = useState(ApiUrl);
    const setApiValue = (value: string) => {
        setValue(value);

    };
    const onPressSave = () => {
        dispatch(setApiURL(value));
        addToast({
            type: 'success',
            message: `Configs Saved`.toUpperCase(),
            title: "Success"
        });
    };

    const onPressReset = async () => {
        setValue(ApiUrl);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            <View>
                <InputItem
                    setValue={(value) => setApiValue(value as string)}
                    inputValue={value}
                    inputTitle={'SERVER URL'}
                    placeHolder={'SERVER URL WITH PORT'}
                    height={30}

                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, paddingTop: 20 }}>
                    <PrimaryButton
                        onPress={onPressReset}
                        title={'RESET'}
                        onHoverOpacity
                    />
                    <PrimaryButton
                        onPress={onPressSave}
                        title={'SAVE'}
                        onHoverOpacity
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ConfigsView;