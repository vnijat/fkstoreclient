import { memo } from "react";
import CustomModal from "../../../../components/customModal";
import AddOrderContainer from "../../../../containers/addOrderContainer";
import { Colors } from "../../../../utils/colors";




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
            width={1000}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            {isOpen && <AddOrderContainer />}
        </CustomModal>

    );

};

export default memo(AddEditOrderModal);