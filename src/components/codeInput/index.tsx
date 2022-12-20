import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ActivityIndicator, Flyout, Pressable, ScrollView } from "react-native-windows";
import { useGetItemCodeSuggestionsQuery } from "../../modules/api/apiSlice";
import { Colors } from "../../utils/colors";
import { regExPatterns } from "../../utils/validation";
import CustomPressable from "../customPressable";
import { getStyle } from "./styles";



interface ICodeInput {
    inputValue: string;
    maxLength?: number;
    width?: number;
    height?: number;
    inputTitle?: string;
    isError?: boolean;
    isDisabled?: boolean;
    requiredDataText?: string;
    getCodeValue: (text: string) => void;
    isDisableForEdit?: boolean;
    categoryId?: string | number;
    errorDetail?: string;
}



const CodeInput = ({ inputValue, maxLength, width, height, categoryId, errorDetail, isDisableForEdit, inputTitle, isError, isDisabled, requiredDataText, getCodeValue }: ICodeInput) => {
    const style = useMemo(() => getStyle(width, height, isError), [width, height, isError, isDisabled]);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const isEditable = !(isDisableForEdit || isDisabled);
    const inputRef = useRef(null);
    const [isOpenSuggested, setIsOpenSuggested] = useState(false);
    const [skip, setSkip] = useState(true);
    const errorMessage = useMemo(() => isError ? errorDetail : inputTitle, [isError, errorDetail]);
    const { data: codeSuggestion, error: fetchError, isLoading, isUninitialized } = useGetItemCodeSuggestionsQuery({ itemCode: inputValue, categoryId: categoryId as number }, {
        skip
    });


    const onChangeText = (text: string) => {
        const isNum = regExPatterns.IS_NUMERIC;
        if ((isNum.test(text) || text === '') && (inputValue !== text)) {
            isNum.test(text) && !isOpenSuggested && setIsOpenSuggested(true);
            setSkip(true);
            clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
            getCodeValue(text);
            (text === '') && setIsOpenSuggested(false);
        }
    };

    useEffect(() => {
        if (isEditable && inputValue.trim().length) {
            timeoutId = setTimeout(() => setSkip(false), 300);
        }
        return () => {
            setSkip(true);
            clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
        };
    }, [inputValue, isEditable]);


    const onDissmisSuggested = () => {
        setIsOpenSuggested(false);
        setSkip(true);
    };

    const onPressCodeItem = (code: string) => {
        getCodeValue(code);
        onDissmisSuggested();
    };

    const CodeItem = ({ code }: { code: string; }) => {
        return <>
            <CustomPressable style={{ justifyContent: 'center', height: 20, margin: 1, backgroundColor: Colors.CARD_HEADER_COLOR }}
                onPress={() => onPressCodeItem(code)}
                onHoverOpacity
            >
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14, marginLeft: 5 }}>
                    {code}
                </Text>
            </CustomPressable>
        </>;
    };


    return (
        <View style={[{ margin: 5 }, (isDisabled || isDisableForEdit) && { opacity: 0.5 }]} tooltip={isDisabled ? requiredDataText : errorMessage} >
            {!!inputTitle &&
                <Text style={style.inputTitle}>
                    {`${inputTitle?.toUpperCase()} ${isError ? '*' : ''} `}
                </Text>
            }
            <View style={{ justifyContent: 'center' }}
                ref={inputRef}
            >
                <TextInput
                    value={inputValue}
                    caretHidden={!isEditable}
                    onChangeText={onChangeText}
                    style={style.textInput}
                    maxLength={maxLength || 6}
                    editable={isEditable}
                    placeholder={isDisabled ? requiredDataText?.toUpperCase() : undefined}
                    placeholderTextColor={isDisabled ? Colors.DEFAULT_TEXT_COLOR : undefined}
                />
            </View>
            <Flyout
                target={inputRef.current}
                placement={'bottom'}
                isOpen={isOpenSuggested}
                onDismiss={onDissmisSuggested}
                showMode={'transient'}

            >
                <View style={{ width: width || 120, height: 130, backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 5 }}>
                    {(isUninitialized || isLoading)
                        ?
                        <>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 1 }}>
                                <ActivityIndicator size={'small'} color={Colors.METALLIC_GOLD} />
                            </View>
                        </>
                        :
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 5 }}>
                            <View style={{}}>
                                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                    {'Suggested: '}
                                </Text>
                            </View>
                            {codeSuggestion?.suggestedCodes.map((suggested, index) => {
                                return <CodeItem code={suggested.code} key={`${suggested.code}-${index}`} />;
                            })}
                            <View style={{}}>
                                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                    {'Last Codes:'}
                                </Text>
                            </View>
                            {codeSuggestion?.lastCodes.map((lastcode, index) => {
                                return <CodeItem code={lastcode.code} key={`${lastcode.code}-${index}`} />;
                            })}
                        </ScrollView>
                    }
                </View>
            </Flyout >
        </View >
    );


};

export default memo(CodeInput);