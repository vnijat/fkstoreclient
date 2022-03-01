import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../modules/redux/store";
import { Data, Item } from "../types/ItemsQuery";

export const selectMany = (from: number, to: number, data: Data<Item>, dispatch: AppDispatch, addItem: (payload: { index: number; Id: number; }) => PayloadAction<{ index: number; Id: number; }>) => {
    const fromIndex = from > to ? to : from + 1;
    const toIndex = from < to ? to : from - 1;
    const selectedItems = data?.items?.reduce<Array<{ index: number; Id: number; }>>((newArray, value, index) => {
        if (index >= fromIndex && index <= toIndex) {
            newArray.push({ index, Id: value.id });
        }
        return newArray;
    }, []);
    selectedItems?.forEach((item) => dispatch(addItem(item)));
};