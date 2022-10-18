import React, { memo, useMemo, useRef, useState } from "react";
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
import { clearClientForPost, setClientForPost } from "../../modules/redux/clientsSlicer";
import { clientInputs } from "./configs/clientInput";
import { AddClient } from "../../types/client";
import { ClientsApi } from "../../modules/api/clients.api";
import CustomModal from "../../components/customModal";

interface IaddClient {
    isShowModal: boolean;
    closeModal: () => void;
}


const AddClientModal = ({ isShowModal, closeModal }: IaddClient) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const clientDataForPost = useSelector((state: RootState) => state.clientSlicer.clientForPost, shallowEqual);
    const [tempOptionDataForEdit, settempDataForOptionEdit] = useState<AddClient>();
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const isClientForEdit = false;
    const inputRef = useRef<any>([]);


    const setClientDataForPost = (
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
            setClientForPost({ ...clientDataForPost, [objectKey]: inputValue }),
        );
    };
    const renderInputs = useMemo(() => {
        {
            if (isShowModal) {
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
    }, [errorMessage, isShowModal, clientDataForPost]);

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
            onCloseAddOptionModal();
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


    const onCloseAddOptionModal = async () => {
        setErrorMessages({});
        clearInputs();
        settempDataForOptionEdit({});
        dispatch(setIsOptionForEdit(false));
        closeModal();
    };

    const onPressSave = async () => {
        // const { id, ...body } = optionDataForPost;
        // try {
        //     const response = await dispatch(ItemOptionsApi.endpoints.editOption.initiate({ id: id, optionName, body: body }));
        //     if (response.error) {
        //         throw response.error;
        //     }
        //     onCloseAddOptionModal();
        // } catch (error) {
        //     console.log("onPressSave==erorr>>", error);
        //     if (error?.status === 400) {
        //         setErrorMessages(HELP.modifieErrorMessage(error));
        //     }
        //     else {
        //         if (error?.data.message) {
        //             errorAlert(error?.status, error?.data.message);
        //         }
        //     }

        // }
    };


    return (
        <CustomModal
            closeModal={onCloseAddOptionModal}
            isShowModal={isShowModal}
            isDissmissEnabled={true}
        >
            <View style={{ flex: 1 }}>
                <Text style={style.headerText}>
                    {`Add Client`}
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