import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Popup, } from "react-native-windows";
import CustomPressable from "../../components/customPressable";
import { Colors } from "../../utils/colors";
import Icon from 'react-native-vector-icons/Entypo';
import { inputsForItemOptions } from "./configs";
import { InputsConfig } from "../../types/inputsconfig";
import { InputItem } from "../../components/inputItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { addItemOptions, clearItemOptions } from "../../modules/redux/itemOptions";
import { getStyle } from "./styles";
import { PrimaryButton } from "../../components/primaryButton";

import POST_OPTIONS from "./configs/post";
import HELP from "../../services/helpers";
import { useGetItemInputsQuery } from "../../modules/api/apiSlice";

interface IaddOptionsModal {
    isShowModal: boolean;
    closeModal: () => void;
    optionName: keyof typeof inputsForItemOptions;
}


const AddOptionsModal = ({ isShowModal, closeModal, optionName }: IaddOptionsModal) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const optionsInputData: InputsConfig[] = inputsForItemOptions[optionName];
    const optionDataForPost = useSelector((state: RootState) => state.itemOptions[optionName], shallowEqual);
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const { currentData: ItemInputsData } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ isLoading, isUninitialized, error, currentData }) => ({
            error,
            isLoading: isUninitialized ? true : isLoading,
            currentData
        }),
        pollingInterval: 5000,
    });
    const inputRef = useRef<any>([]);
    console.log("errorMessage===>>", errorMessage);
    const setItemOptionsForPosting = (
        inputValue: string,
        objectKey: string,
        selectableInput?: boolean,
    ) => {
        !!inputValue.length &&
            errorMessage[objectKey] &&
            setErrorMessages(prev => {
                delete prev[objectKey];
                return { ...prev };
            });
        dispatch(
            addItemOptions({ [optionName]: { ...optionDataForPost, [objectKey]: inputValue } }),
        );
    };
    const renderInputs = useMemo(() => {
        {
            if (optionsInputData?.length) {
                return optionsInputData.map((config, id) => {
                    const {
                        title,
                        isNumeric,
                        placeHolder,
                        width,
                        height,
                        multiLine,
                        maxLength,
                        selectable,
                        dtoKey
                    } = config;
                    const inputValue: string = (optionDataForPost && Object.keys(optionDataForPost!).length) ? optionDataForPost[dtoKey] : '';
                    const dataForPicker = selectable && ItemInputsData ? ItemInputsData[optionName] : [];
                    const isError = !!errorMessage[dtoKey!]?.length;
                    return (
                        <InputItem
                            inputTitle={title}
                            key={id}
                            isNumeric={isNumeric}
                            placeHolder={placeHolder}
                            width={width}
                            height={height}
                            isMultiLine={multiLine}
                            maxLength={maxLength}
                            inputRef={r => (inputRef.current[id] = r)}
                            inputValue={inputValue}
                            setValue={inputValue =>
                                setItemOptionsForPosting(inputValue, dtoKey, selectable)
                            }
                            id={id}
                            selectable={selectable}
                            selectableData={dataForPicker}
                            isErorr={isError}
                            titleColor={Colors.DARK_GOLDENROD}

                        />

                    );
                });

            }

        }
    }, [optionDataForPost, optionsInputData, optionName, errorMessage, ItemInputsData]);

    const clearInputs = () => {
        dispatch(clearItemOptions());
    };

    const onPressReset = () => {
        setErrorMessages({});
        clearInputs();
    };

    const sendPost = async (): Promise<any> => {
        const api = POST_OPTIONS[optionName];
        return dispatch(api.initiate(optionDataForPost));
    };


    const errorAlert = (status: string, message: string) => {
        Alert.alert(`Conflict Status Code  ${status}`, message, [
            {
                text: 'Ok',
                onPress: () => { }
            },
        ]);
    };


    const onPressAdd = async () => {
        try {
            const response = await sendPost();
            console.log("response==>>>", response);
            if (response.error) {
                throw response.error;
            }
            onPressReset();
            closeModal();
        } catch (error) {
            console.log("error==>>", error);
            if (error?.status === 400) {
                setErrorMessages(HELP.modifieErrorMessage(error));
            }
            else {
                if (error?.data.message) {
                    errorAlert(error?.status, error?.data.message);
                }
            }
        }
    };

    const onCloseAddOptionModal = () => {
        setErrorMessages({});
        clearInputs();
        closeModal();
    };


    return (
        <Popup
            isOpen={isShowModal}
            onDismiss={closeModal}
            isLightDismissEnabled={false}
        // placement={'full'}
        >
            <View style={{ flex: 1 }}>
                <CustomPressable onHoverOpacity onPress={onCloseAddOptionModal} style={{ position: 'absolute', top: -5, right: -5, zIndex: 2, width: 22, height: 22, borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.FLORAL_WHITE }}>
                    <Icon name={'circle-with-cross'} size={22} color={Colors.METALLIC_GOLD} />
                </CustomPressable>
                <View style={{ width: 500, paddingVertical: 10, backgroundColor: Colors.ALABASTER, borderRadius: 3, borderWidth: 2, borderColor: Colors.METALLIC_GOLD, zIndex: 1 }}>
                    <Text style={{ color: Colors.OLD_GOLD, fontWeight: '700', textAlign: 'center', fontSize: 14 }}>
                        {`${optionName.toUpperCase()}`}
                    </Text>
                    <View style={{ justifyContent: 'flex-start', paddingHorizontal: 5 }}>
                        {renderInputs}
                    </View>
                    <View style={style.buttonsContainer}>
                        <PrimaryButton
                            title={'Reset'}
                            onPress={onPressReset}
                            buttonColor={Colors.CULTURED}
                            textColor={Colors.METALLIC_GOLD}
                            pressedColor={Colors.OLD_GOLD}
                            height={30}
                            width={80}
                        />
                        <PrimaryButton
                            title={'Add'}
                            onPress={onPressAdd}
                            buttonColor={Colors.METALLIC_GOLD}
                            textColor={Colors.FLORAL_WHITE}
                            pressedColor={Colors.DARK_GOLDENROD}
                            height={30}
                            width={80}
                        />
                    </View>


                </View>
            </View>
        </Popup >
    );


};

export default AddOptionsModal;