import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";



interface IOrdersCartContainer {

}


const OrdersCartContainer = ({ }) => {


    const renderOrderDetailInput = useMemo(() => {
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




    const bottomSheetHandler = () => {
        return (
            <View style={{ height: 20, backgroundColor: Colors.CARD_COLOR, borderTopLeftRadius: 10, borderTopRightRadius: 10, elevation: 2 }}>
                <CustomPressable
                    onPress={() => bottomSheetRef.current?.close()}
                    style={{ position: 'absolute', top: -20, height: 40, width: 40, borderRadius: 40, backgroundColor: Colors.CARD_COLOR, elevation: 2, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <MIcon name={'window-close'} size={20} color={Colors.METALLIC_GOLD} />
                </CustomPressable>
            </View>
        );
    };





    return (
        <BottomSheet
            ref={bottomSheetRef}
            handleComponent={bottomSheetHandler}
            index={-1}
            onClose={handleOnCloseSheet}
            snapPoints={snapPoints}
            containerStyle={{ zIndex: 4 }}
            enableContentPanningGesture={false}
            backdropComponent={bottomSheetBackDrop}
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
    );




};
export default OrdersCartContainer;