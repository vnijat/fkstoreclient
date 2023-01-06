import CheckBox from "@react-native-community/checkbox";
import React, { FC, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomContextMenu from "../../components/customContextMenu";
import CustomPressable from "../../components/customPressable";
import { useDeleteManyItemsMutation } from "../../modules/api/apiSlice";
import { addItemId, clearSelectedItems, setIsEditMode, setIsItemForEdit, setIsShowAddEditModal, setIsShowItemModal, setItemForPost, setItemIdForFullResponse } from "../../modules/redux/itemsSlicer";
import { selectIsEditMode } from "../../modules/redux/selectors/itemSelectors";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import HELP from "../../services/helpers";
import { Item } from "../../types/ItemsQuery";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency.windows";
import { getStyle } from "./styles";


interface ItemsContentProps {
    id: number;
    itemIndex: number;
    selectBulk: Function;
    data: Item;
}

const ItemsContent: FC<ItemsContentProps> = ({ id, itemIndex, selectBulk, data }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector(selectIsEditMode);
    const isShowAddEditModal = useSelector((state: RootState) => state.itemsSlicer.isShowAddEditModal);
    const isShowFullItem = useSelector((state: RootState) => state.itemsSlicer.isShowItemModal);
    const [isShowCheckBox, setIsShowCheckBox] = useState(false);
    const [apiDeleteItems] = useDeleteManyItemsMutation();
    const isContextMenuDisabled = isEditMode || isShowAddEditModal || isShowFullItem;
    const { isSelected, selectedCount, firstSelectedItem } = useSelector((state: RootState) => {
        return {
            firstSelectedItem: state.itemsSlicer.selectedItems[0],
            isSelected: state.itemsSlicer.selectedItems.some(({ Id }) => Id === id),
            selectedCount: state.itemsSlicer.selectedItems.length,
        };
    });

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
                dispatch(addItemId({ index: itemIndex, Id: id, totalPrice: data.totalPrice }));
            }
        }
    };



    const RenderColumnContent: FC<{ content: string | number; id: number; }> = ({ content, id }) => {
        return (
            <>
                <View key={id} style={[style.columContent, { zIndex: 2 }]}>
                    <Text key={`${content}-${id}`} style={style.columContentText} selectable>
                        {content}
                    </Text>
                </View>
            </>
        );
    };

    const onCheckBoxValueChange = () => {
        dispatch(addItemId({ index: itemIndex, Id: id, totalPrice: data.totalPrice }));
        if (isEditMode && isSelected && selectedCount === 1) {
            dispatch(setIsEditMode(false));
        } else {
            dispatch(setIsEditMode(true));
        }
    };


    const renderCheckBox = useMemo(() => {
        return (
            <View style={style.checkBoxContainer} key={id}>
                {isShowCheckBox || isEditMode ?
                    <CheckBox
                        value={isSelected}
                        tintColor={Colors.CARD_HEADER_COLOR}
                        onCheckColor={Colors.METALLIC_GOLD}
                        onTintColor={Colors.CARD_HEADER_COLOR}
                        onFillColor={Colors.CARD_HEADER_COLOR}
                        onValueChange={onCheckBoxValueChange}
                        key={id}
                    /> : null}
            </View>
        );
    }, [isSelected, isShowCheckBox, isEditMode, selectedCount]);

    const rowData = useMemo(() => [
        data?.name.toUpperCase(),
        data?.description.toUpperCase(),
        data?.barcode.toUpperCase(),
        data?.category?.title.toUpperCase(),
        data?.color?.name.toUpperCase(),
        data?.unit?.name.toUpperCase(),
        Number(data?.quantity ?? 0),
        currency.format(data?.pricePerUnit ?? 0),
        currency.format(data?.totalPrice ?? 0)
    ], [data]);

    const renderRow = useMemo(() => {
        return rowData.map((content, i) => {
            return <RenderColumnContent content={content} id={id + i} key={i} />;
        });

    }, [rowData]);



    const onPressEdit = () => {
        const itemForPost = HELP.modifyItemForEdit(data, data.id);
        dispatch(setIsItemForEdit(true));
        dispatch(setItemForPost(itemForPost));
        dispatch(setIsShowAddEditModal(true));
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    };

    const onPressShowFull = () => {
        dispatch(setIsShowItemModal(true));
        dispatch(setItemIdForFullResponse(id));
    };

    const aproveDeletion = () => {
        apiDeleteItems([id]);
    };


    const deleteItem = async () => {
        try {
            await HELP.alertPromise('do you want to delete Items?', 'you cant recover deletet Items!');
            aproveDeletion();
        } catch (erorr) {
            console.log("deleteItem=>", erorr);
        }

    };


    const contextActionButtons = [
        {
            title: 'EDIT', onPress: onPressEdit
        },
        {
            title: 'DELETE', onPress: deleteItem
        },
        {
            title: 'SHOW FULL', onPress: onPressShowFull
        },
    ];


    const contextMenuContent = useMemo(() => {
        return (
            <View style={style.contextMenuContainer}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={style.contextMenuButton}
                            onPress={button.onPress}
                            onHoverOpacity
                        >
                            <Text style={style.contextMenuButtonText}>
                                {button.title}
                            </Text>
                        </CustomPressable>
                    );
                })
                }
            </View>
        );
    }, [data]);


    return (
        <>
            <CustomPressable key={id}
                onPress={onPressItem}
                style={[{ backgroundColor: isSelected ? Colors.CARD_COLOR : Colors.FLORAL_WHITE }, style.rowItem]}
                onMouseEnter={() => setIsShowCheckBox(true)}
                onMouseLeave={() => setIsShowCheckBox(false)}
                onHoverOpacity>
                <CustomContextMenu disabled={isContextMenuDisabled}>
                    {contextMenuContent}
                </CustomContextMenu>
                {renderCheckBox}
                {renderRow}
            </CustomPressable>
        </>
    );
};

export default ItemsContent; 