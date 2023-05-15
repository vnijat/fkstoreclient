import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Keyboard, TextInput } from "react-native";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../components/customPressable";
import { PrimaryButton } from "../../../components/primaryButton";
import { OrderStatus } from "../../../enums/orderStatus";
import { Item } from "../../../types/item";
import { AddOrderDto, OrderItem, ProjectOrder } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";
import OrderDataProvider from "../../../views/orderView/provider/data";
import OrderLogicProvider from "../../../views/orderView/provider/logic";
import SearchWithDropDown from "../../components/searchWithDropDown";
import ProductListItem from "../productsView/components/productListItem";
import OrderListCard from "./components/orderListCard";
import OrdersCartListCard from "./components/ordersCartListCard";
import { getStyle } from "./styles";
import { RootStackMobileParamList } from "../../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNames } from "../../../enums/routes";

interface IOrdersViewMobile {
    navigation: StackNavigationProp<RootStackMobileParamList>;

}

const OrdersViewMobile = ({ navigation }: IOrdersViewMobile) => {
    const style = useMemo(() => getStyle(), []);
    const dataProvider = OrderDataProvider();
    const logicProvider = OrderLogicProvider();
    const { queryData: { data, isLoading },
        searchProductForOrder,
        orderDataForPost
    } = dataProvider;
    const { handlePagination,
        handleAddProductForOrder,
        onPressRowItem,
        handdleCreateNewOrder,
        handleUpdateProductInOrder,
        handleSetOrderDataForPost
    } = logicProvider;
    const [isLoadMore, setLoadMore] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['80%'], []);
    const [isHideSearchResuts, setHideSearchResults] = useState(false);
    const [searchResult, setSearchResult] = useState<Item[]>();
    const isOrderInprogress = useMemo(() => OrderStatus.PENDING === orderDataForPost.status, [orderDataForPost]);

    useEffect(() => {
        if (isLoadMore) {
            handlePagination({ take: (data?.meta.take ?? 10) + 10 });
        }
    }, [isLoadMore]);

    useEffect(() => {
        if (!isLoading) {
            isLoadMore && setTimeout(() => {
                setLoadMore(false);
            }, 300);
        }
    }, [isLoading]);


    const hanldeOrderValueChange = (value: any, dtoKey: keyof AddOrderDto) => {
        handleSetOrderDataForPost({ [dtoKey]: value });
    };


    const handleProductSearch = async (value: string) => {
        const products = await searchProductForOrder(value);
        setSearchResult(products);
    };

    const onPressSearchedProduct = (data: Item) => {
        handleAddProductForOrder(data);
        setHideSearchResults(true);
        setTimeout(() => setHideSearchResults(false), 100);
    };

    const onPressCard = (data: ProjectOrder) => {
        onPressRowItem(data);
        bottomSheetRef.current?.expand();
    };

    const bottomSheetBackDrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior={'none'}
        />
    ), []);

    const onListEndReach = () => {
        const isHasNewData = data?.orders?.length < data?.meta?.count;
        if (isHasNewData) {
            setLoadMore(true);
        }
    };

    const handleNewOrder = () => {
        handdleCreateNewOrder();
        bottomSheetRef.current?.expand();
    };


    const hanldeCreateOrder = () => {

    };

    const hanldeUpdateOrder = () => {

    };

    const handleConfirmOrder = () => {

    };

    const listFooter = useCallback(() => {
        if (isOrderInprogress && orderDataForPost.orderItems?.length) {
            return (
                <View style={{ width: '100%', height: 60, bottom: 0, marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                    <PrimaryButton title={'CREATE'} onPress={hanldeCreateOrder} borderRadius={3} buttonColor={Colors.METALLIC_GOLD} />
                    <PrimaryButton title={'UPDATE'} onPress={hanldeUpdateOrder} borderRadius={3} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    <PrimaryButton title={'CONFIRM'} onPress={handleConfirmOrder} borderRadius={3} buttonColor={Colors.COMPLETED_COLOR} />
                </View >
            );
        }
    }, [isOrderInprogress, orderDataForPost.orderItems]);


    const renderLoadingMore = useMemo(() => {
        if (isLoadMore) {
            return (
                <View
                    style={{ position: 'absolute', bottom: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.METALLIC_GOLD, borderRadius: 3, elevation: 1, zIndex: 3, padding: 5, minWidth: 80 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.CARD_COLOR, fontSize: FONT.FONT_SIZE_SMALL }}>
                            {'LOADING MORE '}
                        </Text>
                        <ActivityIndicator size={'small'} color={Colors.CARD_COLOR} />
                    </View>

                </View>
            );
        } else {
            return null;
        }

    }, [isLoadMore]);


    const rednderOrderDetailInput = useMemo(() => {
        if (!!orderDataForPost.orderItems?.length) {
            return (
                <View style={{ minHeight: 60, width: '100%', paddingHorizontal: 5, paddingTop: 5, marginBottom: 5 }}>
                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_SMALL }}>
                        {'ORDER DETAIL'}
                    </Text>
                    <TextInput
                        style={{ borderRadius: 3, backgroundColor: Colors.CARD_HEADER_COLOR, padding: 3, height: 40, color: Colors.DEFAULT_TEXT_COLOR }}
                        multiline={true}
                        onChangeText={(value) => hanldeOrderValueChange(value, 'detail')}
                        textAlignVertical={'top'}
                        value={orderDataForPost.detail ?? ''}
                        editable={isOrderInprogress}
                    />
                </View>
            );
        };
    }, [isOrderInprogress, orderDataForPost.detail, orderDataForPost.orderItems]);



    const onCardValueChange = (value: { data: { [key in keyof OrderItem]?: any; }, itemId: number; }) => {
        handleUpdateProductInOrder(value);
    };

    const handleOnCloseSheet = () => {
        Keyboard.dismiss();
    };

    const handleOnpressScan = () => {
        navigation.navigate(RouteNames.SCAN);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }} >
            <CustomPressable
                android_ripple={{ color: Colors.METALLIC_GOLD, radius: 22 }}
                onPress={handleNewOrder}
                style={{ position: 'absolute', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, bottom: 15, right: 15, zIndex: 1, elevation: 3, borderWidth: 2, borderColor: Colors.DEFAULT_TEXT_COLOR }}>
                <Icon name={'plus'} size={30} color={Colors.METALLIC_GOLD} />
            </CustomPressable>
            <FlatList
                data={data?.orders}
                onEndReached={onListEndReach}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => <OrderListCard
                    data={item}
                    onPressCard={() => onPressCard(item)}
                    {...{ index }}
                />
                }
            />
            {renderLoadingMore}
            <BottomSheet
                ref={bottomSheetRef}
                handleComponent={() => {
                    return (
                        <View style={{ height: 20, backgroundColor: Colors.CARD_COLOR, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <CustomPressable
                                onPress={() => bottomSheetRef.current?.close()}
                                style={{ position: 'absolute', top: -20, height: 40, width: 40, borderRadius: 40, backgroundColor: Colors.CARD_COLOR, elevation: 2, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <MIcon name={'window-close'} size={20} color={Colors.METALLIC_GOLD} />
                            </CustomPressable>
                        </View>
                    );
                }}
                index={-1}
                onClose={handleOnCloseSheet}
                snapPoints={snapPoints}
                // enablePanDownToClose
                containerStyle={{ zIndex: 4 }}
                backdropComponent={bottomSheetBackDrop}
            // handleStyle={{ backgroundColor: Colors.CARD_COLOR, elevation: 2, borderTopEndRadius: 10, borderTopStartRadius: 10 }}
            >
                <View style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }} >
                    <View style={{ flexDirection: 'row' }}>
                        {isOrderInprogress &&
                            <>
                                < SearchWithDropDown
                                    hideDropDwon={isHideSearchResuts}
                                    getSearchValue={handleProductSearch}
                                    searchPlaceHolder={'Type product barcode or name :'}
                                >
                                    <BottomSheetScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{ paddingVertical: 5 }} indicatorStyle={'black'} showsVerticalScrollIndicator={true}>
                                        {!!searchResult?.length && searchResult.map((product, index) => {
                                            return (
                                                <ProductListItem key={`product ${index}`} data={product} onPress={() => onPressSearchedProduct(product)} />
                                            );
                                        })}
                                    </BottomSheetScrollView>
                                </SearchWithDropDown>
                                <CustomPressable style={{ width: 30, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}
                                    onPress={handleOnpressScan}
                                >
                                    <MIcon name={'barcode-scan'} size={30} color={Colors.METALLIC_GOLD} />
                                </CustomPressable>
                            </>
                        }
                    </View>
                    {rednderOrderDetailInput}
                    <BottomSheetFlatList
                        data={orderDataForPost.orderItems}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        ListFooterComponent={listFooter}
                        renderItem={({ item, index }) => <OrdersCartListCard data={item}  {...{ index }} onValueChange={onCardValueChange} />}
                    />
                </View>
            </BottomSheet>
        </SafeAreaView >

    );
};

export default OrdersViewMobile;