import React, { memo, useMemo } from "react";
import { FlatList, View } from "react-native";
import { useDeletePurchaseMutation } from "../../../modules/api/purchase.api";
import HELP from "../../../services/helpers";
import { PurchaseDto } from "../../../types/purchase";
import { Colors } from "../../../utils/colors";
import PurchaseHeader from "../purchaseHeader";
import PurchaseListItem from "../purchaseListItem";
import { getStyle } from "./styles";




interface IPurchaseList {
    data: PurchaseDto[];
}


const PurchaseList = ({ data }: IPurchaseList) => {
    const style = useMemo(() => getStyle(), []);
    const [apiDeletePurchase] = useDeletePurchaseMutation();

    const onDeletePurchase = async (orderId: number) => {
        try {
            const response = await apiDeletePurchase(orderId);
            if (response.error) {
                throw response.error;
            }
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }
    };


    return (

        <View style={{ flex: 1 }}>
            <View style={style.listHeader}>
                <PurchaseHeader />
            </View>
            <View>
            </View>
            <FlatList
                style={style.listContent}
                data={data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <PurchaseListItem
                            key={item.id}
                            data={item}
                            onDeletePurchase={onDeletePurchase}

                        />
                    );
                }}
            />
        </View>


    );


};

export default memo(PurchaseList);