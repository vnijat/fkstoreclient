import React from "react";
import { useSelector } from "react-redux";
import { clientInputs } from "../../../../configs/clientInputConfigs";
import AddEditModal from "../../../../containers/addEditModal";
import { useAddClientMutation, useEditClientMutation } from "../../../../modules/api/clients.api";
import { clearClientForPost, setClientForPost, setIsClientForEdit, setIsShowClientModal } from "../../../../modules/redux/clientsSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";

interface IAddEditClientModal {

}


const AddEditClientModal = ({ }: IAddEditClientModal) => {
    const dispatch = useAppDispatch();
    const isClientForEdit = useSelector((state: RootState) => state.clientSlicer.isClientForEdit);
    const isShowClientModal = useSelector((state: RootState) => state.clientSlicer.isShowClientModal);
    const [apiAddClient] = useAddClientMutation();
    const [apiEditClient] = useEditClientMutation();
    const clientDataForPost = useSelector((state: RootState) => state.clientSlicer.clientForPost);


    const setDataForRequest = (data: { [key: string]: string | number; }) => {
        dispatch(setClientForPost(data));
    };

    const clearDataForRequest = () => {
        dispatch(clearClientForPost());
    };
    const setIsDataForEdit = (data: boolean) => {
        dispatch(setIsClientForEdit(data));
    };

    const setIsShowModal = (data: boolean) => {
        dispatch(setIsShowClientModal(data));
    };


    return (
        <>
            <AddEditModal
                isDataForEdit={isClientForEdit}
                dataForRequest={clientDataForPost}
                inputConfigs={clientInputs}
                apiPostData={apiAddClient}
                apiUpdateData={apiEditClient}
                clearDataForRequest={clearDataForRequest}
                setIsShowModal={setIsShowModal}
                setDataForRequest={setDataForRequest}
                setIsDataForEdit={setIsDataForEdit}
                dataTitle={'CLIENT'}
                isShowModal={isShowClientModal}
            />
        </>
    );

};


export default AddEditClientModal;