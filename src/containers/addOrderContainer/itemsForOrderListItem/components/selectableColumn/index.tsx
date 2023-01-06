import { useMemo } from "react";
import { View } from "react-native-windows";
import { Colors } from "../../../../../utils/colors";
import CustomPicker, { IsingelSelectData } from "../../../../customPicker";
import { getStyle } from "./style";



interface ISelectableColumn {
    selectedValue: string;
    selectableData: any;
    getValue: (value: string) => void;
}


const SelectableColumn = ({ selectedValue, selectableData, getValue }: ISelectableColumn) => {
    const style = useMemo(() => getStyle(), []);


    const singleOnselect = ({ label, value }: IsingelSelectData) => {
        getValue(value as string);
    };

    return (
        <View style={style.selectableColumnContainer}>
            <CustomPicker
                singleOnSelect={singleOnselect}
                singleSelectMode
                singleSelectData={selectableData}
                buttonStyle={style.pickerButton}
                itemStyle={style.pickerItem}
                selectedItemStyle={style.pickerSelectedItem}
                itemTextStyle={style.pickerItemText}
                selectedItemTextStyle={style.pickerItemSelectedText}
                singleSelected={selectedValue}
            />
        </View>
    );
};
export default SelectableColumn;