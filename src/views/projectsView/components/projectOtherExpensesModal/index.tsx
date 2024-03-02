import { useMemo } from "react";
import {  View } from "react-native";
import CustomModal from "../../../../components/customModal";
import customModal from "../../../../components/customModal";
import SimpleTable from "../../../../containers/simpleTable";
import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { OtherExpensesType, Project } from "../../../../types/project";
import { OrderItem } from "../../../../types/projectOrder";
import { Colors } from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import { getStyle } from "./styles";



interface IProectOtherExpensesModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectOtherExpensesModal = ({ logicProvider, dataProvider }: IProectOtherExpensesModal) => {
    const { handleOnCloseOtherExpensesModal } = logicProvider;
    const { otherExpensesData: { data, isLoading }, isShowOtherExpensesModal } = dataProvider;
    const style = useMemo(() => getStyle(), []);

    const tableConfig: ITableDataConfig<OtherExpensesType>[] = [
        { headerTitle: 'DATE', dtoKey: 'updatedAt', type: 'date', hidden: false },
        { headerTitle: 'TITLE', dtoKey: 'title', type: 'text', hidden: false },
        { headerTitle: 'DESCRIPTION', dtoKey: 'description', type: 'text', hidden: false },
        { headerTitle: 'COST ', dtoKey: 'cost', type: 'money', hidden: false },
    ];

    return (
        <CustomModal
            isShowModal={isShowOtherExpensesModal}
            isDissmissEnabled={false}
            width={1200}
            closeModal={handleOnCloseOtherExpensesModal}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            <View style={{ height: 400, backgroundColor: Colors.CARD_HEADER_COLOR, padding: 5 }}>
                <SimpleTable tableData={data ?? []} tableDataConfig={tableConfig} isLoading={isLoading} rowHeight={40} />
            </View>
        </CustomModal>
    );


};

export default ProjectOtherExpensesModal;