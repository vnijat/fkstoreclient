import {memo, useMemo} from "react";
import {Text, View} from "react-native";
import {Alert} from "react-native-windows";
import {Item} from "../../../../types/item";
import CustomPressable from "../../../../components/customPressable";
import {getStyle} from "./styles";


interface ISearchResultItem {
    data: Item;
    onSelect: (data: Item) => void;
}

interface IRowData {
    value: number | string;
    title: string;
}

const SearchResultItem = ({data, onSelect}: ISearchResultItem) => {
    const style = useMemo(() => getStyle(), []);
    const rowData = useMemo(() => [
        {value: data.store.name, title: 'Store'},
        {value: data.name, title: 'Name'},
        {value: data.barcode, title: 'Barcode'},
        {value: data.unit.symbol, title: 'Unit'},
        {value: Number(data.quantity), title: 'Quantity'},
    ], [data]);



    const ColumnItem = ({value, title}: IRowData) => {
        return (
            <View style={style.columnContainer}>
                <Text style={style.titleText}>
                    {`${title}:`.toUpperCase()}
                </Text>
                <Text style={style.valueText}>
                    {`${value}`.toUpperCase()}
                </Text>
            </View >
        );
    };

    const renderRow = useMemo(() => {
        return rowData.map((rowData, index) => {
            const {value, title} = rowData;
            return (
                <ColumnItem {...{value, title}} key={`${index}`} />
            );
        });
    }, [rowData]);

    return (
        <CustomPressable
            onPress={() => onSelect(data)}
            style={style.searchedItemContainer}
        >
            {renderRow}
        </CustomPressable>
    );

};

export default SearchResultItem


