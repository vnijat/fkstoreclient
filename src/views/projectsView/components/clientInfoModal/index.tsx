import { memo, useMemo } from "react";
import { View } from "react-native-windows";
import { useSelector } from "react-redux";
import CustomModal from "../../../../components/customModal";
import ClientCard from "../../../../containers/clientCard";
import { setIsOpenClientInfoModal } from "../../../../modules/redux/projectSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { getStyle } from "./styles";



interface IIclientInfoModal {


}



const ClientInfoModal = ({ }: IIclientInfoModal) => {
    const dispatch = useAppDispatch();
    const { firstName,
        lastName,
        companyName,
        projectsCompleted,
        projectsDeclined,
        projectsInProgress,
        totalProjects,
        type,
        phone,
        email,
        id } = useSelector((state: RootState) => state.projectSlicer.clientInfoData);
    const isOpenClientInfoModal = useSelector((state: RootState) => state.projectSlicer.isOpenClientInfoModal);

    const style = useMemo(() => getStyle, []);


    const onCloseModal = () => {
        dispatch(setIsOpenClientInfoModal(false));
    };

    return (
        <CustomModal
            isShowModal={isOpenClientInfoModal}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={350}
        >
            <View style={{ flex: 1 }}>
                {isOpenClientInfoModal && <ClientCard
                    {...{
                        firstName,
                        lastName,
                        companyName,
                        projectsCompleted,
                        projectsDeclined,
                        projectsInProgress,
                        totalProjects,
                        type,
                        phone,
                        email,
                        id
                    }} withAction={false} />}
            </View>
        </CustomModal>

    );

};


export default memo(ClientInfoModal);