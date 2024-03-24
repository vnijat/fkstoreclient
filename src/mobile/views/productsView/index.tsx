import {RouteProp, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {View, FlatList, Pressable, Dimensions, KeyboardAvoidingView, Platform, Text, ActivityIndicator, ListRenderItem} from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomPressable from "../../../components/customPressable";
import {InputItem} from "../../../components/inputItem";
import {RouteNames} from "../../../enums/routes";
import {Item} from "../../../types/item";
import {RootStackMobileParamList} from "../../../types/navigation";
import {Colors} from "../../../utils/colors";
import FONT from "../../../utils/font";
import WareHouseDataProvider from "../../../views/warehouseView/provider/data";
import WareHouseLogicProvider from "../../../views/warehouseView/provider/logic";
import ProductListItem from "./components/productListItem";
import {getStyle} from "./syles";
import PaginationContainer from "../../../containers/paginationContainer";
import ListFooterMobile from "../../components/listFooter";



interface IProductView {
    navigation: StackNavigationProp<RootStackMobileParamList>;
}


const ProductView = ({navigation}: IProductView) => {
    const style = useMemo(() => getStyle(), []);
    const dataProvider = WareHouseDataProvider();
    const logicProvider = WareHouseLogicProvider();
    const {queryData: {data: query, isLoading}, wareHouseQueryParams} = dataProvider;
    const {handleSearchValueChange, paginationHandler} = logicProvider;
    const [isLoadMore, setLoadMore] = useState(false);
    const ICON_SIZE = 12;

    useEffect(() => {
        if (isLoadMore) {
            paginationHandler({take: (query?.meta.take ?? 10) + 10});
        }
    }, [isLoadMore]);


    useEffect(() => {
        if (!isLoading) {
            isLoadMore && setTimeout(() => {
                setLoadMore(false);
            }, 500);
        }
    }, [isLoading]);


    const onReachToEnd = () => {
        const isHasNewData = query?.items.length < query?.meta?.count;
        if (isHasNewData) {
            setLoadMore(true);
        }
    };


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

    const PRODUCT_INFO_ICONS = [
        {
            icon: <MIcon name={'barcode'} size={ICON_SIZE} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Barcode',
        },
        {
            icon: <MIcon name={'cube-scan'} size={ICON_SIZE} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Quantity'
        },
        {
            icon: <MIcon name={'axis-arrow'} size={ICON_SIZE} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Unit'
        },
        {
            icon: <MIcon name={'tag'} size={ICON_SIZE} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Cost Price'
        },
        {
            icon: <MIcon name={'cash-plus'} size={ICON_SIZE} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Total Cost'
        },
    ];


    const EmptyList = () => {
        return (
            <View style={style.emptyListContainer}>
                <Text style={style.emptyListText}>
                    {wareHouseQueryParams.search?.length ? 'Not Found' : 'No Data'}
                </Text>
            </View>
        );
    };


    const renderIconsPanel = useMemo(() => {
        return (
            <View style={style.iconsPanelContainer}>
                {PRODUCT_INFO_ICONS.map((info) => {
                    return (
                        <View style={style.iconsPanelContent} key={`${info.title}`}>
                            {info.icon}
                            <Text style={style.iconsPanelContentText}>
                                {`${info.title}`.toUpperCase()}
                            </Text>
                        </View>
                    );
                })
                }
            </View>
        );
    }, [PRODUCT_INFO_ICONS]);

    const renderSearchPanel = useMemo(() => {
        return (
            <View style={style.searchPanelContainer}>
                <InputItem
                    inputValue={wareHouseQueryParams?.search ?? ''}
                    setValue={handleSearchValueChange}
                    isSearch
                />
            </View>
        );
    }, [wareHouseQueryParams?.search]);

    const handleOnpressProduct = (data: Item) => {
        navigation.navigate(RouteNames.PRODUCT_INFO, {barcode: data.barcode});
    };

    const renderListItem = useCallback(({item, index}: {item: Item; index: number;}) => {
        return (
            <ProductListItem data={item} onPress={handleOnpressProduct} />
        );
    }, []);

    const listFooter = useCallback(() => {
        if (isLoading) return null;
        return <ListFooterMobile meta={query?.meta} paginationHandler={paginationHandler} />;
    }, [query?.meta, isLoading]);

    return (
        <KeyboardAvoidingView style={style.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {renderSearchPanel}
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {
                        isLoading && <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} style={style.loadingIndicator} />
                    }
                    <FlatList
                        ListFooterComponent={listFooter}
                        contentContainerStyle={{gap: 5, alignItems: 'center', padding: 5, flexGrow: 1}}
                        columnWrapperStyle={{gap: 5}}
                        ListFooterComponentStyle={{justifyContent: 'flex-end', flex: 1}}
                        numColumns={2}
                        data={query?.items}
                        refreshing={true}
                        renderItem={renderListItem}
                        ListEmptyComponent={<EmptyList />}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProductView;