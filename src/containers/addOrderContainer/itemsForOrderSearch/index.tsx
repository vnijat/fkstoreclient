import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Flyout, Text } from "react-native-windows";
import { InputItem } from "../../../components/inputItem/index.windows";
import { useItemForOrderQuery } from "../../../modules/api/orders.api";
import { addItemForOrder } from "../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { Colors } from "../../../utils/colors";
import SearchContentItem from "../itemsForOrderSearchItem";



interface IItemsForOrderSearch {

}


const ItemsForOrderSearch = ({ }: IItemsForOrderSearch) => {
    let timeoutId = useRef<ReturnType<typeof setTimeout>>(null).current;
    const dispatch = useAppDispatch();
    const [value, setSearchValue] = useState('');
    const [skip, setSkip] = useState(true);
    const [isShowContent, setShowContent] = useState(false);
    const searchRef = useRef(null);
    const { data, isLoading, isUninitialized } = useItemForOrderQuery(value, {
        skip
    });
    const searchContentHeight = useMemo(() => data?.length && ((data?.length >= 5) ? 150 : (data?.length * 45)), [data?.length]);

    useEffect(() => {
        if (data?.length) {
            data.length > 1 && setShowContent(true);
            if (data?.length === 1) {
                dispatch(addItemForOrder({
                    itemId: data[0].id as number,
                    unit: data[0].unit.name,
                    name: data[0].name,
                    quantity: 0,
                    barcode: data[0].barcode,
                    itemAtStock: data[0]?.quantity
                }));
            }
        }
    }, [data?.length]);

    const handleSearch = (text: string) => {
        setSearchValue(text?.trim());
        setSkip(true);
        if (text?.trim() === '') {
            setShowContent(false);
        }
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

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

    const handleContentDissmiss = () => {
        setShowContent(false);
        setSkip(true);
        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    };

    return (
        <>
            <View style={{}}
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
                {!isUninitialized && <View style={{ position: 'absolute', right: 10, alignItems: 'center', justifyContent: 'center', zIndex: 2, top: 30, marginHorizontal: 20, height: 20 }}>
                    {
                        (isLoading) ?
                            <ActivityIndicator size={'small'} color={Colors.METALLIC_GOLD} />
                            :
                            <Text style={{ color: Colors.METALLIC_GOLD, fontSize: 12 }}>
                                {data?.length ? `Found:${data.length}` : 'Not Found :('}
                            </Text>
                    }

                </View>}
            </View>
            <Flyout
                target={searchRef.current}
                isOpen={isShowContent}
                onDismiss={handleContentDissmiss}
                placement={'bottom'}
                showMode={'transient'}
            >
                <View style={{ height: searchContentHeight, backgroundColor: Colors.CULTURED, width: 680 }}>
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



export default memo(ItemsForOrderSearch);