import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../modules/redux/store";
import { Data, Item } from "../types/ItemsQuery";

export const selectMany = (from: number, to: number, data: Item[], dispatch: AppDispatch, addItem: (payload: { index: number; Id: number; totalPrice: number; }) => PayloadAction<{ index: number; Id: number; totalPrice: number; }>) => {
    const fromIndex = from > to ? to : from + 1;
    const toIndex = from < to ? to : from - 1;
    const selectedItems = data?.reduce<Array<{ index: number; Id: number; totalPrice: number; }>>((newArray, value, index) => {
        if (index >= fromIndex && index <= toIndex) {
            newArray.push({ index, Id: value.id, totalPrice: value.totalPrice });
        }
        return newArray;
    }, []);
    selectedItems?.forEach((item) => dispatch(addItem(item)));
};


export const getSelectedTotalPrice = (data: Item[], selectetIds: number[]): number => {
    const filteredItems = data.filter(item => selectetIds.includes(item.id));
    return filteredItems.reduce((prevItem, currentItem) => prevItem + +(currentItem.totalPrice), 0);
};