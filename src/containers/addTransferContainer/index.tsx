
import React from 'react';
import {View} from "react-native";
import InventoryTransfersDataProvider from "../../views/inventoryTransfersView/provider/data";
import InventoryTransfersLogicProvider from "../../views/inventoryTransfersView/provider/logic";



interface IAddTransfersContainer {
    dataProvider: ReturnType<typeof InventoryTransfersDataProvider>;
    logicProvider: ReturnType<typeof InventoryTransfersLogicProvider>;
}

const AddTransfersContainer = ({dataProvider, logicProvider}: IAddTransfersContainer) => {




    return (
        <View>
        </View>
    );
};


export default AddTransfersContainer;