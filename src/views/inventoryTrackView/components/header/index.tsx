import React, { useMemo } from "react";
import { View } from "react-native-windows";
import { InputItem } from "../../../../components/inputItem";
import MulitDateTimePicker from "../../../../containers/dateTimePickerMulti";
import InventoryTrackDataProvider from "../../provider/data";
import InventoryTrackLogicProvider from "../../provider/logic";
import { getStyle } from "./styles";




interface ITrackHeader {
    logicProvider: ReturnType<typeof InventoryTrackLogicProvider>;
    dataProvider: ReturnType<typeof InventoryTrackDataProvider>;
}


const TrackHeader = ({ logicProvider, dataProvider }: ITrackHeader) => {
    const style = useMemo(() => getStyle(), []);
    const { handleSearchInput, handleDateChange } = logicProvider;
    const { queryParams, queryData: {
        data,
        isLoading
    } } = dataProvider;

    const renderDatePicker = useMemo(() => {
        if (data?.inventoryStartDate) {
            return <MulitDateTimePicker getDates={handleDateChange} startDate={data?.inventoryStartDate} />;
        } else {
            return null;
        }
    }, [data?.inventoryStartDate]);
    

    return (
        <View style={style.container}>
            <View style={style.topContainer}>
                <InputItem height={30} inputValue={queryParams.search ?? ''} setValue={(value) => handleSearchInput(value as string)} />
            </View>
            <View style={style.bottomContainer}>
                {renderDatePicker}
            </View>
        </View>
    );

};


export default TrackHeader;