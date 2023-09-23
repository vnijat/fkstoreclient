import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { Alert } from "react-native-windows";
import CustomPressable from "../../../components/customPressable";
import { OrderItemStatus } from "../../../enums/orderItemStatus";
import { addItemForOrder } from "../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import HELP from "../../../services/helpers";
import { Item } from "../../../types/item";
import { Colors } from "../../../utils/colors";
import { getStyle } from "./style";


interface IItemsForOrderSearchItem {
    data: Item;
    setShowContent?: (data: boolean) => void;
}

interface IRowData {
    value: number | string;
    title: string;
}

const ItemsForOrderSearchItem = ({ data, setShowContent }: IItemsForOrderSearchItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const rowData = useMemo(() => [
        { value: data.store.name, title: 'Store' },
        { value: data.name, title: 'Name' },
        { value: data.barcode, title: 'Barcode' },
        { value: data.unit.symbol, title: 'Unit' },
        { value: Number(data.quantity), title: 'Quantity' },
    ], [data]);


    const setItemForOrder = () => {
        if (!data.inUse) {
            dispatch(addItemForOrder(data));
            setShowContent && setShowContent(false);
        } else {
            HELP.alertError(undefined, 'Item is in another Order, Please complete another order first');

        }
    };


    const ColumnItem = ({ value, title }: IRowData) => {
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
            const { value, title } = rowData;
            return (
                <ColumnItem {...{ value, title }} key={`${index}`} />
            );
        });
    }, [rowData]);

    return (
        <CustomPressable
            onPress={setItemForOrder}
            style={style.searchedItemContainer}
        >
            {renderRow}
        </CustomPressable>
    );

};

export default memo(ItemsForOrderSearchItem)


