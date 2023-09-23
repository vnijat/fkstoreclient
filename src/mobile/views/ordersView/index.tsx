import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetScrollView, BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {format} from "date-fns";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FlatList, Text, View, ActivityIndicator, Keyboard, TextInput} from "react-native";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../components/customPressable";
import {PrimaryButton} from "../../../components/primaryButton";
import {OrderStatus} from "../../../enums/orderStatus";
import {Item} from "../../../types/item";
import {AddOrderDto, OrderItem, ProjectOrder} from "../../../types/projectOrder";
import {Colors} from "../../../utils/colors";
import FONT from "../../../utils/font";
import OrderDataProvider from "../../../views/orderView/provider/data";
import OrderLogicProvider from "../../../views/orderView/provider/logic";
import SearchWithDropDown from "../../components/searchWithDropDown";
import ProductListItem from "../productsView/components/productListItem";
import OrderListCard from "./components/orderListCard";
import OrdersCartListCard from "./components/ordersCartListCard";
import {getStyle} from "./styles";
import {BottomTabMobileStack, RootStackMobileParamList} from "../../../types/navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteNames} from "../../../enums/routes";

interface IOrdersViewMobile {
    navigation: StackNavigationProp<BottomTabMobileStack>;

}

const OrdersViewMobile = ({navigation}: IOrdersViewMobile) => {
    const style = useMemo(() => getStyle(), []);
    const dataProvider = OrderDataProvider();
    const logicProvider = OrderLogicProvider();
    const {queryData: {data, isLoading},
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
    const [isLoadMore, setLoadMore] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['80%'], []);
    const [isHideSearchResuts, setHideSearchResults] = useState(false);
    const [searchResult, setSearchResult] = useState<Item[]>();
    const [isProductForOrderLoading, setIsProductForSearchLoading] = useState(false);
    const isOrderInprogress = useMemo(() => OrderStatus.PENDING === orderDataForPost.status, [orderDataForPost]);

    useEffect(() => {
        if (isLoadMore) {
            handlePagination({take: (data?.meta.take ?? 10) + 10});
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
        handleSetOrderDataForPost({[dtoKey]: value});
    };

    const handleProductSearch = async (value: string) => {
        setIsProductForSearchLoading(true);
        const data = await searchProductForOrder(value);
        setSearchResult(data);
        setIsProductForSearchLoading(false);
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


    const hanldeCreateOrder = async () => {
        await handlePostNewOrderData(orderDataForPost);
    };

    const hanldeUpdateOrder = async () => {
        await handleUpdateOrder({...orderDataForPost});
    };

    const handleConfirmOrder = async () => {
        await handleUpdateOrder({...orderDataForPost, status: OrderStatus.COMPLETED});
    };

    const onCardValueChange = (value: {data: {[key in keyof OrderItem]?: any;}, itemId: number;}) => {
        handleUpdateProductInOrder(value);
    };

    const handleOnCloseSheet = () => {
        Keyboard.dismiss();
    };

    const handleOnpressScan = () => {
        navigation.navigate(RouteNames.SCAN, {isFromOrder: true, addScannedProductToOrder});
    };


    const listFooter = useCallback(() => {
        const isShowCreateButton = isOrderInprogress && !orderDataForPost.id;
        const isOrderCreated = orderDataForPost.id;
        if (isOrderInprogress && orderDataForPost.orderItems?.length) {
            return (
                <View style={{width: '100%', height: 60, bottom: 0, marginTop: 5, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                    {isShowCreateButton && <PrimaryButton title={'CREATE'} onPress={hanldeCreateOrder} borderRadius={3} buttonColor={Colors.METALLIC_GOLD} />}
                    {isOrderCreated &&
                        <>
                            <PrimaryButton android_ripple={{color: Colors.METALLIC_GOLD}} title={'UPDATE'} onPress={hanldeUpdateOrder} borderRadius={3} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                            <PrimaryButton android_ripple={{color: Colors.METALLIC_GOLD}} title={'CONFIRM'} onPress={handleConfirmOrder} borderRadius={3} buttonColor={Colors.COMPLETED_COLOR} />
                        </>
                    }
                </View >
            );
        } else {
            return null;
        }
    }, [isOrderInprogress, orderDataForPost.orderItems, orderDataForPost.status, orderDataForPost]);


    const renderLoadingMore = useMemo(() => {
        if (isLoadMore) {
            return (
                <View
                    style={{position: 'absolute', bottom: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.METALLIC_GOLD, borderRadius: 3, elevation: 1, zIndex: 3, padding: 5, minWidth: 80}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Colors.CARD_COLOR, fontSize: FONT.FONT_SIZE_SMALL}}>
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


    const renderOrderDetailInput = useMemo(() => {
        if (!!orderDataForPost.orderItems?.length) {
            return (
                <View style={{minHeight: 60, width: '100%', paddingHorizontal: 5, paddingTop: 5, marginBottom: 5}}>
                    <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_SMALL}}>
                        {'ORDER DETAIL'}
                    </Text>
                    <TextInput
                        style={{borderRadius: 3, backgroundColor: Colors.CARD_HEADER_COLOR, padding: 3, height: 40, color: Colors.DEFAULT_TEXT_COLOR}}
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




    const bottomSheetHandler = () => {
        return (
            <View style={{height: 20, backgroundColor: Colors.CARD_COLOR, borderTopLeftRadius: 10, borderTopRightRadius: 10, elevation: 2}}>
                <CustomPressable
                    onPress={() => bottomSheetRef.current?.close()}
                    style={{position: 'absolute', top: -20, height: 40, width: 40, borderRadius: 40, backgroundColor: Colors.CARD_COLOR, elevation: 2, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <MIcon name={'window-close'} size={20} color={Colors.METALLIC_GOLD} />
                </CustomPressable>
            </View>
        );
    };


    const renderDropDownSearch = useMemo(() => {
        return (
            < SearchWithDropDown
                searchResultData={searchResult!}
                searchPlaceHolder={'Type product barcode or name :'}
                onPressItem={onPressSearchedProduct}
                isDataLoading={isProductForOrderLoading}
                searchResultListItem={({data}) => <ProductListItem data={data} />}
                getSearchValue={handleProductSearch} />
        );
    }, [searchResult?.length, isProductForOrderLoading, isHideSearchResuts]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.CARD_COLOR}} >
            <CustomPressable
                onPress={handleNewOrder}
                style={{position: 'absolute', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, bottom: 15, right: 15, zIndex: 1, elevation: 3, }}>
                <Icon name={'plus'} size={30} color={Colors.METALLIC_GOLD} />
            </CustomPressable>
            <FlatList
                data={data?.orders}
                onEndReached={onListEndReach}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => <OrderListCard
                    data={item}
                    onPressCard={() => onPressCard(item)}
                    {...{index}}
                />
                }
            />
            {renderLoadingMore}
            <BottomSheet
                ref={bottomSheetRef}
                handleComponent={bottomSheetHandler}
                index={-1}
                onClose={handleOnCloseSheet}
                snapPoints={snapPoints}
                containerStyle={{zIndex: 4}}
                enableContentPanningGesture={false}
                backdropComponent={bottomSheetBackDrop}
            >
                <View style={{flex: 1, backgroundColor: Colors.CARD_COLOR}} >
                    <View style={{flexDirection: 'row'}}>
                        {isOrderInprogress &&
                            <>
                                {renderDropDownSearch}
                                <CustomPressable style={{width: 30, justifyContent: 'center', alignItems: 'center', marginRight: 5}}
                                    onPress={handleOnpressScan}
                                >
                                    <MIcon name={'barcode-scan'} size={30} color={Colors.METALLIC_GOLD} />
                                </CustomPressable>
                            </>
                        }
                    </View>
                    {renderOrderDetailInput}
                    <BottomSheetFlatList
                        data={orderDataForPost.orderItems}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        ListFooterComponent={listFooter}
                        keyboardShouldPersistTaps={'handled'}
                        renderItem={({item, index}) => <OrdersCartListCard data={item}  {...{index, projectsForPicker}} onValueChange={onCardValueChange} handleRemove={hanldeDeleteProductFromOrder} />}
                    />
                </View>
            </BottomSheet>
        </SafeAreaView >

    );
};

export default OrdersViewMobile;