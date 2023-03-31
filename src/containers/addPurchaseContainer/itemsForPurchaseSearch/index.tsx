import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Flyout, Text } from "react-native-windows";
import { InputItem } from "../../../components/inputItem/index.windows";
import { PrimaryButton } from "../../../components/primaryButton";
import { PaymentMethod } from "../../../enums/purchase";
import { useItemForOrderQuery } from "../../../modules/api/orders.api";
import { useGetItemForPurchaseQuery } from "../../../modules/api/purchase.api";
import { setFromWhereAddEditModalCalled, setIsShowAddEditModal } from "../../../modules/redux/itemsSlicer";
import { addItemForOrder } from "../../../modules/redux/orderSlicer";
import { addItemForPurchase } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { Colors } from "../../../utils/colors";
import SearchContentItem from "../itemsForPurchaseSearchItem";
import { getStyle } from "./style";



interface IItemsForOrderSearch {

}


const ItemsForPurchaseSearch = ({ }: IItemsForOrderSearch) => {
    const style = useMemo(() => getStyle(), []);
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const dispatch = useAppDispatch();
    const [value, setSearchValue] = useState('');
    const [skip, setSkip] = useState(true);
    const [isShowContent, setShowContent] = useState(false);
    const searchRef = useRef(null);
    const { data, isLoading, isUninitialized } = useGetItemForPurchaseQuery(value, {
        skip
    });
    const searchContentHeight = useMemo(
        () => data?.length &&
            ((data?.length >= 5)
                ? 150
                : (data?.length * 45)), [data?.length]);

    useEffect(() => {
        if (data?.length) {
            data.length > 1 && setShowContent(true);
            if (data?.length === 1) {
                dispatch(addItemForPurchase({
                    itemId: data[0].id as number,
                    unit: data[0].unit.name,
                    name: data[0].name,
                    quantity: 0,
                    barcode: data[0].barcode,
                    updateMainPrice: false,
                    pricePerUnit: data[0].costPrice,
                    paymentMethod: PaymentMethod.CASH,
                    fullfilled: false,
                    supplierId: data[0].supplier.id || null,
                    poInfo: '',
                    storeId: data[0].store.id!,
                    store: data[0].store
                }));
            }
        }
    }, [data?.length]);


    useEffect(() => {
        if (!!value.trim().length) {
            timeoutId = setTimeout(() => {
                setSkip(false);
            }, 300);
        }
        return () => {
            setShowContent(false);
            setSkip(true);
            clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
        };
    }, [value]);

    const handleSearch = (text: string) => {
        setSearchValue(text?.trim());
        setSkip(true);
        if (text?.trim() === '') {
            setShowContent(false);
        }
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

    const handleContentDissmiss = () => {
        setShowContent(false);
        setSkip(true);
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

    const handleNewPrdouct = () => {
        dispatch(setFromWhereAddEditModalCalled('purchase'));
        dispatch(setIsShowAddEditModal(true));
    };

    return (
        <>
            <View style={style.searchContainer}
                ref={searchRef}
            >
                <InputItem
                    inputValue={value}
                    setValue={handleSearch}
                    isSearch
                    inputTitle={`Search by Item Name or Barcode`}
                    titleColor={Colors.METALLIC_GOLD}
                    height={30}
                    maxLength={60}
                />
                {!isUninitialized && <View style={style.resultInfoContainer}>
                    {
                        (isLoading) ?
                            <ActivityIndicator size={'small'} color={Colors.METALLIC_GOLD} />
                            :
                            <Text style={style.resultInfoText}>
                                {data?.length ? `Found:${data.length}` : 'Not Found :('}
                            </Text>
                    }

                </View>}
                <View style={{ alignSelf: 'flex-end', paddingRight: 20 }}>
                    <PrimaryButton title={'NEW PRODUCT'}
                        onPress={handleNewPrdouct}
                        onHoverOpacity
                        width={120}
                        height={30}
                        borderRadius={3}
                        buttonColor={Colors.DEFAULT_TEXT_COLOR}
                    />
                </View>
            </View>
            <Flyout
                target={searchRef.current}
                isOpen={isShowContent}
                onDismiss={handleContentDissmiss}
                placement={'bottom'}
                showMode={'transient'}
            >
                <View style={[style.floatResultsContainer, { height: searchContentHeight, }]}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 5 }}>
                        {!!data?.length && data?.map((item, index) => {
                            return <SearchContentItem data={item} setShowContent={(data) => setShowContent(data)} key={`${index}-searchItem`} />;
                        })}
                    </ScrollView>
                </View>
            </Flyout>
        </>
    );

};



export default memo(ItemsForPurchaseSearch);