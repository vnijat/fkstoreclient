import React, { FC, useMemo, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { addItemId, setIsEditMode } from "../../modules/redux/ItemsSlicer";
import { selectIsEditMode } from "../../modules/redux/selectors/itemSelectors";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency";
import { getStyle } from "./styles";


interface ItemsContentProps {
    id: number;
    name: string;
    description: string;
    barcode: string;
    category: string;
    quantity: number;
    unit: string;
    purchasePrice: number;
    stockPrice: number;
    itemIndex: number;
    lastItem: number | undefined;
    color: string;
    selectBulk: Function;
}

const ItemsContent: FC<ItemsContentProps> = ({ id, name, barcode, category, quantity, unit, purchasePrice, stockPrice, itemIndex, lastItem, selectBulk, color, description }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector(selectIsEditMode);
    const [opacity, setOpacity] = useState(1);
    const { isSelected, selectedCount, firstSelectedItem } = useSelector((state: RootState) => {
        return {
            firstSelectedItem: state.itemsSlicer.selectedItems[0],
            isSelected: state.itemsSlicer.selectedItems.some(({ Id }) => Id === id),
            selectedCount: state.itemsSlicer.selectedItems.length,
        };
    });

    const pressableRef = useRef(null);

    const onLongPress = ({ nativeEvent }: any) => {
        if (isEditMode) {
            return;
        }
        dispatch(setIsEditMode(true));
        dispatch(addItemId({ index: itemIndex, Id: id }));
    };

    const onHoverIn = () => {
        setOpacity(0.7);
    };

    const onHoverOut = () => {
        setOpacity(1);
    };

    const onPressItem = ({ nativeEvent: { shiftKey } }: any) => {
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

    const renderRow = useMemo(() => {
        return [name, description, barcode, category, color, quantity, unit, currency.format(purchasePrice), currency.format(stockPrice)].map((content, i) => {
            return <RenderColumnContent content={content} id={id + i} key={i} />;
        });

    }, [name, barcode, category, quantity, unit, purchasePrice, stockPrice, color, description]);

    return (
        <>
            <Pressable ref={pressableRef} key={id}
                onLongPress={onLongPress}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPressItem}
                style={({ pressed }) => [{ backgroundColor: (pressed || isSelected) ? Colors.OLD_GOLD : Colors.FLORAL_WHITE, opacity: opacity }, style.rowItem]} >
                {renderRow}
            </Pressable>
        </>
    );
};

export default ItemsContent; 