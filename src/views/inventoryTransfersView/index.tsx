import React, {useMemo} from "react";
import {View} from "react-native";
import PaginationContainer from "../../containers/paginationContainer";
import SimpleTable from "../../containers/simpleTable";
import {ICustomColumn} from "../../containers/simpleTable/types";
import {InventoryTrackData, InventoryTransfers} from "../../types/inventory";
import TrackHeader from "./components/header";
import {getStyle} from "./styles";
import TransfersHeader from "./components/header";
import StoreColumn from "./components/customColumns/storeColumn";
import ItemColumn from "./components/customColumns/itemColumn";
import InventoryTransfersLogicProvider from "./provider/logic";
import InventoryTransfersDataProvider from "./provider/data";



interface IInventoryTransfersView {

}


const InventoryTransfersView = ({}: IInventoryTransfersView) => {
    const dataProvider = InventoryTransfersDataProvider();
    const logicProvider = InventoryTransfersLogicProvider();
    const {queryData: {
        data: queryData,
        isLoading
    },
        tableConfig
    } = dataProvider;
    const {handlePagination, handleResetTableConfig, handleNewTableData} = logicProvider;
    const style = useMemo(() => getStyle(), []);


    const customColumns: ICustomColumn<InventoryTransfers> = {
        transferedFromItem: ({data}) => <ItemColumn data={data?.transferedFromItem} />,
        originalStore: ({data}) => <StoreColumn data={data?.originalStore} />,
        destinationStore: ({data}) => <StoreColumn data={data?.destinationStore} />,
        generatedItem: ({data}) => <ItemColumn data={data?.generatedItem} />,
        transferedToItem: ({data}) => <ItemColumn data={data?.transferedToItem} />,
    };


    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.05}} />
            <View style={style.container}>
                <View style={{flexShrink: 1}}>
                    <TransfersHeader {...{dataProvider, logicProvider}} />
                </View>
                <View style={{flex: 1}}>
                    <SimpleTable
                        tableData={queryData?.data ?? []}
                        onResetTable={handleResetTableConfig}
                        tableDataConfig={tableConfig}
                        getNewTableConfig={handleNewTableData}
                        customColumns={customColumns}
                        rowHeight={45}
                    />
                </View>
                <View style={style.footer}>
                    <PaginationContainer paginationHandler={handlePagination} meta={queryData?.meta!} />
                </View>
            </View>
        </View>
    );
};


export default InventoryTransfersView;