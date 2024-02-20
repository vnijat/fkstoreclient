import {memo, useMemo} from "react";
import CustomModal from "../../../../components/customModal";
import {Colors} from "../../../../utils/colors";
import {useWindowDimensions} from "react-native";
import AddTransfersContainer from "../../../../containers/addTransferContainer";
import InventoryTransfersDataProvider from "../../provider/data";
import InventoryTransfersLogicProvider from "../../provider/logic";




interface IAddEditTransfersModal {
    isOpen: boolean;
    onClose?: () => void;
    dataProvider: ReturnType<typeof InventoryTransfersDataProvider>;
    logicProvider: ReturnType<typeof InventoryTransfersLogicProvider>;

}




const AddEditTransfersModal = ({isOpen, onClose, dataProvider, logicProvider}: IAddEditTransfersModal) => {
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
            {isOpen && <AddTransfersContainer {...{dataProvider, logicProvider}} />}
        </CustomModal>

    );

};

export default memo(AddEditTransfersModal);