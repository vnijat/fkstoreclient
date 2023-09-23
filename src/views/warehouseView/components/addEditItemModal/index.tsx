import React from "react";
import {useSelector} from "react-redux";
import {inputsConfig} from "../../../../configs/ItemInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import ProductsAttributesInput from "../../../../containers/productAttributesInput";
import {PaymentMethod} from "../../../../enums/purchase";
import {useAddItemMutation, useEditItemMutation, useGetItemInputsQuery} from "../../../../modules/api/apiSlice";
import {ItemOptionsApi} from "../../../../modules/api/itemOptions.api";
import {addItemOption, IItemOptions, setIsOpenOptionModal, setIsOptionForEdit, setOptionNameForModal} from "../../../../modules/redux/itemOptions";
import {clearItemForPosting, setFromWhereAddEditModalCalled, setIsItemForEdit, setIsShowAddEditModal, setItemForPost} from "../../../../modules/redux/itemsSlicer";
import {addItemForPurchase, setPurchaseDataForPost} from "../../../../modules/redux/purchaseSlicer";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import {AddItemInterface, Item} from "../../../../types/item";
import {Colors} from "../../../../utils/colors";
import WareHouseDataProvider from "../../provider/data";
import WareHouseLogicProvider from "../../provider/logic";
import AddEditItemOptionsModal from "../addEditItemOptionsModal";



interface IAddEditItemModal {
}


const AddEditItemModal = ({}: IAddEditItemModal) => {
    const dispatch = useAppDispatch();
    const calledFrom = useSelector((state: RootState) => state.itemsSlicer.addEditModalCalledFrom);
    const isPurchaseModalOpen = useSelector((state: RootState) => state.purchaseSlicer.isShowPurchaseModal);
    const isPurchaseData = useSelector((state: RootState) => state.purchaseSlicer.purchaseDataForPost);
    const isItemForEdit = useSelector((state: RootState) => state.itemsSlicer.isItemForEdit);
    const isShowItemModal = useSelector((state: RootState) => state.itemsSlicer.isShowAddEditModal);
    const [apiAdditem] = useAddItemMutation();
    const [apiEditItem] = useEditItemMutation();

    const itemForPosting: AddItemInterface = useSelector((state: RootState) => state.itemsSlicer.itemforPost);
    const {data: inputsData} = useGetItemInputsQuery(undefined, {
        selectFromResult: ({isLoading, isUninitialized, error, data}) => ({
            error,
            isLoading: isUninitialized ? true : isLoading,
            data
        }),
        pollingInterval: 5000,
    });

    const getOptionData = async (optionId: number, dataKeyName: string) => {
        try {
            const response = await dispatch(ItemOptionsApi.endpoints.getOption.initiate({optionName: dataKeyName, id: optionId}));
            if (response.data) {
                return response?.data;
            }
        } catch (error) {

        }
    };
    const setDataForRequest = (data: {[key: string]: string | number;}) => {
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
        dispatch(addItemOption({optionName: dataKeyName! as keyof IItemOptions['options'], value: dataForEdit}));
        dispatch(setOptionNameForModal(dataKeyName! as keyof IItemOptions['options']));
        dispatch(setIsOptionForEdit(true));
        dispatch(setIsOpenOptionModal(true));
    };
    const setIsShowModal = (data: boolean) => {
        dispatch(setIsShowAddEditModal(data));
        dispatch(setFromWhereAddEditModalCalled('warehouse'));
    };



    const addNewProductToPurchaseList = (data: Item) => {
        dispatch(dispatch(addItemForPurchase(data)));
    };


    const postNewProduct = async (data: AddItemInterface) => {
        const response = await apiAdditem(data);
        if (!response?.data?.error && calledFrom === 'purchase' && isPurchaseModalOpen && isPurchaseData) {
            const data: Item = response?.data;
            if (data) {
                addNewProductToPurchaseList(data);
            }
        }
        return response;
    };


    const customInputComponent = {
        productAttributes: ProductsAttributesInput
    };

    return (
        <>
            < AddEditItemOptionsModal />
            {isShowItemModal && <AddEditModal
                isDataForEdit={isItemForEdit}
                dataForRequest={itemForPosting}
                selectableData={inputsData}
                inputConfigs={inputsConfig}
                apiPostData={postNewProduct}
                apiUpdateData={apiEditItem}
                clearDataForRequest={clearDataForRequest}
                setIsShowModal={setIsShowModal}
                setDataForRequest={setDataForRequest}
                setIsDataForEdit={setIsDataForEdit}
                dataTitle={'product'}
                pickerOnPressAddButton={pickerOnPressAddButton}
                pickerOnPressEditButton={pickerOnPressEditButton}
                isPickerItemEditable
                isPickerAddButton
                isPickerSearchEnabled
                isShowModal={isShowItemModal}
                modalBorderColor={Colors.DEFAULT_TEXT_COLOR}
                customComponent={customInputComponent}
            />}
        </>
    );

};

export default AddEditItemModal;