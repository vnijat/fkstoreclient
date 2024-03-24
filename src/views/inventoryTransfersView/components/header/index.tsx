import React, {useMemo} from "react";
import {View} from "react-native-windows";
import {InputItem} from "../../../../components/inputItem";
import MulitDateTimePicker from "../../../../containers/dateTimePickerMulti";
import {getStyle} from "./styles";
import InventoryTransfersLogicProvider from "../../provider/logic";
import InventoryTransfersDataProvider from "../../provider/data";
import {PrimaryButton} from "../../../../components/primaryButton";




interface ITransfersHeader {
    logicProvider: ReturnType<typeof InventoryTransfersLogicProvider>;
    dataProvider: ReturnType<typeof InventoryTransfersDataProvider>;
}


const TransfersHeader = ({logicProvider, dataProvider}: ITransfersHeader) => {
    const style = useMemo(() => getStyle(), []);
    const {handleSearchInput,
        handleDateChange,
        handleShowTransferAddModal
    } = logicProvider;
    const {queryParams, queryData: {
        data,
        isLoading
    }} = dataProvider;

    const renderDatePicker = useMemo(() => {
        if (data?.transfersStartDate) {
            return <MulitDateTimePicker getDates={handleDateChange} startDate={data?.transfersStartDate} />;
        } else {
            return null;
        }
    }, [data?.transfersStartDate]);




    return (
        <View style={style.container}>
            <View style={style.topContainer}>
                <View style={style.inputContainer}>
                    <InputItem height={30} inputValue={queryParams?.search ?? ''} isSearch setValue={(value) => handleSearchInput(value as string)} />
                </View>
                {renderDatePicker}
                <View style={style.actionsContainer}>
                    <PrimaryButton height={40} title={'Create New Transfer'.toUpperCase()} onPress={handleShowTransferAddModal} width={150} />
                </View>
            </View>
        </View>
    );

};


export default TransfersHeader;