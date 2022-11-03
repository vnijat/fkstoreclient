import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Alert } from "react-native";
import { Colors } from "../../utils/colors";
import { InputItem } from "../../components/inputItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { setIsOptionForEdit } from "../../modules/redux/itemOptions";
import { getStyle } from "./styles";
import { PrimaryButton } from "../../components/primaryButton";
import HELP from "../../services/helpers";
import { useToast } from "react-native-rooster";
import { clearClientForPost, setClientForPost, setIsClientForEdit, setIsShowClientModal } from "../../modules/redux/clientsSlicer";
import { clientInputs } from "./configs/clientInput";
import { AddClient } from "../../types/client";
import { ClientsApi, useEditClientMutation } from "../../modules/api/clients.api";
import CustomModal from "../../components/customModal";

interface IaddClient {
}


const AddClientModal = ({ }: IaddClient) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const [apiEditClient] = useEditClientMutation();
    const isShowClientModal = useSelector((state: RootState) => state.clientSlicer.isShowClientModal);
    const clientDataForPost = useSelector((state: RootState) => state.clientSlicer.clientForPost);
    const isClientForEdit = useSelector((state: RootState) => state.clientSlicer.isClientForEdit);
    const [tempOptionDataForEdit, settempDataForOptionEdit] = useState<AddClient>();
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const inputRef = useRef<any>([]);


    const setClientDataForPost = (
        inputValue: string,
        objectKey: string,
        selectableInput?: boolean,
    ) => {
        errorMessage[objectKey] &&
            setErrorMessages(prev => {
                delete prev[objectKey];
                return { ...prev };
            });
        dispatch(
            setClientForPost({ ...clientDataForPost, [objectKey]: inputValue }),
        );
    };

    const renderInputs = useMemo(() => {
        {
            if (isShowClientModal) {
                return clientInputs.map((config, id) => {
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
                        enumData
                    } = config;
                    const inputValue: string = clientDataForPost[dtoKey as keyof AddClient] || '';
                    const dataForPicker = (selectable && isEnum) ? enumData : [];
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
                                setClientDataForPost(inputValue, dtoKey, selectable)
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
    }, [errorMessage, isShowClientModal, clientDataForPost]);

    const clearInputs = () => {
        dispatch(clearClientForPost());
    };

    const onPressReset = () => {
        if (isClientForEdit) {
            dispatch(
                setClientForPost(tempOptionDataForEdit!),
            );
        } else {
            setErrorMessages({});
            clearInputs();
        }
    };

    const sendPost = async (): Promise<any> => {
        return await dispatch(ClientsApi.endpoints.addClient.initiate(clientDataForPost));
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
        if (isClientForEdit) {
            settempDataForOptionEdit(clientDataForPost);
        }
    }, [isClientForEdit]);

    const onCloseClientModal = async () => {
        dispatch(setIsShowClientModal(false));
        setErrorMessages({});
        clearInputs();
        settempDataForOptionEdit(undefined);
        dispatch(setIsClientForEdit(false));
    };


    const onPressAdd = async () => {
        try {
            const response = await sendPost();
            if (response.error) {
                throw response.error;
            }
            await addToast({
                type: 'success',
                message: `new Client added`.toUpperCase(),
                title: "Success"
            });
            onCloseClientModal();
        } catch (error) {
            console.log(`AddClientModal=>onPressAdd=>Eerror==>>`, error);
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
        const { id, ...body } = clientDataForPost;
        try {
            const response = await apiEditClient({ body, clientId: id! });
            if (response.error) {
                throw response.error;
            }
            onCloseClientModal();
            await addToast({
                type: 'success',
                message: `${response.data.message}`.toUpperCase(),
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
    };


    return (
        <CustomModal
            closeModal={onCloseClientModal}
            isShowModal={isShowClientModal}
            isDissmissEnabled={true}
        >
            <View style={{ flex: 1 }}>
                <Text style={style.headerText}>
                    {`Client`}
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
                    {isClientForEdit ?
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

export default memo(AddClientModal);