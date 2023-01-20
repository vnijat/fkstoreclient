import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-windows";
import CustomContextMenu from "../../../components/customContextMenu";
import CustomPressable from "../../../components/customPressable";
import { deleteItemFromPurchase, updateItemForPurchase } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { ItemOptionForInputs } from "../../../types/item";
import { PurchaseItem } from "../../../types/purchase";
import { Colors } from "../../../utils/colors";
import EditableColumn from "./components/editableColumn";
import SelectableColumn from "./components/selectableColumn";
import StaticColumn from "./components/staticColumn";
import { getStyle } from "./style";


interface IItemsForPurchaseListItem {
    purchaseItem: PurchaseItem;
    index?: number;
    suppliersData: ItemOptionForInputs['supplier'];
}

interface IrowData {
    value: any;
    editable?: boolean;
    selectable?: boolean;
    selectableData?: { value: string | number, label: string; }[];
    searchEnabled?: boolean;
    dtoKey?: string;
    isDeselectEnabled?: boolean;
}


const ItemsForPurchaseListItem = ({ purchaseItem, index, suppliersData }: IItemsForPurchaseListItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const selectableSuppliersData = useMemo(() => suppliersData.map((data) => ({ value: data.id, label: data.label })) as { value: string | number, label: string; }[], [suppliersData.length]);
    const rowData: IrowData[] = useMemo(() => [
        { value: (1 + (index ?? 0)), },
        { value: purchaseItem.name },
        { value: purchaseItem.barcode },
        { value: purchaseItem.unit },
        { value: Number(purchaseItem.pricePerUnit), editable: !purchaseItem.fullfilled },
        { value: Number(purchaseItem.quantity), editable: !purchaseItem.fullfilled },
        { value: purchaseItem.supplierId, selectable: true, selectableData: selectableSuppliersData, searchEnabled: true },
    ], [purchaseItem.quantity, purchaseItem.fullfilled, purchaseItem.pricePerUnit, purchaseItem.supplierId]);


    const handleOnChangeEditableColumn = (text: string) => {
        dispatch(updateItemForPurchase({ itemId: purchaseItem.itemId, data: { quantity: Number(text) } }));
    };

    const handleDeleteItemFromOrder = () => {
        if (purchaseItem.fullfilled) {
            return;
        }
        dispatch(deleteItemFromPurchase({ itemId: purchaseItem.itemId }));
    };

    const contextActionButtons = [
        {
            title: 'DELETE', onPress: handleDeleteItemFromOrder
        },
    ];

    const contextMenuContent = useMemo(() => {
        return (
            <View style={style.contextMenuContainer}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={style.contextMenuItem}
                            onPress={button.onPress}
                            onHoverOpacity
                        >
                            <Text style={style.contextMenuItemText}>
                                {button.title}
                            </Text>
                        </CustomPressable>
                    );
                })
                }
            </View>
        );
    }, [purchaseItem]);

    const getSelectedValue = (value: string, dtoKey: string) => {
        dispatch(updateItemForPurchase({ itemId: purchaseItem.itemId, data: { [dtoKey]: value } }));
    };

    const renderColumns = useMemo(() => {
        return rowData.map((data, index) => {
            if (data.editable) {
                return <EditableColumn
                    key={`${index}-editable`}
                    value={data?.value?.toString()}
                    setValue={handleOnChangeEditableColumn}
                />;
            }
            else if (data.selectable) {
                return <SelectableColumn
                    key={`${index}-selectable${data.dtoKey}`}
                    getValue={(value) => getSelectedValue(value, data.dtoKey!)}
                    selectedValue={data.value}
                    selectableData={data?.selectableData}
                    searchEnabled={data.searchEnabled}
                    isDeselectEnabled={data.isDeselectEnabled}
                />;
            }
            else {
                return <StaticColumn
                    key={`${index}-static`}
                    value={data.value ?? ''}
                    index={index} />;
            }
        });
    }, [purchaseItem]);

    return (
        <>
            <CustomPressable
                style={style.listItemContainer}>
                {!purchaseItem.fullfilled && <CustomContextMenu zIndex={2}>
                    {contextMenuContent}
                </CustomContextMenu>}
                {renderColumns}
            </CustomPressable>
        </>
    );
};

export default ItemsForPurchaseListItem;