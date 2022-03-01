import React, { FC, useMemo, useRef } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Flyout } from "react-native-windows";
import { useSelector } from "react-redux";
import { useGetAllItemsQuery } from "../../modules/api/apiSlice";
import { addItemId, setIsEditMode } from "../../modules/redux/ItemsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Data, Item } from "../../types/ItemsQuery";
import { currency } from "../../utils/currency";
import { Signs } from "../../utils/unicodeSigns";
import { getStyle } from "./styles";


interface FlatListContentProps {
    id: number;
    name: string;
    barcode: string;
    category: string;
    quantity: number;
    unit: string;
    purchasePrice: number;
    stockPrice: number;
    itemIndex: number;
    lastItem: number;
    selectBulk: Function;
    photoName: string;
}

export const FlatListContent: FC<FlatListContentProps> = ({ id, name, barcode, category, quantity, unit, purchasePrice, stockPrice, itemIndex, lastItem, selectBulk, photoName }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isLastInList = lastItem === itemIndex;
    const isEditMode = useSelector((state: RootState) => state.itemsSlicer.isEditMode);
    const { isSelected, selectedCount, firstSelectedItem } = useSelector((state: RootState) => {
        return {
            firstSelectedItem: state.itemsSlicer.selectedItems[0],
            isSelected: state.itemsSlicer.selectedItems.some(({ Id }) => Id === id),
            selectedCount: state.itemsSlicer.selectedItems.length,
        };
    });

    const onLongPress = ({ nativeEvent }: any) => {
        if (isEditMode) {
            return;
        }
        dispatch(setIsEditMode(true));
        dispatch(addItemId({ index: itemIndex, Id: id }));
    };



    const onPress = ({ nativeEvent: { shiftKey } }: any) => {
        if (isEditMode) {
            if (isSelected && selectedCount === 1) {
                dispatch(setIsEditMode(false));
            }
            if (selectedCount === 1 && !isSelected && shiftKey) {
                const firstSelectedItemIndex = firstSelectedItem.index;
                selectBulk(firstSelectedItemIndex, itemIndex);
            }
            else {
                dispatch(addItemId({ index: itemIndex, Id: id }));
            }
        };
    };


    const RenderColumnContent: FC<{ content: string | number; id: number; columnID: number; lastItem: number; photoName: string; }> = ({ content, id, columnID, lastItem }) => {
        const isFirstColumn = columnID === 0;
        const isLastinRow = lastItem === columnID;
        const nameColumn = columnID === 1;
        return (
            <>
                <View key={id} style={[style.columContent, isFirstColumn && { flexGrow: 0.2 }, nameColumn && { justifyContent: 'flex-start' }]}>
                    {(columnID === 1 && photoName.length) ? <Image key={id + photoName} style={{ borderRadius: 4, width: 60, height: 60, marginRight: 5 }} resizeMode={'contain'} source={{ uri: `http://localhost:3000/items/photos/${photoName}` }} />
                        : null}
                    <Text key={`${content}-${id}`} style={style.columContentText}>
                        {content}
                    </Text>
                </View>

                {/* {isLastinRow ? null : < View style={style.rowVertical} />} */}
            </>
        );
    };

    const renderRow = useMemo(() => {
        return [itemIndex + 1, name, barcode, category, quantity, unit, currency.format(purchasePrice), currency.format(stockPrice)].map((content, i, array) => {
            return <RenderColumnContent content={content} id={id + i} key={i} columnID={i} lastItem={array.length - 1} photoName={photoName} />;
        });

    }, [itemIndex, name, barcode, category, quantity, unit, purchasePrice, stockPrice, photoName]);



    return (
        <>
            <Pressable key={id} onLongPress={onLongPress} onPress={onPress} style={({ pressed }) => [{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', backgroundColor: (pressed || isSelected) ? '#A2D9CE' : 'transparent' }]} >
                {renderRow}
            </Pressable>
            {isLastInList ? null : <View style={style.rowHorizontal} />}
        </>
    );
};