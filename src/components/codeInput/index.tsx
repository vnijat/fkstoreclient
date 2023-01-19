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
    const isEditable = useMemo(() => !(isDisableForEdit || isDisabled), [isDisableForEdit, isDisabled]);
    const inputRef = useRef(null);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const [isOpenSuggested, setIsOpenSuggested] = useState(false);
    const errorMessage = useMemo(() => isError ? errorDetail : inputTitle, [isError, errorDetail]);
    const { data: codeSuggestion, error: fetchError, isLoading, isUninitialized } = useGetItemCodeSuggestionsQuery({ itemCode: inputValue, categoryId: categoryId as number }, {
    });

    const onChangeText = (text: string) => {
        const isCode = regExPatterns.IS_CODE;
        if ((isCode.test(text) || text === '') && (inputValue !== text)) {
            isCode.test(text) && !isOpenSuggested && setIsOpenSuggested(true);
            getCodeValue(text);
            (text === '') && setIsOpenSuggested(false);
        }
    };

    useEffect(() => {
        if (isEditable) {
            if (codeSuggestion?.lastCodes[0]?.code && categoryId) {
                const latestCode = codeSuggestion?.lastCodes[0].code;
                const nextCode = `${(Number(latestCode) + 1)}`.padStart(6, '0');
                timeoutId = setTimeout(() => {
                    getCodeValue(nextCode);
                }, 100);
            } else if (!codeSuggestion?.lastCodes[0]?.code) {
                timeoutId = setTimeout(() => {
                    getCodeValue('000001');
                }, 100);
            }
        }
        return () => {
            clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
        };
    }, [codeSuggestion?.lastCodes[0]?.code, categoryId, isEditable]);


    const onDissmisSuggested = () => {
        setIsOpenSuggested(false);
    };

    const onPressCodeItem = (code: string) => {
        getCodeValue(code);
        onDissmisSuggested();
    };

    const CodeItem = ({ code }: { code: string; }) => {
        return <>
            <CustomPressable style={style.codeItem}
                onPress={() => onPressCodeItem(code)}
                onHoverOpacity
            >
                <Text style={style.codeItemText}>
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
            <View style={style.codeInputContainer}
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
                <View style={style.codeSuggestionContent}>
                    {(isUninitialized || isLoading)
                        ?
                        <>
                            <View style={style.actvityContainer}>
                                <ActivityIndicator size={'small'} color={Colors.METALLIC_GOLD} />
                            </View>
                        </>
                        :
                        <ScrollView style={style.contentScroll} contentContainerStyle={style.scrollContent}>
                            <Text style={style.contentTitleText}>
                                {'Suggested: '}
                            </Text>
                            {codeSuggestion?.suggestedCodes.map((suggested, index) => {
                                return <CodeItem code={suggested.code} key={`${suggested.code}-${index}`} />;
                            })}
                            <Text style={style.contentTitleText}>
                                {'Last Codes:'}
                            </Text>
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