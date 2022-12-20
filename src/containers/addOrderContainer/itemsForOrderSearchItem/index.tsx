import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../components/customPressable";
import { addItemForOrder } from "../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { Item } from "../../../types/ItemsQuery";
import { Colors } from "../../../utils/colors";


interface IItemsForOrderSearchItem {
    data: Pick<Item, 'name' | 'barcode' | 'id' | 'unit' | 'quantity'>;
    setShowContent?: (data: boolean) => void;
}

interface IRowData {
    value: number | string;
    title: string;
}

const ItemsForOrderSearchItem = ({ data, setShowContent }: IItemsForOrderSearchItem) => {
    const dispatch = useAppDispatch();
    const rowData = useMemo(() => [
        { value: data.name, title: 'Name' },
        { value: data.barcode, title: 'Barcode' },
        { value: data.unit.symbol, title: 'Unit' },
        { value: Number(data.quantity), title: 'Quantity' },
    ], [data]);



    const setItemForOrder = () => {
        dispatch(addItemForOrder({
            itemId: data.id as number,
            unit: data.unit.name,
            name: data.name,
            quantity: 0,
            barcode: data.barcode,
            itemAtStock: data?.quantity
        }));
        setShowContent && setShowContent(false);
    };


    const ColumnItem = ({ value, title }: IRowData) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, maxWidth: 150, minWidth: 100 }}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 9 }}>
                    {`${title}:`}
                </Text>
                <Text style={{ color: Colors.METALLIC_GOLD, fontSize: 9, fontWeight: '700' }}>
                    {`${value}`}
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
            style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.CARD_COLOR, margin: 1, paddingHorizontal: 5 }}
        >
            {renderRow}
        </CustomPressable>
    );

};

export default memo(ItemsForOrderSearchItem)


