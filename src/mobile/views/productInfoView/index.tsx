import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomPressable from "../../../components/customPressable";
import { InventoryApi } from "../../../modules/api/apiSlice";
import { useGetOrdersQuery } from "../../../modules/api/orders.api";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Item } from "../../../types/item";
import { ProjectOrder } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";

interface IOrdersViewMobile {

}

const ProductInfoView = ({ }: IOrdersViewMobile) => {
    const { params } = useRoute<RouteProp<{ params: { barcode: string; }; }>>();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<Item>({});

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


    const DataField = ({ title, value, isMoney }: { title: string, value: any; isMoney?: boolean; }) => {
        return (
            <View style={{ minHeight: 60 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexGrow: 1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center', paddingLeft: 5 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_SMALL, fontWeight: FONT.FONT_BOLD }} selectable>
                            {title.toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', flexGrow: 1, paddingLeft: 5 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_LARGE }} selectable>
                            {`${value}${isMoney ? '₼' : ''}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            {/* <View style={{ flex: 0.5 }}> */}
            <View style={{ flex: 1 }}>
                {Object.keys(data)?.length ?
                    <ScrollView style={{ flex: 1 }}>
                        < DataField title={'Barcode'} value={data?.barcode} />
                        <DataField title={'Name'} value={data?.name} />
                        <DataField title={'Description'} value={data?.description} />
                        <DataField title={'Category'} value={data?.category.title} />
                        <DataField title={'Location'} value={`(${data?.store.name}) ${data?.location.code}`} />
                        <DataField title={'Supplier'} value={data?.supplier.name} />
                        <DataField title={'Color'} value={data?.color.name} />
                        <DataField title={'Label'} value={data?.label.name} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: Colors.CARD_HEADER_COLOR, borderRadius: 1, elevation: 2, margin: 5 }}>
                            <DataField title={'Unit'} value={data?.unit.symbol} />
                            <DataField title={'at Stock'} value={Number(data?.quantity)} />
                            <DataField title={'Price'} value={Number(data?.pricePerUnit)} isMoney />
                            <DataField title={'Total Price'} value={Number(data?.totalPrice)} isMoney />
                        </View>
                    </ScrollView>
                    : <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]}>
                        <ActivityIndicator color={Colors.METALLIC_GOLD} size={'large'} />
                    </View>
                }
            </View>
            {/* </View> */}
            {/* <View style={{ flex: 0.5 }}>
            </View> */}
        </SafeAreaView>
    );
};

export default ProductInfoView;;