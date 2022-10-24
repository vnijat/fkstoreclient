import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Text } from "react-native-windows";
import { useSelector } from "react-redux";
import CustomModal from "../../components/customModal";
import { PrimaryButton } from "../../components/primaryButton";
import { InventoryApi, useGetItemQuery } from "../../modules/api/apiSlice";
import { setIsItemForEdit, setIsShowItemModal, setItemForPost } from "../../modules/redux/itemsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import HELP from "../../services/helpers";
import { Item, ItemResponse } from "../../types/ItemsQuery";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency";
import DataField from "./components/dataField";
import { getStyle } from "./style";

interface IItemModal {
    itemsData: Item[];
}


const ItemModal = ({ itemsData }: IItemModal) => {
    const style = useMemo(() => getStyle(), []);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useAppDispatch();
    const itemId = useSelector((state: RootState) => state.itemsSlicer.itemIdForFullResponse);
    const isShowModal = useSelector((state: RootState) => state.itemsSlicer.isShowItemModal);
    const { data } = useGetItemQuery(itemId, {
        selectFromResult: ({ data }) => ({
            data
        })
    });

    const onCloseModal = () => {
        dispatch(setIsShowItemModal(false));
    };



    const onPressEdit = () => {
        const itemForPost = HELP.modifyItemForEdit(itemsData, itemId!);
        dispatch(setIsItemForEdit(true));
        dispatch(setItemForPost(itemForPost));
        onCloseModal();
        navigation.navigate('AddItem');
    };


    return (
        <CustomModal
            isShowModal={isShowModal}
            isDissmissEnabled={true}
            closeModal={onCloseModal}
            width={1000}

        >
            <View style={{ flex: 1, height: 700 }}>
                <View style={{ flex: 0.5, flexDirection: 'row' }}>
                    <View style={{ flex: 0.6, borderColor: Colors.CARD_HEADER_COLOR, borderRightWidth: 1 }}>
                        <DataField title={'Name'} value={data?.name!} />
                        <DataField title={'Description'} value={data?.description!} height={100} />
                        <DataField title={'Category'} value={data?.category!} />
                        <View style={{ flexDirection: 'row' }}>
                            <DataField title={'Unit'} value={data?.unit.name!} width={100} />
                            <DataField title={'Quantity'} value={Number(data?.quantity!)} width={100} />
                            <DataField title={'Cost Per Unit'} value={currency.format(Number(data?.purchasePrice!))} width={100} />
                            <DataField title={'Price Per Unit'} value={currency.format(Number(data?.pricePerUnit!))} width={100} />
                            <DataField title={'Total Price'} value={currency.format(Number(data?.totalPrice!))} width={100} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <DataField title={'Color'} value={data?.color.name!} width={100} />
                            <DataField title={'Store'} value={data?.store.name!} width={100} />
                            <DataField title={'Location'} value={data?.location.code!} width={100} />
                        </View>
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: Colors.DEFAULT_TEXT_COLOR }}>
                                {`Barcode: ${data?.barcode.code}`}
                            </Text>
                            <Image source={{ uri: `data:image/png;base64,${data?.qrCode}` }} resizeMode={'contain'} style={{ flex: 1, justifyContent: 'center', }} />
                            <Text style={{ alignSelf: 'center', color: Colors.DEFAULT_TEXT_COLOR }}>
                                {`SKU: ${data?.skuCode}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row' }}>
                    <View style={{ flex: 0.6, borderColor: Colors.CARD_HEADER_COLOR, borderRightWidth: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <View style={{ marginRight: 10 }}>
                            <PrimaryButton title={'Edit'} onPress={onPressEdit} onHoverOpacity width={100} />
                        </View>
                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={'shop'} color={Colors.METALLIC_GOLD} size={34} />
                            <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14, fontWeight: '700', paddingRight: 2 }}>
                                {'Supplier'}
                            </Text>
                        </View>
                        <DataField title={'Name'} value={data?.supplier.name!} />
                        {data?.supplier.phone && < DataField title={'Phone'} value={data?.supplier.phone!} />}
                        {data?.supplier.email && < DataField title={'Email'} value={data?.supplier.email!} />}
                        {data?.supplier.address && < DataField title={'Address'} value={data?.supplier.address!} />}

                    </View>
                </View>
            </View>
        </CustomModal>

    );

};

export default memo(ItemModal);