import React, { useMemo } from "react";
import { Text, TextInput, View } from "react-native";
import { dimensionMeasures } from "../../../../enums/itemProperties";
import { ProductAttributesDto } from "../../../../types/item";
import MeasurePicker from "../measurePicker";
import { getStyle } from "./styles";



interface IDimensionsInput {
    dimensionsData: ProductAttributesDto;
    getMeasure: (data: { value: string; dtokey: keyof ProductAttributesDto; }) => void;
    getInputValue: (data: { value: string; dtokey: keyof ProductAttributesDto; }) => void;
}

const DimensionsInput = ({ getMeasure, getInputValue, dimensionsData }: IDimensionsInput) => {
    const style = useMemo(() => getStyle(), []);

    const inputsData: { title: string; dtoKey: keyof ProductAttributesDto; }[] = [
        { title: 'length', dtoKey: 'length' },
        { title: 'width', dtoKey: 'width' },
        { title: 'height', dtoKey: 'height' },
    ];

    const dimensionsInfoText = inputsData.map((data) => data.title).join(' x ');
    const dimensionMeasureData = Object.keys(dimensionMeasures).map((key) => ({ label: dimensionMeasures[key as keyof typeof dimensionMeasures], value: dimensionMeasures[key as keyof typeof dimensionMeasures] }));
    return (
        <View style={{ margin: 3 }}>
            <Text style={style.inputTitleText}>
                {'DIMENSIONS '}
                <Text style={style.inputInfoText}>
                    {`(${dimensionsInfoText})`}
                </Text>
            </Text>
            <View style={style.dimensionsContainer}>
                {
                    inputsData.map((data, index) => {
                        const dimensionValue = dimensionsData[data.dtoKey as keyof ProductAttributesDto];
                        const inputValue = dimensionValue ? Number(dimensionValue).toString() as string :''
                        return (
                            <View style={{ flexGrow: 1 }} key={`${index}-${data.dtoKey}`}>
                                <View style={style.inputContainer}>
                                    <TextInput
                                        style={style.textInput}
                                        value={inputValue}
                                        maxLength={10}
                                        onChangeText={(value: string) => getInputValue({ value, dtokey: data.dtoKey })}
                                    />
                                    {index !== 2 && <Text style={style.inputSeperator}>
                                        {'x'}
                                    </Text>}
                                </View>
                            </View>);
                    })
                }
                <View style={{}}>
                    <MeasurePicker
                        measureData={dimensionMeasureData}
                        getMeasure={(value) => getMeasure({ value: value as string, dtokey: 'dimensionMeasure' })}
                        selectedMeasure={dimensionsData['dimensionMeasure'] as string}
                    />
                </View>
            </View>

        </View>);
};
export default DimensionsInput;