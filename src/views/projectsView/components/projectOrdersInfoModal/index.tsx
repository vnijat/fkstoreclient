import {useMemo} from "react";
import {View} from "react-native";
import CustomModal from "../../../../components/customModal";
import SimpleTable from "../../../../containers/simpleTable";
import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import {OrderItem} from "../../../../types/projectOrder";
import {Colors} from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import {getStyle} from "./styles";
import HELP from "../../../../services/helpers";
import {Role} from "../../../../enums/userRole";



interface IProectOrdersInfoModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectOrdersInfoModal = ({logicProvider, dataProvider}: IProectOrdersInfoModal) => {
    const {handleOnCloseProjectOrdersModal} = logicProvider;
    const {projectOrdersData: {data, isLoading}, isShowProjectOrdersModal} = dataProvider;
    const style = useMemo(() => getStyle(), []);
    const hasPermission = HELP.hasPermission([Role.MANAGER, Role.SUPER_ADMIN]);
    const tableConfig: ITableDataConfig<OrderItem>[] = [
        // {headerTitle: 'ORDER ID', dtoKey: 'orderId', type: 'numeric', hidden: false},
        {headerTitle: 'ORDER DATE', dtoKey: 'updatedAt', type: 'date', hidden: false},
        {headerTitle: 'NAME', dtoKey: 'name', type: 'text', hidden: false},
        {headerTitle: 'BARCODE', dtoKey: 'barcode', type: 'text', hidden: false},
        {headerTitle: 'UNIT', dtoKey: 'unit', type: 'text', hidden: false},
        {headerTitle: 'QUANTITY', dtoKey: 'quantity', type: 'numeric', hidden: false},
        {headerTitle: 'Store', dtoKey: 'store', type: 'text', isObject: true, objectDtoKey: 'name', hidden: false},
        {headerTitle: 'PRICE', dtoKey: 'pricePerUnit', type: 'money', hidden: !hasPermission},
        {headerTitle: 'COST ', dtoKey: 'totalPrice', type: 'money', hidden: !hasPermission},
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