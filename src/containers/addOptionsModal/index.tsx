import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Alert } from "react-native";
import { Colors } from "../../utils/colors";
import { inputsForItemOptions } from "./configs";
import { InputsConfig } from "../../types/inputsconfig";
import { InputItem } from "../../components/inputItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { addItemOption, clearItemOptions, setIsOpenOptionModal, setIsOptionForEdit } from "../../modules/redux/itemOptions";
import { getStyle } from "./styles";
import { PrimaryButton } from "../../components/primaryButton";
import HELP from "../../services/helpers";
import { useGetItemInputsQuery } from "../../modules/api/apiSlice";
import { ItemOptionsApi } from "../../modules/api/itemOptions.api";
import CustomModal from "../../components/customModal";
import { useToast } from "react-native-rooster";

interface IaddOptionsModal {
}


const AddOptionsModal = ({ }: IaddOptionsModal) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const isShowModal = useSelector((state: RootState) => state.itemOptions.isOpenOptionModal);
    const optionName = useSelector((state: RootState) => state.itemOptions.optionNameForModal);
    const optionDataForPost = useSelector((state: RootState) => state.itemOptions.options[optionName!], shallowEqual);
    const isOptionForEdit = useSelector((state: RootState) => state.itemOptions.isOptionForEdit);
    const [tempOptionDataForEdit, settempDataForOptionEdit] = useState({});
    const optionsInputData: InputsConfig[] | undefined = useMemo(() => optionName && inputsForItemOptions[optionName], [optionName]);
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const { currentData: ItemInputsData } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ isLoading, isUninitialized, error, currentData }) => ({
            error,
            isLoading: isUninitialized ? true : isLoading,
            currentData
        }),
        pollingInterval: 5000,
    });


    useEffect(() => {
        if (isShowModal && isOptionForEdit && optionDataForPost) {
            settempDataForOptionEdit(optionDataForPost);
        }
    }, [isShowModal]);


    const inputRef = useRef<any>([]);
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
            addItemOption({ [optionName!]: { ...optionDataForPost, [objectKey]: inputValue } }),
        );
    };

    const renderInputs = useMemo(() => {
        {
            if (optionsInputData?.length && isShowModal) {
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
                        dtoKey,
                        selectableDataKey
                    } = config;
                    const inputValue: string = (optionDataForPost && Object.keys(optionDataForPost!).length) ? optionDataForPost[dtoKey] : '';
                    const dataForPicker = selectable && ItemInputsData ? ItemInputsData[selectableDataKey ? selectableDataKey : optionName!] : [];
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
                            titleColor={Colors.METALLIC_GOLD}

                        />

                    );
                });

            }

        }
    }, [optionDataForPost, optionsInputData, optionName, errorMessage, ItemInputsData, isShowModal]);

    const clearInputs = () => {
        dispatch(clearItemOptions());
    };

    const onPressReset = () => {
        if (isOptionForEdit) {
            dispatch(
                addItemOption({ [optionName!]: tempOptionDataForEdit }),
            );
        } else {
            setErrorMessages({});
            clearInputs();
        }
    };

    const sendPost = async (): Promise<any> => {
        return await dispatch(ItemOptionsApi.endpoints.addOption.initiate({ optionName: optionName!, body: optionDataForPost }));
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
            if (response.error) {
                throw response.error;
            }
            await addToast({
                type: 'success',
                message: `new ${optionName} added`.toUpperCase(),
                title: "Success"
            });
            onCloseAddOptionModal();
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


    const onCloseAddOptionModal = async () => {
        setErrorMessages({});
        clearInputs();
        settempDataForOptionEdit({});
        dispatch(setIsOpenOptionModal(false));
        dispatch(setIsOptionForEdit(false));
    };

    const onPressSave = async () => {
        const { id, ...body } = optionDataForPost;
        try {
            const response = await dispatch(ItemOptionsApi.endpoints.editOption.initiate({ id: id, optionName: optionName!, body: body }));
            if (response.error) {
                throw response.error;
            }
            onCloseAddOptionModal();
        } catch (error) {
            console.log("onPressSave==erorr>>", error);
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


    return (
        <CustomModal
            closeModal={onCloseAddOptionModal}
            isShowModal={isShowModal}
            isDissmissEnabled={true}
        >
            <View style={{ flex: 1 }}>
                <Text style={style.headerText}>
                    {`${optionName?.toUpperCase()}`}
                </Text>
                <View style={style.contentContainer}>
                    {renderInputs}
                </View>
                <View style={style.buttonsContainer}>
                    <PrimaryButton
                        title={'Reset'}
                        onPress={onPressReset}
                        buttonColor={Colors.CARD_HEADER_COLOR}
                        textColor={Colors.DEFAULT_TEXT_COLOR}
                        pressedColor={Colors.METALLIC_GOLD}
                        height={30}
                        width={80}
                    />
                    {isOptionForEdit ?
                        <PrimaryButton
                            title={'Save'}
                            onPress={onPressSave}
                            buttonColor={Colors.METALLIC_GOLD}
                            textColor={Colors.FLORAL_WHITE}
                            pressedColor={Colors.DARK_GOLDENROD}
                            height={30}
                            width={80}
                        /> :
                        <PrimaryButton
                            title={'Add'}
                            onPress={onPressAdd}
                            buttonColor={Colors.DEFAULT_TEXT_COLOR}
                            textColor={Colors.CULTURED}
                            pressedColor={Colors.CARD_HEADER_COLOR}
                            height={30}
                            width={80}
                        />}
                </View>
            </View>
        </CustomModal >
    );


};

export default AddOptionsModal;