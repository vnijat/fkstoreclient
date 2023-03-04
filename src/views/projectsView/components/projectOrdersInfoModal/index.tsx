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
import { Project } from "../../../../types/project";
import { OrderItem } from "../../../../types/projectOrder";
import { Colors } from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import { getStyle } from "./styles";



interface IProectOrdersInfoModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectOrdersInfoModal = ({ logicProvider, dataProvider }: IProectOrdersInfoModal) => {
    const { handleOnCloseProjectOrdersModal } = logicProvider;
    const { projectOrdersData: { data, isLoading }, isShowProjectOrdersModal } = dataProvider;
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const tableConfig: ITableConfig<OrderItem>[] = [
        { headerTitle: 'ORDER DATE', dtoKey: 'updatedAt', isDate: true },
        { headerTitle: 'NAME', dtoKey: 'name' },
        { headerTitle: 'BARCODE', dtoKey: 'barcode' },
        { headerTitle: 'UNIT', dtoKey: 'unit', },
        { headerTitle: 'QUANTITY', dtoKey: 'quantity', isNumber: true },
        { headerTitle: 'PRICE', dtoKey: 'pricePerUnit', isMoney: true },
        { headerTitle: 'COST ', dtoKey: 'totalPrice', isMoney: true, isSumTotal: true },
    ];



    return (
        <CustomModal
            isShowModal={isShowProjectOrdersModal}
            isDissmissEnabled={false}
            width={1200}
            closeModal={handleOnCloseProjectOrdersModal}
        >
            {isShowProjectOrdersModal && <View style={{ flex: 1, maxHeight: 700 }}>
                <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.DEFAULT_TEXT_COLOR }}>
                    {'ORDERS'}
                </Text>
                {isLoading ? <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} /> : <TableInput tableData={data} tableConfig={tableConfig} />}
            </View>}
        </CustomModal>
    );


};

export default ProjectOrdersInfoModal;