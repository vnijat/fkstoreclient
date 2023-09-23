import {useMemo} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {useSelector} from "react-redux";
import CustomModal from "../../../../components/customModal";
import customModal from "../../../../components/customModal";
import SimpleTable from "../../../../containers/simpleTable";
import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import TableInput from "../../../../containers/tableInput";
import {ITableConfig, RowDataType} from "../../../../containers/tableInput/types";
import {useGetProjectOrdersQuery} from "../../../../modules/api/projects.api";
import {setIsShowProjectOrdersModal} from "../../../../modules/redux/projectSlicer";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import {Project} from "../../../../types/project";
import {OrderItem} from "../../../../types/projectOrder";
import {Colors} from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import {getStyle} from "./styles";



interface IProectOrdersInfoModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectOrdersInfoModal = ({logicProvider, dataProvider}: IProectOrdersInfoModal) => {
    const {handleOnCloseProjectOrdersModal} = logicProvider;
    const {projectOrdersData: {data, isLoading}, isShowProjectOrdersModal} = dataProvider;
    const style = useMemo(() => getStyle(), []);
    
    const tableConfig: ITableDataConfig<OrderItem>[] = [
        {headerTitle: 'ORDER ID', dtoKey: 'orderId', type: 'numeric', hidden: false},
        {headerTitle: 'ORDER DATE', dtoKey: 'updatedAt', type: 'date', hidden: false},
        {headerTitle: 'NAME', dtoKey: 'name', type: 'text', hidden: false},
        {headerTitle: 'Store', dtoKey: 'store', type: 'text', isObject: true, objectDtoKey: 'name', hidden: false},
        {headerTitle: 'BARCODE', dtoKey: 'barcode', type: 'text', hidden: false},
        {headerTitle: 'UNIT', dtoKey: 'unit', type: 'text', hidden: false},
        {headerTitle: 'QUANTITY', dtoKey: 'quantity', type: 'numeric', hidden: false},
        {headerTitle: 'PRICE', dtoKey: 'pricePerUnit', type: 'money', hidden: false},
        {headerTitle: 'COST ', dtoKey: 'totalPrice', type: 'money', hidden: false},
    ];

    return (
        <CustomModal
            isShowModal={isShowProjectOrdersModal}
            isDissmissEnabled={false}
            width={1200}
            closeModal={handleOnCloseProjectOrdersModal}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            <View style={{height: 400, backgroundColor: Colors.CARD_HEADER_COLOR, padding: 5}}>
                <SimpleTable tableData={data ?? []} tableDataConfig={tableConfig} isLoading={isLoading} rowHeight={40} />
            </View>
        </CustomModal>
    );


};

export default ProjectOrdersInfoModal;