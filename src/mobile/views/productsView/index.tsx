import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { View, FlatList, Pressable, Dimensions, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { shallowEqual, useSelector } from "react-redux";
import { InputItem } from "../../../components/inputItem";
import { useGetAllItemsQuery } from "../../../modules/api/apiSlice";
import { setItemQueryParams } from "../../../modules/redux/itemQuerySlicer";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Colors } from "../../../utils/colors";
import FONT from "../../../utils/font";
import ProductListItem from "./components/productListItem";
import { getStyle } from "./syles";



const ProductView = () => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const { params } = useRoute<RouteProp<{ params: { barcode: string; }; }>>();
    const selectQueryParams = useSelector((state: RootState) => state.itemQuerySlicer, shallowEqual);
    const ICON_SIZE = 12;
    const { data: query, error: fetchError, isLoading } = useGetAllItemsQuery(selectQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error, currentData }) => ({
            data,
            error,
            isLoading: isUninitialized ? true : isLoading,
        }
        ),
        pollingInterval: 5000
    });

    useEffect(() => {
        if (params?.barcode) {
            dispatch(setItemQueryParams({ search: params.barcode, take: 10 }));
        }
    }, [params]);

    const handleSearch = (text: string) => {
        dispatch(setItemQueryParams({ search: text, take: 10 }));
    };

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


    const onReachToEnd = () => {
        const isHasNewData = query?.items.length < query?.meta?.count;
        if (isHasNewData) {
            dispatch(setItemQueryParams({ take: (query?.meta.take ?? 10) + 10 }));
        }
    };


    const EmptyList = () => {
        return (
            <View style={style.emptyListContainer}>
                <Text style={style.emptyListText}>
                    {selectQueryParams.search?.length ? 'Not Found' : 'No Data'}
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
                    inputValue={selectQueryParams?.search ?? ''}
                    setValue={(text) => handleSearch(text as string)}
                    isSearch
                />
            </View>
        );
    }, [selectQueryParams?.search]);


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
                        keyExtractor={({ id }) => `${id}`}
                        renderItem={({ item }) => <ProductListItem data={item} />}
                        ListEmptyComponent={<EmptyList />}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProductView;