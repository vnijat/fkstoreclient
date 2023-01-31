import { useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomModal from "../../../../components/customModal";
import customModal from "../../../../components/customModal";
import TableInput from "../../../../containers/tableInput";
import { ITableConfig, RowDataType } from "../../../../containers/tableInput/types";
import { useGetProjectOrdersQuery } from "../../../../modules/api/projects.api";
import { setIsShowProjectOrdersModal } from "../../../../modules/redux/projectSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";



interface IProectOrdersInfoModal {

}


const ProjectOrdersInfoModal = ({ }: IProectOrdersInfoModal) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const isShowModal = useSelector((state: RootState) => state.projectSlicer.isShowProjectOrdersModal);
    const projectId = useSelector((state: RootState) => state.projectSlicer.projectIdForRequestOrders);
    const { data, isLoading } = useGetProjectOrdersQuery(projectId, {
        selectFromResult: ({ data, isLoading, isUninitialized }) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        skip: !isShowModal
    });

    const tableConfig: ITableConfig[] = [
        { headerTitle: 'NAME', dtoKey: 'name' },
        { headerTitle: 'BARCODE', dtoKey: 'barcode' },
        { headerTitle: 'UNIT', dtoKey: 'unit', },
        { headerTitle: 'QUANTITY', dtoKey: 'quantity', isNumber: true },
        { headerTitle: 'PRICE', dtoKey: 'pricePerUnit', isMoney: true },
        { headerTitle: 'COST ', dtoKey: 'totalPrice', isMoney: true, isSumTotal: true },
    ];

    const onCloseModal = () => {
        dispatch(setIsShowProjectOrdersModal(false));
    };

    return (
        <CustomModal
            isShowModal={isShowModal}
            isDissmissEnabled={false}
            width={1200}
            closeModal={onCloseModal}
        >
            {isShowModal && <View style={{ flex: 1, maxHeight: 700 }}>
                <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.DEFAULT_TEXT_COLOR }}>
                    {'ORDERS'}
                </Text>
                {isLoading ? <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} /> : <TableInput tableData={data} tableConfig={tableConfig} />}
            </View>}
        </CustomModal>
    );


};

export default ProjectOrdersInfoModal;