import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { inputsForItemOptions } from "../../../../configs/ItemOptionsInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import { useGetItemInputsQuery } from "../../../../modules/api/apiSlice";
import { useAddOptionMutation, useDeleteOptionMutation, useEditOptionMutation } from "../../../../modules/api/itemOptions.api";
import { addItemOption, clearItemOptions, setIsOpenOptionModal, setIsOptionForEdit } from "../../../../modules/redux/itemOptions";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { InputsConfig } from "../../../../types/inputsconfig";
import { Colors } from "../../../../utils/colors";


const AddEditItemOptionsModal = () => {
    const dispatch = useAppDispatch();
    const optionName = useSelector((state: RootState) => state.itemOptions.optionNameForModal);
    const isOptionForEdit = useSelector((state: RootState) => state.itemOptions.isOptionForEdit);
    const isShowModal = useSelector((state: RootState) => state.itemOptions.isOpenOptionModal);
    const optionDataForPost = useSelector((state: RootState) => state.itemOptions.options[optionName!]);
    const optionInputconfig: InputsConfig[] = useMemo(() => !!optionName?.length ? inputsForItemOptions[optionName] : [], [optionName]);
    const [apiAddOption] = useAddOptionMutation();
    const [apiEditOption] = useEditOptionMutation();
    const [apiDeleteOption] = useDeleteOptionMutation();
    const { data: inputsData } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ isLoading, isUninitialized, error, data }) => ({
            error,
            isLoading: isUninitialized ? true : isLoading,
            data
        }),
        pollingInterval: 5000,
    });
    const setDataForRequest = (data: { [key: string]: string | number; }) => {
        dispatch(addItemOption({ optionName: optionName!, value: data }),
        );
    };

    const clearDataForRequest = () => {
        dispatch(clearItemOptions());
    };
    const setIsDataForEdit = (data: boolean) => {
        dispatch(setIsOptionForEdit(data));
    };

    const setIsShowModal = (data: boolean) => {
        dispatch(setIsOpenOptionModal(data));
    };

    const addOption = (data: { body: object; }) => {
        return apiAddOption({ body: data, optionName: optionName! });
    };

    const editOption = (data: { body: object; id: number; }) => {
        return apiEditOption({ ...data, optionName: optionName! });
    };

    const handleOnDelete = (Ids: number[]) => {
        return apiDeleteOption({ optionName: optionName!, Ids });
    };


    return (
        <>
            {isShowModal && <AddEditModal
                isDataForEdit={isOptionForEdit}
                dataForRequest={optionDataForPost}
                selectableData={inputsData}
                inputConfigs={optionInputconfig}
                apiPostData={addOption}
                apiUpdateData={editOption}
                clearDataForRequest={clearDataForRequest}
                setIsShowModal={setIsShowModal}
                setDataForRequest={setDataForRequest}
                setIsDataForEdit={setIsDataForEdit}
                dataTitle={optionName?.toUpperCase()}
                isPickerSearchEnabled
                isShowModal={isShowModal}
                deleteFunction={handleOnDelete}
                modalBorderColor={Colors.METALLIC_GOLD}
            />}
        </>

    );

};

export default AddEditItemOptionsModal;