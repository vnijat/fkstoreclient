import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../../../utils/colors";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Item } from "../../../../../types/item";
import { getStyle } from "./styles";
import FONT from "../../../../../utils/font";
import { BarcodeIcon } from "../../../../../assets/icons/productIcons";


interface IProductListItem {
    data: Item;
}


const ProductListItem = ({ data }: IProductListItem) => {
    const style = useMemo(() => getStyle(), []);

    const PRODUCT_INFO_ICONS = [
        {
            icon: <MIcon name={'cube-scan'} size={12} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Quantity',
            value: Number(data.quantity)
        },
        {
            icon: <MIcon name={'axis-arrow'} size={12} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Unit',
            value: data.unit.name
        },
        {
            icon: <MIcon name={'tag'} size={12} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Cost Price',
            value: `${Number(data.costPrice)} ₼`
        },
        {
            icon: <MIcon name={'cash-plus'} size={12} color={Colors.DEFAULT_TEXT_COLOR} />,
            title: 'Total Cost',
            value: `${Number(data.totalCostPrice)} ₼`
        },
    ];


    return (
        <View style={style.container}>
            <View style={style.contentContainer}>
                <View style={{ flex: 0.7 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={style.productNameText} numberOfLines={3} >
                            {data?.name.toUpperCase()}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MIcon name={'store-marker'} size={16} color={Colors.METALLIC_GOLD} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_SMALL, color: Colors.DEFAULT_TEXT_COLOR }}>
                                {`${data?.store.name}-${data?.location.code}`}
                            </Text>
                        </View>
                    </View>
                    <View style={style.bottomContainer}>
                        <BarcodeIcon size={18} color={Colors.DEFAULT_TEXT_COLOR} />
                        <Text style={style.barcodeText} numberOfLines={1} selectable>
                            {data?.barcode}
                        </Text>
                    </View>
                </View>
                <View style={style.rigthContainer}>
                    {PRODUCT_INFO_ICONS.map((info, index) => {
                        return (
                            <View style={style.rightContianerItem} key={`${index}-${info.title}`}>
                                <Text style={style.rightContainerItemText}>
                                    {info.value}
                                </Text>
                                {info.icon}
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default memo(ProductListItem);