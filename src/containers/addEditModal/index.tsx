import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Alert } from "react-native";
import { Colors } from "../../utils/colors";
import { InputItem } from "../../components/inputItem";
import { PrimaryButton } from "../../components/primaryButton";
import HELP from "../../services/helpers";
import { useToast } from "react-native-rooster";
import CustomModal from "../../components/customModal";
import { getStyle } from "./styles";
import { InputsConfig } from "../../types/inputsconfig";
import { IsingelSelectData } from "../customPicker";

interface IAddEditModal {
    /**  Pass Function For Post data to Api*/
    apiPostData: (data: any) => Promise<any>;
    /** Pass Function For Update data to Api*/
    apiUpdateData?: (data: any) => Promise<any>;

    isDataForEdit?: boolean;

    setIsDataForEdit?: (data: boolean) => void;

    setDataForRequest: (data: { [key: string]: any; }) => void;

    clearDataForRequest: () => void;
    /**  Data From Store before Post Or Update */
    dataForRequest: { [key: string]: any; };
    /**  Show Modal For Edit And Add Data */
    isShowModal: boolean;
    /** Array of Inputs Config with plaseHolder,title,dtoKey,etc.*/
    inputConfigs: InputsConfig[];

    dataTitle?: string;

    selectableData?: { [key: string]: IsingelSelectData[]; };

    pickerOnPressEditButton?: (dataId: number, dataKeyName?: string) => void;

    pickerOnPressAddButton?: (dataKeyName: string) => void;

    isPickerItemEditable?: boolean;

    isPickerAddButton?: boolean;

    /** Redux Action Function   
     * 
     * Pass function without dispatch()
     */
    setIsShowModal: (data: boolean) => void;

    isPickerSearchEnabled?: boolean;
    /** Disable picker Action buttons   
        * 
        * Data Add button and Data Edit button
        */
    disablePickerActionButtons?: boolean;
}


const AddEditModal = ({
    apiPostData,
    apiUpdateData,
    isDataForEdit,
    setDataForRequest,
    isShowModal,
    inputConfigs,
    selectableData,
    dataForRequest,
    pickerOnPressEditButton,
    pickerOnPressAddButton,
    isPickerItemEditable,
    isPickerAddButton,
    dataTitle,
    setIsShowModal,
    clearDataForRequest,
    isPickerSearchEnabled,
    setIsDataForEdit,
    disablePickerActionButtons
}: IAddEditModal) => {
    const style = getStyle();
    const { addToast } = useToast();
    const [tempDataForEdit, settempDataForEdit] = useState<any>();
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const inputRef = useRef<any>([]);


    const setClientDataForPost = (
        inputValue: string,
        objectKey: string,
    ) => {
        errorMessage[objectKey] &&
            setErrorMessages(prev => {
                delete prev[objectKey];
                return { ...prev };
            });
        setDataForRequest({ [objectKey]: inputValue });
    };


    const renderInputs = useMemo(() => {
        {
            if (isShowModal) {
                return inputConfigs?.map((config, id) => {
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
                        selectableDataKey,
                        isEnum,
                        enumData,
                        requiredDataName,
                        requiredDataDtoKey
                    } = config;
                    const inputValue: string = dataForRequest[dtoKey!] || '';
                    const dataForPickerFromServer = (selectableData && selectableDataKey) ? (!!requiredDataName ? selectableData[selectableDataKey]?.filter((data: { [key: string]: any; }) => (data?.[requiredDataDtoKey!!] ? data?.[requiredDataDtoKey!!] : data?.[requiredDataDtoKey?.toLowerCase()!!]) == dataForRequest[requiredDataDtoKey!]) : selectableData[selectableDataKey]) : [];
                    const dataForPickerFromEnum = isEnum ? enumData : [];
                    const dataForPicker = selectable ? (isEnum ? dataForPickerFromEnum : dataForPickerFromServer) : [];
                    const pickerDataKeyName = selectable ? selectableDataKey : '';
                    const isError = !!errorMessage[dtoKey!]?.length;
                    const disabled = (!!requiredDataName && !!requiredDataDtoKey) && !dataForRequest[requiredDataDtoKey];
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
                                setClientDataForPost(inputValue, dtoKey)
                            }
                            id={id}
                            isPickerAddButton={isPickerAddButton}
                            isPickerItemEditable={isPickerItemEditable}
                            pickerOnPressAddButton={pickerOnPressAddButton}
                            pickerOnPressEditButton={pickerOnPressEditButton}
                            selectable={selectable}
                            selectableData={dataForPicker}
                            isErorr={isError}
                            pickerDataKeyName={pickerDataKeyName}
                            titleColor={Colors.METALLIC_GOLD}
                            isDisabled={disabled}
                            isPickerSearchEnabled={isPickerSearchEnabled}
                            disablePickerActionButtons={disablePickerActionButtons}
                        />

                    );
                });

            }

        }
    }, [errorMessage, isShowModal, dataForRequest, selectableData, disablePickerActionButtons]);

    const clearInputs = () => {
        clearDataForRequest();
    };

    const onPressReset = () => {
        if (!!tempDataForEdit) {
            setDataForRequest(tempDataForEdit!);
        } else {
            setErrorMessages({});
            clearInputs();
        }
    };


    const errorAlert = (status: string, message: string) => {
        Alert.alert(`Conflict Status Code  ${status}`, message, [
            {
                text: 'Ok',
                onPress: () => { }
            },
        ]);
    };

    useEffect(() => {
        if (isDataForEdit) {
            settempDataForEdit(dataForRequest);
        }
    }, [isDataForEdit, isShowModal]);

    const onCloseModal = () => {
        setIsShowModal(false);
        setErrorMessages({});
        clearInputs();
        settempDataForEdit(undefined);
        setIsDataForEdit && setIsDataForEdit(false);
    };


    const onPressAdd = async () => {
        try {
            const response = await apiPostData(dataForRequest);
            if (response.error) {
                throw response.error;
            }
            await addToast({
                type: 'success',
                message: `new ${dataTitle ?? ''} added`.toUpperCase(),
                title: "Success"
            });
            onCloseModal();
        } catch (error) {
            console.log(`OnpressAdd=>onPressAdd=>Err==>>`, error);
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

    const onPressSave = async () => {
        if (apiUpdateData) {
            const { id, ...body } = dataForRequest;
            try {
                const response = await apiUpdateData({ body, id: id! });
                if (response.error) {
                    throw response.error;
                }
                console.log("response===>>>", response);
                onCloseModal();
                await addToast({
                    type: 'success',
                    message: `${response?.data?.message ?? dataTitle}`.toUpperCase(),
                    title: "Success"
                });
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
        } else {
            console.warn("onPressSave====>>>There is No updateApi Function ");
        }
    };


    return (
        <CustomModal
            closeModal={onCloseModal}
            isShowModal={isShowModal}
            isDissmissEnabled={false}
        >
            <View style={{ flex: 1 }}>
                <Text style={style.headerText}>
                    {dataTitle ?? ''}
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
                    {!!tempDataForEdit ?
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

export default memo(AddEditModal);