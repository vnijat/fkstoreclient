import React from "react";
import { useSelector } from "react-redux";
import { inputsConfig } from "../../../../configs/ItemInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import { useAddItemMutation, useEditItemMutation, useGetItemInputsQuery } from "../../../../modules/api/apiSlice";
import { ItemOptionsApi } from "../../../../modules/api/itemOptions.api";
import { addItemOption, IItemOptions, setIsOpenOptionModal, setIsOptionForEdit, setOptionNameForModal } from "../../../../modules/redux/itemOptions";
import { clearItemForPosting, setIsItemForEdit, setIsShowAddEditModal, setItemForPost } from "../../../../modules/redux/itemsSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { AddItemInterface } from "../../../../types/Item";
import AddEditItemOptionsModal from "../addEditItemOptionsModal";






const AddEditItemModal = () => {
    const dispatch = useAppDispatch();
    const isItemForEdit = useSelector((state: RootState) => state.itemsSlicer.isItemForEdit);
    const isShowItemModal = useSelector((state: RootState) => state.itemsSlicer.isShowAddEditModal);
    const [apiAdditem] = useAddItemMutation();
    const [apiEditItem] = useEditItemMutation();

    const itemForPosting: AddItemInterface = useSelector((state: RootState) => state.itemsSlicer.itemforPost);
    const { data: inputsData } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ isLoading, isUninitialized, error, data }) => ({
            error,
            isLoading: isUninitialized ? true : isLoading,
            data
        }),
        pollingInterval: 5000,
    });

    const getOptionData = async (optionId: number, dataKeyName: string) => {
        try {
            const response = await dispatch(ItemOptionsApi.endpoints.getOption.initiate({ optionName: dataKeyName, id: optionId }));
            if (response.data) {
                return response?.data;
            }
        } catch (error) {

        }
    };

    const setDataForRequest = (data: { [key: string]: string | number; }) => {
        dispatch(setItemForPost(data));
    };

    const clearDataForRequest = () => {
        dispatch(clearItemForPosting());
    };
    const setIsDataForEdit = (data: boolean) => {
        dispatch(setIsItemForEdit(data));
    };

    const pickerOnPressAddButton = (dataKeyName: string) => {
        dispatch(setOptionNameForModal(dataKeyName! as keyof IItemOptions['options']));
        dispatch(setIsOpenOptionModal(true));
    };
    const pickerOnPressEditButton = async (dataId: number, dataKeyName?: string) => {
        const dataForEdit = await getOptionData(dataId, dataKeyName!);
        dispatch(addItemOption({ optionName: dataKeyName! as keyof IItemOptions['options'], value: dataForEdit }));
        dispatch(setOptionNameForModal(dataKeyName! as keyof IItemOptions['options']));
        dispatch(setIsOptionForEdit(true));
        dispatch(setIsOpenOptionModal(true));
    };
    const setIsShowModal = (data: boolean) => {
        dispatch(setIsShowAddEditModal(data));
    };

    return (
        <>
            < AddEditItemOptionsModal />
            <AddEditModal
                isDataForEdit={isItemForEdit}
                dataForRequest={itemForPosting}
                selectableData={inputsData}
                inputConfigs={inputsConfig}
                apiPostData={apiAdditem}
                apiUpdateData={apiEditItem}
                clearDataForRequest={clearDataForRequest}
                setIsShowModal={setIsShowModal}
                setDataForRequest={setDataForRequest}
                setIsDataForEdit={setIsDataForEdit}
                dataTitle={'ITEM'}
                pickerOnPressAddButton={pickerOnPressAddButton}
                pickerOnPressEditButton={pickerOnPressEditButton}
                isPickerItemEditable
                isPickerAddButton
                isPickerSearchEnabled
                isShowModal={isShowItemModal}
            />
        </>
    );

};

export default AddEditItemModal;