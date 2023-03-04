import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { Alert } from "react-native-windows";
import CustomPressable from "../../../components/customPressable";
import { OrderItemStatus } from "../../../enums/orderItemStatus";
import { PaymentMethod } from "../../../enums/purchase";
import { addItemForOrder } from "../../../modules/redux/orderSlicer";
import { addItemForPurchase } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import HELP from "../../../services/helpers";
import { Item } from "../../../types/item";
import { Colors } from "../../../utils/colors";
import { getStyle } from "./style";


interface IItemsForPurchaseSearchItem {
    data: Item;
    setShowContent?: (data: boolean) => void;
}

interface IRowData {
    value: number | string;
    title: string;
}

const ItemsForPurchaseSearchItem = ({ data, setShowContent }: IItemsForPurchaseSearchItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const rowData = useMemo(() => [
        { value: data.name, title: 'Name' },
        { value: data.barcode, title: 'Barcode' },
        { value: data.unit.symbol, title: 'Unit' },
        { value: Number(data.quantity), title: 'Quantity' },
    ], [data]);


    const setItemForPurchase = () => {
        if (!data.inUse) {
            dispatch(addItemForPurchase({
                itemId: data.id as number,
                unit: data.unit.name,
                name: data.name,
                quantity: 0,
                barcode: data.barcode,
                pricePerUnit: data.costPrice,
                fullfilled: false,
                supplierId: data.supplier.id || null,
                paymentMethod: PaymentMethod.CASH,
                updateMainPrice: false,
                poInfo: ''
            }));
            setShowContent && setShowContent(false);
        } else {
            HELP.alertError(undefined, 'Item in active  Order, Please complete order first');

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
            onPress={setItemForPurchase}
            style={style.searchedItemContainer}
        >
            {renderRow}
        </CustomPressable>
    );

};

export default memo(ItemsForPurchaseSearchItem)


