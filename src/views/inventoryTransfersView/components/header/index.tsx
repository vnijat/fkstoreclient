import React, {useMemo} from "react";
import {View} from "react-native-windows";
import {InputItem} from "../../../../components/inputItem";
import MulitDateTimePicker from "../../../../containers/dateTimePickerMulti";
import {getStyle} from "./styles";
import InventoryTransfersLogicProvider from "../../../inventoryTrackView/provider/logic";
import InventoryTransfersDataProvider from "../../../inventoryTrackView/provider/data";




interface ITransfersHeader {
    logicProvider: ReturnType<typeof InventoryTransfersLogicProvider>;
    dataProvider: ReturnType<typeof InventoryTransfersDataProvider>;
}


const TransfersHeader = ({logicProvider, dataProvider}: ITransfersHeader) => {
    const style = useMemo(() => getStyle(), []);
    const {handleSearchInput, handleDateChange} = logicProvider;
    const {queryParams, queryData: {
        data,
        isLoading
    }} = dataProvider;

    // const renderDatePicker = useMemo(() => {
    //     if (data?.inventoryStartDate) {
    //         return <MulitDateTimePicker getDates={handleDateChange} startDate={data?.inventoryStartDate} />;
    //     } else {
    //         return null;
    //     }
    // }, [data?.inventoryStartDate]);


    return (
        <View style={style.container}>
            <View style={style.topContainer}>
                <InputItem height={30} inputValue={queryParams?.search ?? ''} isSearch setValue={(value) => handleSearchInput(value as string)} />
            </View>
            <View style={style.bottomContainer}>
            </View>
        </View>
    );

};


export default TransfersHeader;