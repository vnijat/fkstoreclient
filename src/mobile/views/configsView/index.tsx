import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { InputItem } from "../../../components/inputItem";
import { PrimaryButton } from "../../../components/primaryButton";
import { setApiURL, setLanguage } from "../../../modules/redux/configsSlicer";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import HELP from "../../../services/helpers";
import { Colors } from "../../../utils/colors";



const ConfigsView = () => {
    const dispatch = useAppDispatch();
    const ApiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const appLang = useSelector((state: RootState) => state.configs.language);
    const [value, setValue] = useState(ApiUrl);
    const [lang, setLang] = useState<'en-EN' | 'ru-RU' | 'az-AZ'>(appLang);
    const setApiValue = (value: string) => {
        setValue(value);

    };
    const onPressSave = () => {
        dispatch(setApiURL(value));
        dispatch(setLanguage(lang));
        HELP.showToast('info', `Configs Saved`.toUpperCase(), "Saved");
    };

    const onPressReset = async () => {
        setValue(ApiUrl);
        setLang(appLang);
    };


    const langPickData: { label: string, value: any; }[] = [
        { label: 'AZ', value: 'az-AZ' },
        { label: 'RU', value: 'ru-RU' },
        { label: 'EN', value: 'en-EN' }
    ];

    const handleLangChange = (value: any, index: number) => {
        setLang(value);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            <KeyboardAvoidingView >
                <InputItem
                    setValue={(value) => setApiValue(value as string)}
                    inputValue={value}
                    inputTitle={'SERVER URL'}
                    placeHolder={'SERVER URL WITH PORT'}
                    height={30}
                />
                <Picker
                    selectedValue={lang}
                    onValueChange={handleLangChange}
                >
                    {langPickData.map((lang, index) => {
                        return <Picker.Item key={`${lang.label}-${index}`} label={lang.label} value={lang.value} />;
                    })}
                </Picker>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ConfigsView;