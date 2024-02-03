import {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import CustomModal from "../../components/customModal";
import {InputItem} from "../../components/inputItem/index.windows";
import {PrimaryButton} from "../../components/primaryButton";
import {setIsShowSettingsModal} from "../../modules/redux/appStateSlicer";
import {setApiURL, setLanguage} from "../../modules/redux/configsSlicer";
import {RootState, useAppDispatch} from "../../modules/redux/store";
import HELP from "../../services/helpers";
import {Colors} from "../../utils/colors";
import CustomPicker, {IsingelSelectData} from "../customPicker";
import FONT from "../../utils/font";







const SettingsAddEditModal = () => {
    const dispatch = useAppDispatch();
    const isShowSettingsModal = useSelector((state: RootState) => state.appStateSlicer.isShowSettingsModal);
    const ApiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const appLang = useSelector((state: RootState) => state.configs.language);
    const user = useSelector((state: RootState) => state.user.user);
    const [value, setValue] = useState(ApiUrl);
    const [lang, setLang] = useState<'en-EN' | 'ru-RU' | 'az-AZ'>(appLang);

    const onClose = () => {
        dispatch(setIsShowSettingsModal(false));
    };

    const setApiValue = (value: string) => {
        setValue(value);

    };

    const onPressSave = () => {
        dispatch(setApiURL(value));
        dispatch(setLanguage(lang));
        dispatch(setIsShowSettingsModal(false));
        HELP.showToast('info', `Settings Saved`, 'Saved');
    };

    const onPressReset = async () => {
        setValue(ApiUrl);
        setLang(appLang);
    };

    const langPickData: {label: string, value: any;}[] = [
        {label: 'AZ', value: 'az-AZ'},
        {label: 'RU', value: 'ru-RU'},
        {label: 'EN', value: 'en-EN'}
    ];
    const handleLangChange = ({value}: {value: 'en-EN' | 'ru-RU' | 'az-AZ';}) => {
        setLang(value);
    };

    return (
        <>
            <CustomModal
                isShowModal={isShowSettingsModal}
                closeModal={onClose}
                isDissmissEnabled={false}
            >
                <View style={{flex: 1, padding: 5}}>
                    <Text style={{color: Colors.DEFAULT_TEXT_COLOR, alignSelf: 'center', fontSize: FONT.FONT_SIZE_MEDIUM, fontFamily: FONT.FONT_FAMILY, fontWeight: FONT.FONT_BOLD}}>
                        {'SETTINGS'}
                    </Text>
                    <InputItem
                        setValue={(value) => setApiValue(value as string)}
                        inputValue={value}
                        titleColor={Colors.METALLIC_GOLD}
                        inputTitle={'SERVER URL'}
                        placeHolder={'SERVER URL WITH PORT'}
                        height={30}

                    />
                    <View style={{padding: 5}}>
                        <CustomPicker
                            singleOnSelect={(data) => handleLangChange(data as {value: 'en-EN' | 'ru-RU' | 'az-AZ';})}
                            itemStyle={{padding: 5, backgroundColor: Colors.CARD_COLOR, margin: 1}}
                            singleSelectData={langPickData}
                            singleSelected={lang}
                            singleSelectMode
                            itemTextStyle={{color: Colors.DEFAULT_TEXT_COLOR}}
                            buttonStyle={{flexDirection: 'row', width: 120}}
                            butonTextStyle={{color: Colors.DEFAULT_TEXT_COLOR}}
                            selectedItemStyle={{padding: 5, margin: 1, backgroundColor: Colors.CARD_HEADER_COLOR}}
                            arrowDownColor={Colors.DEFAULT_TEXT_COLOR}
                            title={'Language'}

                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 10, }}>
                        <PrimaryButton
                            onPress={onPressReset}
                            title={'RESET'}
                            onHoverOpacity
                            borderRadius={2}
                            width={80}
                        />
                        <PrimaryButton
                            onPress={onPressSave}
                            title={'SAVE'}
                            onHoverOpacity
                            borderRadius={2}
                            width={80}
                        />
                    </View>

                </View>
            </CustomModal>
        </>
    );



};

export default SettingsAddEditModal;