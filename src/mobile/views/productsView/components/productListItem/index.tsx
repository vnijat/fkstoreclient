import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Item } from "../../../../../types/ItemsQuery";
import { Colors } from "../../../../../utils/colors";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";


interface IProductListItem {
    data: Item;
}


const ProductListItem = ({ data }: IProductListItem) => {

    const PRODUCT_INFO_ICONS = [
        {
            icon: <MIcon name={'cube-scan'} size={12} />,
            title: 'Quantity',
            textSize: 12,
            value: Number(data.quantity)
        },
        {
            icon: <MIcon name={'axis-arrow'} size={12} />,
            title: 'Unit',
            textSize: 12,
            value: data.unit.name
        },
        {
            icon: <MIcon name={'tag'} size={12} />,
            title: 'Price Per Unit',
            textSize: 12,
            value: `${Number(data.pricePerUnit)} ₼`
        },
        {
            icon: <MIcon name={'cash-plus'} size={12} />,
            title: 'Total Price',
            textSize: 12,
            value: `${Number(data.totalPrice)} ₼`
        },
    ];

    return (
        <Pressable style={{ backgroundColor: Colors.CARD_HEADER_COLOR, height: 80, marginHorizontal: 5, marginVertical: 2, borderRadius: 3 }}>
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 12 }} numberOfLines={3} >
                            {data.name.toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center' }}>
                        <MIcon name={'barcode'} size={18} />
                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 12 }} numberOfLines={1} selectable>
                            {data.barcode}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    {PRODUCT_INFO_ICONS.map((info, index) => {
                        return (
                            <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', }} key={`${index}-${info.title}`}>
                                <Text style={{ fontSize: info.textSize, marginRight: 5 }}>
                                    {info.value}
                                </Text>
                                {info.icon}
                            </View>
                        );
                    })}
                </View>
            </View>
        </Pressable>
    );
};

export default memo(ProductListItem);