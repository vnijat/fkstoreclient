import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View, FlatList, Pressable, Dimensions, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { InputItem } from "../../../components/inputItem";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";
import WareHouseDataProvider from "../../../views/warehouseView/provider/data";
import WareHouseLogicProvider from "../../../views/warehouseView/provider/logic";
import ProductListItem from "./components/productListItem";
import { getStyle } from "./syles";



const ProductView = () => {
    const style = useMemo(() => getStyle(), []);
    const dataProvider = WareHouseDataProvider();
    const logicProvider = WareHouseLogicProvider();
    const { queryData: { data: query, isLoading }, wareHouseQueryParams } = dataProvider;
    const { handleSearchValueChange, paginationHandler } = logicProvider;
    const [isLoadMore, setLoadMore] = useState(false);
    const ICON_SIZE = 12;

    useEffect(() => {
        if (isLoadMore) {
            paginationHandler({ take: (query?.meta.take ?? 10) + 10 });
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


    return (
        <KeyboardAvoidingView style={style.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {renderSearchPanel}
            {renderIconsPanel}
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {
                        isLoading && <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} style={style.loadingIndicator} />
                    }
                    <FlatList
                        onEndReached={onReachToEnd}
                        onEndReachedThreshold={0.5}
                        data={query?.items}
                        refreshing={true}
                        renderItem={({ item }) => <ProductListItem data={item} />}
                        ListEmptyComponent={<EmptyList />}
                    />
                    {renderLoadingMore}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProductView;