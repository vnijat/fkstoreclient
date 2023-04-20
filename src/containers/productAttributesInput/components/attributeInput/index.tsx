import React, { useMemo } from "react";
import { Text, TextInput, View } from "react-native";
import CustomPicker, { IsingelSelectData } from "../../../customPicker";
import MeasurePicker from "../measurePicker";
import { getStyle } from "./styles";



interface IAttributeInput {
    measureData?: IsingelSelectData[];
    currentMeasure?: string;
    currentInputValue: string;
    getInputValue: (value: string) => void;
    getMeasureValue?: (value: string) => void;
    inputTitle?: string;
}

const AttributeInput = ({ getInputValue, currentInputValue, measureData, currentMeasure, inputTitle, getMeasureValue }: IAttributeInput) => {
    const style = useMemo(() => getStyle(), []);
    const isWithMeasure = measureData && getMeasureValue && currentMeasure;

    return (
        <View style={{ margin: 3 }}>
            <Text style={style.inputTitleText}>
                {inputTitle?.toUpperCase()}
            </Text>
            <View style={style.attributeInputContainer}>
                <View style={style.inputContainer}>
                    <TextInput
                        style={style.textInput}
                        value={currentInputValue}
                        maxLength={20}
                        onChangeText={(value: string) => getInputValue(value)}
                    />
                </View>
                {isWithMeasure &&
                    < MeasurePicker
                        measureData={measureData}
                        getMeasure={(value) => getMeasureValue(value as string)}
                        selectedMeasure={currentMeasure}
                    />}
            </View>
        </View>
    );
};
export default AttributeInput;