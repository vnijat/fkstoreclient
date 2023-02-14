import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, FlatList, Pressable, Dimensions, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { shallowEqual, useSelector } from "react-redux";
import { InputItem } from "../../../components/inputItem";
import { useGetAllItemsQuery } from "../../../modules/api/apiSlice";
import { setItemQueryParams } from "../../../modules/redux/itemQuerySlicer";
import { RootState, useAppDispatch } from "../../../modules/redux/store";
import { Colors } from "../../../utils/colors";
import ProductListItem from "./components/productListItem";



const ProductView = () => {
    const dispatch = useAppDispatch();
    const { params } = useRoute<RouteProp<{ params: { barcode: string; }; }>>();
    const selectQueryParams = useSelector((state: RootState) => state.itemQuerySlicer, shallowEqual);
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
            icon: <MIcon name={'barcode'} size={18} />,
            title: 'Barcode',
        },
        {
            icon: <MIcon name={'cube-scan'} size={12} />,
            title: 'Quantity'
        },
        {
            icon: <MIcon name={'axis-arrow'} size={12} />,
            title: 'Unit'
        },
        {
            icon: <MIcon name={'tag'} size={12} />,
            title: 'Price Per Unit'
        },
        {
            icon: <MIcon name={'cash-plus'} size={12} />,
            title: 'Total Price'
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14 }}>
                    {selectQueryParams.search?.length ? 'Not Found' : 'No Data'}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ height: 50, backgroundColor: Colors.DEFAULT_TEXT_COLOR, justifyContent: 'center' }}>
                <InputItem
                    inputValue={selectQueryParams?.search ?? ''}
                    setValue={(text) => handleSearch(text as string)}
                    isSearch
                />
            </View>
            <View style={{ height: 20, backgroundColor: Colors.CARD_HEADER_COLOR, borderBottomWidth: 1, borderTopWidth: 1, borderColor: Colors.METALLIC_GOLD, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                {PRODUCT_INFO_ICONS.map((info) => {
                    return (
                        <View style={{ flexDirection: 'row', marginHorizontal: 1, alignItems: 'center' }} key={`${info.title}`}>
                            {info.icon}
                            <Text style={{ fontSize: 8 }}>
                                {`= ${info.title}`.toUpperCase()}
                            </Text>
                        </View>
                    );
                })
                }
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {
                        isLoading && <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} style={{ position: 'absolute', zIndex: 2, alignSelf: 'center', top: Dimensions.get('window').height * 0.3 }} />
                    }
                    <FlatList
                        onEndReached={onReachToEnd}
                        onEndReachedThreshold={0.5}
                        data={query?.items}
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