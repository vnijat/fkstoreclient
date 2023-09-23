import React, { useMemo } from "react";
import { View } from "react-native";
import { Colors } from "../../../../utils/colors";
import CustomPicker, { IsingelSelectData } from "../../../customPicker";
import { getStyle } from "./styles";



interface IMeasurePicker {
    getMeasure: (data: IsingelSelectData['value']) => void;
    measureData: IsingelSelectData[];
    selectedMeasure: string;
}



const MeasurePicker = ({ getMeasure, measureData, selectedMeasure }: IMeasurePicker) => {
    const style = useMemo(() => getStyle(), []);


    return (
        <View>
            <CustomPicker
                singleSelectMode
                singleSelectData={measureData}
                singleOnSelect={({ value }) => getMeasure(value)}
                buttonStyle={style.pickerButton}
                butonTextStyle={style.buttonTextStyle}
                arrowDownColor={Colors.DEFAULT_TEXT_COLOR}
                singleSelected={selectedMeasure}
                selectedItemStyle={style.pickerItemSelected}
                selectedItemTextStyle={style.selectedItemText}
                itemStyle={style.pickerItem}
                itemTextStyle={style.itemText}
            />
        </View>
    );


};
export default MeasurePicker;