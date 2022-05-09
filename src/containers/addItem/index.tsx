import React, { FC, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem";
import { PrimaryButton } from "../../components/primaryButton";
import { useAddItemMutation, useGetItemInputsQuery } from "../../modules/api/apiSlice";
import { clearItemForPosting, setItemForPost } from "../../modules/redux/ItemsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import HELP from "../../services/helpers";
import { Colors } from "../../utils/colors";
import { inputsConfig } from "./configs";
import { getStyle } from "./styles";


interface AddItemProps {
}

const AddItemСontainer: FC<AddItemProps> = ({ }) => {
    const style = getStyle();
    const [itemInputs, setItemInputs] = useState(null);
    const { data } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            error,
            isLoading: isUninitialized ? true : isLoading,
        }
        ),
        pollingInterval: 5000
    }
    );
    const [apiAdditem, { error }] = useAddItemMutation();
    const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>({});
    const itemForPosting: any = useSelector((state: RootState) => state.itemsSlicer.itemforPost);
    const dispatch = useAppDispatch();
    const inputRef = useRef<any>([]);
    const postItem = () => {
        const formdata = new FormData();
        formdata.append('item', JSON.stringify(itemForPosting));
        apiAdditem(formdata);
    };

    useEffect(() => data && setItemInputs(data), [data, itemInputs]);

    useEffect(() => {
        if (error && error?.data) {
            setErrorMessages(HELP.modifieErrorMessage(error));
        } else {
            setErrorMessages({});
        }
    }, [error]);

    const onPressReset = () => {
        dispatch(clearItemForPosting());
        setErrorMessages({});
        setItemInputs(null);
    };

    const setItemForPosting = (inputValue: string, objectKey: string, selectableInput?: boolean) => {
        inputValue.length && errorMessage[`${objectKey}${selectableInput ? 'Id' : ''}`] && setErrorMessages((prev) => {
            delete prev[`${objectKey}${selectableInput ? 'Id' : ''}`];
            return { ...prev };
        });
        dispatch(setItemForPost({ key: `${objectKey}${selectableInput ? 'Id' : ''}`, value: inputValue }));
    };
    return (
        <View style={style.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.METALLIC_GOLD, fontWeight: '700', fontSize: 13 }}>
                    {'Add New'}
                </Text>
            </View>
            <View style={style.inputsContainer}>
                {inputsConfig.map((config, id) => {
                    const { title, isNumeric, placeHolder, width, height, multiLine, maxLength, selectable } = config;
                    const [firstWord, ...restWords] = title.split(' ');
                    const titleAsObjectKey = firstWord.toLowerCase() + restWords.join('');
                    const inputValue: string = itemForPosting[titleAsObjectKey] ?? (selectable ? '0' : '');
                    const toolTip: string = inputValue.length ? inputValue : title;
                    inputRef?.current[id] && inputRef?.current[id]?.setNativeProps({ tooltip: toolTip, selectionColor: Colors.JASMINE });
                    const selectableData = (selectable && itemInputs) ? itemInputs[titleAsObjectKey] : [];
                    const isError = !!errorMessage[`${titleAsObjectKey}${selectable ? 'Id' : ''}`]?.length;
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
                            inputRef={(r) => inputRef.current[id] = r}
                            inputValue={inputValue}
                            setValue={(inputValue) => setItemForPosting(inputValue, titleAsObjectKey, selectable)}
                            id={id}
                            selectable={selectable}
                            selectableData={selectableData}
                            isErorr={isError}
                            titleColor={Colors.DARK_GOLDENROD}
                        />
                    );
                })
                }
            </View>
            <View style={style.buttonsContainer}>
                <PrimaryButton title={'Add'}
                    onPress={postItem}
                    buttonColor={Colors.METALLIC_GOLD}
                    textColor={Colors.FLORAL_WHITE}
                    height={30}
                    width={80} />
                <PrimaryButton
                    title={'Clear'}
                    onPress={onPressReset}
                    buttonColor={Colors.METALLIC_GOLD}
                    textColor={Colors.FLORAL_WHITE}
                    height={30}
                    width={80} />
            </View>
        </View>
    );
};

export default AddItemСontainer;