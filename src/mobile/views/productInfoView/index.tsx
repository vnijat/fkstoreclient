import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomPressable from "../../../components/customPressable";
import { InventoryApi } from "../../../modules/api/apiSlice";
import { useGetOrdersQuery } from "../../../modules/api/orders.api";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Item } from "../../../types/item";
import { ProjectOrder } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";

interface IOrdersViewMobile {

}

const ProductInfoView = ({ }: IOrdersViewMobile) => {
    const { params } = useRoute<RouteProp<{ params: { barcode: string; }; }>>();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<Item>();

    const getData = async (barcode: string) => {
        const response = await dispatch(InventoryApi.endpoints.getAllItems.initiate({ search: barcode }));
        if (response.data?.items.length) {
            setData(response?.data?.items[0]);
        }
    };

    useEffect(() => {
        if (params?.barcode) {
            getData(params.barcode);
        }
    }, [params]);

    const dataToMap: { title: string, value: any; }[] = [
        // { title:, value:}
    ];

    console.log("data--->>", data);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            {
                data && Object.keys(data).map((title, index) => {
                    if (typeof data[title as keyof Item] !== 'object') {
                        return (
                            <View style={{ margin: 1, backgroundColor: Colors.CARD_COLOR }} key={`${index}`}>
                                <Text>{`${title} : ${data[title as keyof Item]}`} </Text>
                            </View>
                        );
                    }
                })

            }
        </SafeAreaView>
    );
};

export default ProductInfoView;;