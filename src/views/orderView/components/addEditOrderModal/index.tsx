import { memo } from "react";
import CustomModal from "../../../../components/customModal";
import AddOrderContainer from "../../../../containers/addOrderContainer";




interface IAddEditOrderModal {
    isOpen: boolean;
    onClose?: () => void;

}




const AddEditOrderModal = ({ isOpen, onClose }: IAddEditOrderModal) => {

    const onCloseModal = () => {
        onClose && onClose();
    };

    return (
        <CustomModal
            isShowModal={isOpen}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={800}
        >
            {isOpen && <AddOrderContainer />}
        </CustomModal>

    );

};

export default memo(AddEditOrderModal);