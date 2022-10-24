import CheckBox from "@react-native-community/checkbox";
import React, { FC, useMemo, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomPressable from "../../components/customPressable";
import { addItemId, setIsEditMode, setIsShowItemModal, setItemIdForFullResponse } from "../../modules/redux/itemsSlicer";
import { selectIsEditMode } from "../../modules/redux/selectors/itemSelectors";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Barcode, Category, Color, Unit } from "../../types/ItemsQuery";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency";
import { getStyle } from "./styles";


interface ItemsContentProps {
    id: number;
    name: string;
    description: string;
    barcode: Barcode;
    category: Category;
    quantity: number;
    unit: Unit;
    totalPrice: number;
    stockPrice: number;
    itemIndex: number;
    lastItem: number | undefined;
    color: Color;
    selectBulk: Function;
}

const ItemsContent: FC<ItemsContentProps> = ({ id, name, barcode, category, quantity, unit, totalPrice, stockPrice, itemIndex, lastItem, selectBulk, color, description }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector(selectIsEditMode);
    const [isShowCheckBox, setIsShowCheckBox] = useState(false);
    const { isSelected, selectedCount, firstSelectedItem } = useSelector((state: RootState) => {
        return {
            firstSelectedItem: state.itemsSlicer.selectedItems[0],
            isSelected: state.itemsSlicer.selectedItems.some(({ Id }) => Id === id),
            selectedCount: state.itemsSlicer.selectedItems.length,
        };
    });

    const pressableRef = useRef(null);


    const onPressItem = ({ nativeEvent }: any) => {
        const { shiftKey } = nativeEvent;
        if (isEditMode) {
            if (isSelected && selectedCount === 1) {
                dispatch(setIsEditMode(false));
            }
            if (selectedCount === 1 && !isSelected && shiftKey) {
                const firstSelectedItemIndex = firstSelectedItem.index;
                selectBulk(firstSelectedItemIndex, itemIndex);
            }
            else {
                dispatch(addItemId({ index: itemIndex, Id: id, totalPrice }));
            }
        } else {
            dispatch(setIsShowItemModal(true));
            dispatch(setItemIdForFullResponse(id));
        }
    };
    const RenderColumnContent: FC<{ content: string | number; id: number; }> = ({ content, id }) => {
        return (
            <>
                <View key={id} style={[style.columContent]}>
                    <Text key={`${content}-${id}`} style={style.columContentText}>
                        {content}
                    </Text>
                </View>
            </>
        );
    };

    const onCheckBoxValueChange = () => {
        dispatch(addItemId({ index: itemIndex, Id: id, totalPrice }));
        if (isEditMode && isSelected && selectedCount === 1) {
            dispatch(setIsEditMode(false));
        } else {
            dispatch(setIsEditMode(true));
        }
    };


    const renderCheckBox = useMemo(() => {
        if (isShowCheckBox || isEditMode) {
            return (
                <View style={style.checkBoxContainer} key={id}>
                    <CheckBox
                        value={isSelected}
                        tintColor={Colors.CARD_HEADER_COLOR}
                        onCheckColor={Colors.METALLIC_GOLD}
                        onTintColor={Colors.CARD_HEADER_COLOR}
                        onFillColor={Colors.CARD_HEADER_COLOR}
                        onValueChange={onCheckBoxValueChange}
                        key={id}
                    />
                </View>
            );
        } else {
            return null;
        }

    }, [isSelected, isShowCheckBox, isEditMode, selectedCount]);

    const rowData = useMemo(() => [
        name,
        description,
        barcode.code,
        category.title,
        color.name,
        unit.name,
        `${quantity} (${unit.symbol})`,
        currency.format(stockPrice),
        currency.format(totalPrice)
    ], [name, description, barcode, category, color, quantity, unit, stockPrice, totalPrice]);

    const renderRow = useMemo(() => {
        return rowData.map((content, i) => {
            return <RenderColumnContent content={content} id={id + i} key={i} />;
        });

    }, [rowData]);

    return (
        <>
            <CustomPressable ref={pressableRef} key={id}
                onPress={onPressItem}
                style={[{ backgroundColor: isSelected ? Colors.CARD_COLOR : Colors.FLORAL_WHITE }, style.rowItem]}
                onMouseEnter={() => setIsShowCheckBox(true)}
                onMouseLeave={() => setIsShowCheckBox(false)}
                onHoverOpacity
            >
                {renderCheckBox}
                {renderRow}
            </CustomPressable>
        </>
    );
};

export default ItemsContent; 