import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { InventoryApi, useGetItemQuery } from "../../../modules/api/apiSlice";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Item, ItemResponseFull } from "../../../types/item";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";
import TrackStatusColumn from "../../../views/inventoryTrackView/components/customColumns/statusColumn";

interface IProductInfoView {

}

const ProductInfoView = ({ }: IProductInfoView) => {
    const { params } = useRoute<RouteProp<{ params: { barcode: string; }; }>>();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<ItemResponseFull>();


    const getData = async (barcode: string) => {
        try {
            const response = await dispatch(InventoryApi.endpoints.getAllItems.initiate({ search: barcode }));
            if (response.data?.items.length) {
                const productId = response?.data?.items[0].id;
                const fullProductInfo = (await dispatch(InventoryApi.endpoints.getItem.initiate(productId, {
                    forceRefetch: true,
                }))).data;
                if (fullProductInfo) {
                    setData(fullProductInfo);
                }
            }
        } catch (error) {
            console.log("error-getData->", error);
        }
    };

    useEffect(() => {
        if (params?.barcode) {
            getData(params.barcode);
        }
    }, [params.barcode]);


    const DataField = ({ title, value, isMoney }: { title: string, value: any; isMoney?: boolean; }) => {
        return (
            <View style={{ minHeight: 60 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexGrow: 1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center', paddingLeft: 5 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_SMALL, fontWeight: FONT.FONT_BOLD, color: Colors.DEFAULT_TEXT_COLOR }} selectable>
                            {title.toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', flexGrow: 1, paddingLeft: 5 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_LARGE, color: Colors.DEFAULT_TEXT_COLOR }} selectable>
                            {`${value}${isMoney ? '₼' : ''}`.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    
    const renderTransactions = useMemo(() => {
        return (
            data?.transactions.map((data, index) => {
                const columns = [
                    { title: 'date', value: data.updatedat, type: 'date' },
                    { title: 'quantity', value: data.quantity, type: 'money' },
                    { title: 'status', value: data.status, type: 'custom' },
                ];
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 2, marginHorizontal: 2, elevation: 1, backgroundColor: Colors.CARD_HEADER_COLOR }} key={`${index}--${data.id}`}>
                        {columns.map((columnData, index) => {
                            const isCustomColumn = columnData.type === 'custom';
                            const isDate = columnData.type === 'date';

                            return (
                                <View style={{ flex: 1, }} key={`${index}-${columnData.type}`}>
                                    <View style={{ flex: 0.2, margin: 3 }}>
                                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                            {columnData.title.toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.8, margin: 3 }}>
                                        {isCustomColumn
                                            ? <TrackStatusColumn data={data} />
                                            :
                                            <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                                {isDate ? new Date(columnData.value).toLocaleDateString() : Number(columnData.value)}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                );
            })
        );
    }, [data?.transactions]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            <View style={{ flex: 1 }}>
                {!data ?
                    <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]}>
                        <ActivityIndicator color={Colors.METALLIC_GOLD} size={'large'} />
                    </View> :
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 10 }}  >
                        < DataField title={'Barcode'} value={data?.barcode} />
                        <DataField title={'Name'} value={data?.name} />
                        <DataField title={'Description'} value={data?.description} />
                        <DataField title={'Category'} value={data?.category} />
                        <DataField title={'Location'} value={`(${data?.store.name}) ${data?.location.code}`} />
                        <DataField title={'Supplier'} value={data?.supplier.name} />
                        <DataField title={'Color'} value={data?.color.name} />
                        <DataField title={'Label'} value={data?.label.name} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: Colors.CARD_HEADER_COLOR, borderRadius: 1, elevation: 2, margin: 5 }}>
                            <DataField title={'Unit'} value={data?.unit.symbol} />
                            <DataField title={'at Stock'} value={Number(data?.quantity)} />
                            <DataField title={'Cost Price'} value={Number(data?.costPrice)} isMoney />
                            <DataField title={'Cost total'} value={Number(data?.totalCostPrice)} isMoney />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, }}>
                                {'Transactions'.toUpperCase()}
                            </Text>
                        </View>
                        <View>
                            {renderTransactions}
                        </View>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    );
};

export default ProductInfoView;;