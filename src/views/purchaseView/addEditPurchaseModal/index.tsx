import React, { memo } from "react";
import CustomModal from "../../../components/customModal";
import AddPurchaseContainer from "../../../containers/addPurchaseContainer";
import { Colors } from "../../../utils/colors";




interface IAddEditPurchaseModal {
    isOpen: boolean;
    onClose?: () => void;

}




const AddEditPurchaseModal = ({ isOpen, onClose }: IAddEditPurchaseModal) => {

    const onCloseModal = () => {
        onClose && onClose();
    };

    return (
        <CustomModal
            isShowModal={isOpen}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={1250}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            {isOpen && <AddPurchaseContainer />}
        </CustomModal>

    );

};

export default memo(AddEditPurchaseModal);