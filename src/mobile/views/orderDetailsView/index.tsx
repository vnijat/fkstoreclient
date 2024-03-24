import {View} from "react-native";
import {ProjectOrder} from "../../../types/projectOrder";
import OrderDataProvider from "../../../views/orderView/provider/data";
import OrderLogicProvider from "../../../views/orderView/provider/logic";
import {SafeAreaView} from "react-native-safe-area-context";
import {useMemo} from "react";
import {getStyle} from "./styles";




interface IOrderDetailsView {
}

const OrderDetailsView = ({}: IOrderDetailsView) => {
    const dataProvider = OrderDataProvider();
    const logicProvider = OrderLogicProvider();
    const {
        searchProductForOrder,
        orderDataForPost,
        projectsForPicker,
    } = dataProvider;
    const {
        onPressRowItem,
        addScannedProductToOrder,
        handleAddProductForOrder,
        handlePagination,
        handdleCreateNewOrder,
        handleUpdateProductInOrder,
        handleSetOrderDataForPost,
        hanldeDeleteProductFromOrder,
        handlePostNewOrderData,
        handleUpdateOrder
    } = logicProvider;
    const style = useMemo(() => getStyle(), []);
    const {orderItems} = orderDataForPost;

    return (
        <SafeAreaView style={style.container}>
            <View style={style.topContainer}>
            </View>
            <View style={style.contentContainer}>
            </View>
            <View style={style.actionsContainer}>
            </View>
        </SafeAreaView>
    );

};

export default OrderDetailsView;