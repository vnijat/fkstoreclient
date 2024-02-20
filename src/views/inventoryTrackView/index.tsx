import React, { useMemo } from "react";
import { View } from "react-native";
import PaginationContainer from "../../containers/paginationContainer";
import SimpleTable from "../../containers/simpleTable";
import { ICustomColumn } from "../../containers/simpleTable/types";
import { InventoryTrackData } from "../../types/inventory";
import TrackStatusColumn from "./components/customColumns/statusColumn";
import TrackHeader from "./components/header";
import { getStyle } from "./styles";
import InventoryTrackLogicProvider from "./provider/logic";
import InventoryTrackDataProvider from "./provider/data";



interface IInventoryTrackView {

}


const InventoryTrackView = () => {
    const dataProvider = InventoryTrackDataProvider();
    const logicProvider = InventoryTrackLogicProvider();
    const { queryData: {
        data: queryData,
        isLoading
    },
        tableConfig
    } = dataProvider;
    const { handlePagination, handleResetTableConfig, handleNewTableData } = logicProvider;
    const style = useMemo(() => getStyle(), []);


    const customColumns: ICustomColumn<InventoryTrackData> = {
        status: ({ data }) => <TrackStatusColumn data={data} />
    };


    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.05 }} />
            <View style={style.container}>
                <View style={{ flexShrink: 1 }}>
                    <TrackHeader {...{ dataProvider, logicProvider }} />
                </View>
                <View style={{ flex: 1 }}>
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


export default InventoryTrackView;