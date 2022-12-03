import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomModal from "../../components/customModal";
import { InputItem } from "../../components/inputItem";
import { PrimaryButton } from "../../components/primaryButton";
import { setIsShowSettingsModal } from "../../modules/redux/appStateSlicer";
import { setApiURL } from "../../modules/redux/configsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Colors } from "../../utils/colors";







const SettingsAddEditModal = () => {
    const dispatch = useAppDispatch();
    const isShowSettingsModal = useSelector((state: RootState) => state.appStateSlicer.isShowSettingsModal);
    const ApiUrl = useSelector((state: RootState) => state.configs.apiURL);
    const [value, setValue] = useState(ApiUrl);
    const onClose = () => {
        dispatch(setIsShowSettingsModal(false));
    };

    const setApiValue = (value: string) => {
        setValue(value);

    };

    const onPressSave = () => {
        dispatch(setApiURL(value));
        dispatch(setIsShowSettingsModal(false));
    };

    const onPressReset = async () => {
        setValue(ApiUrl);
    };

    return (
        <>
            <CustomModal
                isShowModal={isShowSettingsModal}
                closeModal={onClose}
                isDissmissEnabled={false}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, alignSelf: 'center' }}>
                        {'SETTINGS'}
                    </Text>
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
            </CustomModal>
        </>
    );



};

export default SettingsAddEditModal;