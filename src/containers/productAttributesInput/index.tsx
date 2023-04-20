import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem";
import { areaMeasures, dimensionMeasures, volumeMeasures, weightMeasures } from "../../enums/itemProperties";
import { setProductAttributes } from "../../modules/redux/itemsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { ProductAttributesDto } from "../../types/item";
import CustomPicker, { IsingelSelectData } from "../customPicker";
import DimensionsInput from "./components/dimensionsInput";
import AttributeInput from "./components/attributeInput";
import { regExPatterns } from "../../utils/validation";




interface IProudctsAttributesInput {

}


interface IOtherAttributes {
    title: string;
    dtoKey: keyof ProductAttributesDto;
    measureData?: IsingelSelectData[];
    measureDtoKey?: keyof ProductAttributesDto;
    type?: 'number' | 'string';
}


const ProductsAttributesInput = ({ }: IProudctsAttributesInput) => {
    const dispatch = useAppDispatch();
    const productAttributesData = useSelector((state: RootState) => state.itemsSlicer.itemforPost.properties);
    const volumeMeasureData = Object.values(volumeMeasures).map((value) => ({ label: value, value }));
    const weightMeasureData = Object.values(weightMeasures).map((value) => ({ label: value, value }));
    const areaMeasureData = Object.values(areaMeasures).map((value) => ({ label: value, value }));


    const onChangeValue = (value: string, dtoKey: keyof ProductAttributesDto, type?: 'number' | 'string') => {
        const isNum = regExPatterns.IS_NUMERIC;
        if (type === 'number') {
            if (isNum.test(value)) {
                const numericVaue = Number(+value)
                dispatch(setProductAttributes({ [dtoKey]: numericVaue }));
            }
        } else {
            dispatch(setProductAttributes({ [dtoKey]: value }));
        }
    };


    const otherAttributes: IOtherAttributes[] = [
        { title: 'Volume', dtoKey: 'volume', measureData: volumeMeasureData, measureDtoKey: 'volumeMeasure', type: 'number' },
        { title: 'Weight', dtoKey: 'weight', measureData: weightMeasureData, measureDtoKey: 'weightMeasure', type: 'number' },
        { title: 'Area', dtoKey: 'area', measureData: areaMeasureData, measureDtoKey: 'areaMeasure', type: 'number' },
        { title: 'Color/Variant', dtoKey: 'supplierColorVariant' },
        { title: 'Articule', dtoKey: 'supplierProductArticule' },
    ];

    const renderOtherAttributes = useMemo(() => {
        return otherAttributes.map((data, index) => {
            const attributeValue = productAttributesData[data.dtoKey];
            const isNumber = data.type === 'number';
            const inputValue = attributeValue ? (isNumber ? Number(attributeValue).toString() : attributeValue) as string : '';
            const getInputvalue = (value: string) => onChangeValue(value, data.dtoKey, data.type);

            return (
                <AttributeInput
                    inputTitle={data.title}
                    measureData={data.measureData}
                    key={`${index}-${data.dtoKey}`}
                    getInputValue={getInputvalue}
                    currentInputValue={inputValue}
                    currentMeasure={productAttributesData[data.measureDtoKey!] as string}
                    getMeasureValue={(value) => onChangeValue(value, data.measureDtoKey!)}

                />
            );
        });
    }, [productAttributesData, onChangeValue]);



    return (
        <View style={{ paddingHorizontal: 5, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
            <DimensionsInput
                dimensionsData={productAttributesData}
                getInputValue={({ value, dtokey }) => onChangeValue(value, dtokey, 'number')}
                getMeasure={({ value, dtokey }) => onChangeValue(value, dtokey, 'string')}
            />
            {renderOtherAttributes}
        </View>
    );

};

export default ProductsAttributesInput;