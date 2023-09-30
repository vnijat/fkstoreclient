import {memo, useMemo} from "react";
import CustomModal from "../../../../components/customModal";
import AddOrderContainer from "../../../../containers/addOrderContainer";
import {Colors} from "../../../../utils/colors";
import {useWindowDimensions} from "react-native";




interface IAddEditOrderModal {
    isOpen: boolean;
    onClose?: () => void;

}




const AddEditOrderModal = ({isOpen, onClose}: IAddEditOrderModal) => {
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
            {isOpen && <AddOrderContainer />}
        </CustomModal>

    );

};

export default memo(AddEditOrderModal);