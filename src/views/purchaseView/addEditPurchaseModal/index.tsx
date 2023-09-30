import React, {memo, useMemo} from "react";
import CustomModal from "../../../components/customModal";
import AddPurchaseContainer from "../../../containers/addPurchaseContainer";
import {Colors} from "../../../utils/colors";
import {useWindowDimensions} from "react-native";




interface IAddEditPurchaseModal {
    isOpen: boolean;
    onClose?: () => void;

}




const AddEditPurchaseModal = ({isOpen, onClose}: IAddEditPurchaseModal) => {
    const {width} = useWindowDimensions();
    const modalWidth = useMemo(() => width - 200, [width]);
    const onCloseModal = () => {
        onClose && onClose();
    };

    return (
        <CustomModal
            isShowModal={isOpen}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={modalWidth}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            {isOpen && <AddPurchaseContainer />}
        </CustomModal>

    );

};

export default memo(AddEditPurchaseModal);