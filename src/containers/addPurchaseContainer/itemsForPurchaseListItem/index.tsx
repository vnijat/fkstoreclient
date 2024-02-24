import React, {useMemo} from "react";
import {View, Text} from "react-native";
import CustomContextMenu from "../../../components/customContextMenu";
import CustomPressable from "../../../components/customPressable";
import {PaymentMethod} from "../../../enums/purchase";
import {deleteItemFromPurchase, updateItemForPurchase} from "../../../modules/redux/purchaseSlicer";
import {useAppDispatch} from "../../../modules/redux/store";
import {ItemOptionForInputs} from "../../../types/item";
import {PurchaseItem} from "../../../types/purchase";
import {Colors} from "../../../utils/colors";
import EditableColumn from "./components/editableColumn";
import SelectableColumn from "./components/selectableColumn";
import StaticColumn from "./components/staticColumn";
import {getStyle} from "./style";


interface IItemsForPurchaseListItem {
    purchaseItem: PurchaseItem;
    index?: number;
    suppliersData: ItemOptionForInputs['supplier'];
}

interface IrowData {
    value: any;
    editable?: boolean;
    selectable?: boolean;
    selectableData?: {value: string | number, label: string;}[];
    searchEnabled?: boolean;
    dtoKey?: string;
    isDeselectEnabled?: boolean;
    isCheckBox?: boolean;
    isNumeric?: boolean;
    disabled?: boolean;
}


const ItemsForPurchaseListItem = ({purchaseItem, index, suppliersData}: IItemsForPurchaseListItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const selectableSuppliersData = useMemo(() => suppliersData.map((data) => ({value: data.id, label: data.label})) as {value: string | number, label: string;}[], [suppliersData.length]);
    const paymentMethodData = useMemo(() => Object.keys(PaymentMethod).map((payment) => ({value: PaymentMethod[payment as keyof typeof PaymentMethod], label: payment})), []);
    const {
        fullfilled,
        supplier,
        supplierId,
        name,
        barcode,
        poInfo,
        pricePerUnit,
        updateMainPrice,
        quantity,
        paymentMethod,
        unit,
        store
    } = purchaseItem;
    const rowData: IrowData[] = useMemo(() => [
        {value: (1 + (index ?? 0)), },
        {value: store?.name},
        {value: (fullfilled && supplier) ? supplier.name : supplierId, selectable: !fullfilled, selectableData: selectableSuppliersData, searchEnabled: true, dtoKey: 'supplierId'},
        {value: paymentMethod, selectable: !fullfilled, selectableData: paymentMethodData, dtoKey: 'paymentMethod'},
        {value: poInfo, editable: true, disabled: fullfilled, dtoKey: 'poInfo'},
        {value: name},
        {value: barcode},
        {value: unit},
        {value: Number(pricePerUnit), editable: true, dtoKey: 'pricePerUnit', isNumeric: true, disabled: fullfilled},
        {value: fullfilled ? {true: 'Price Updated', false: 'Price Not Updated'}[`${updateMainPrice}`] : updateMainPrice, isCheckBox: true, editable: !fullfilled, dtoKey: 'updateMainPrice'},
        {value: Number(quantity), editable: true, dtoKey: 'quantity', isNumeric: true, disabled: fullfilled},
    ], [quantity, fullfilled, pricePerUnit, supplierId, paymentMethod, poInfo, updateMainPrice]);

    const handleOnChangeEditableColumn = (inputValue: string | boolean, dtoKey: string) => {
        const value = (typeof inputValue === 'string' && inputValue !== '' && !isNaN(Number(inputValue))) ? Number(inputValue) : inputValue;
        dispatch(updateItemForPurchase({itemId: purchaseItem.itemId, data: {[dtoKey]: value}}));
    };

    const handleDeleteItemForPurchase = () => {
        if (purchaseItem.fullfilled) {
            return;
        }
        dispatch(deleteItemFromPurchase({itemId: purchaseItem.itemId}));
    };

    const contextActionButtons = [
        {
            title: 'DELETE', onPress: handleDeleteItemForPurchase
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
        dispatch(updateItemForPurchase({itemId: purchaseItem.itemId, data: {[dtoKey]: value}}));
    };

    const renderColumns = useMemo(() => {
        return rowData.map((data, index) => {
            if (data.editable) {
                const value = typeof data.value !== 'boolean' ? data.value.toString() : data.value;
                return <EditableColumn
                    key={`${index}-editable`}
                    value={value}
                    setValue={(value) => handleOnChangeEditableColumn(value, data.dtoKey!)}
                    isCheckBox={data.isCheckBox}
                    isNumeric={data.isNumeric}
                    disabled={data.disabled}
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