import {useMemo} from "react";
import {View} from "react-native";
import {Colors} from "../../../../../utils/colors";
import CustomPicker, {IsingelSelectData} from "../../../../customPicker";
import {getStyle} from "./style";



interface ISelectableColumn {
    selectedValue: string;
    selectableData: any;
    getValue: (value: string) => void;
    searchEnabled?: boolean;
    isDeselectEnabled?: boolean;
}


const SelectableColumn = ({selectedValue, selectableData, getValue, searchEnabled, isDeselectEnabled}: ISelectableColumn) => {
    const style = useMemo(() => getStyle(), []);


    const singleOnselect = ({label, value}: IsingelSelectData) => {
        getValue(value as string);
    };

    return (
        <View style={style.selectableColumnContainer}>
            <CustomPicker
                singleOnSelect={singleOnselect}
                singleSelected={selectedValue}
                singleSelectData={selectableData}
                singleSelectMode
                buttonStyle={style.pickerButton}
                itemStyle={style.pickerItem}
                selectedItemStyle={style.pickerSelectedItem}
                itemTextStyle={style.pickerItemText}
                selectedItemTextStyle={style.pickerItemSelectedText}
                isDataSearchEnabled={searchEnabled}
                isDeselectEnabled={isDeselectEnabled}
            />
        </View>
    );
};
export default SelectableColumn;