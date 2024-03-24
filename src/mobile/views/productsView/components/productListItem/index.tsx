import React, {memo, useMemo} from "react";
import {Pressable, Text, View} from "react-native";
import {Colors} from "../../../../../utils/colors";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {Item} from "../../../../../types/item";
import {getStyle} from "./styles";
import FONT from "../../../../../utils/font";
import {BarcodeIcon} from "../../../../../assets/icons/productIcons";


interface IProductListItem {
    data: Item;
    onPress: (data: Item) => void;
}


const ProductListItem = ({data, onPress}: IProductListItem) => {
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
        <Pressable style={[style.container, data.outOfStock && {opacity: 0.6}]} android_ripple={{color: Colors.METALLIC_GOLD}} onPress={() => onPress(data)}>
            <View style={style.contentContainer}>
                <View style={{flexGrow: 1}}>
                    <View style={{flex: 0.7, gap: 5, }}>
                        <Text style={style.productNameText} numberOfLines={1} adjustsFontSizeToFit >
                            {data?.name.toUpperCase()}
                        </Text>
                        <View style={{flexDirection: 'row', gap: 2, }}>
                            <MIcon name={'store-marker'} size={16} color={Colors.METALLIC_GOLD} />
                            <Text style={{fontSize: FONT.FONT_SIZE_SMALL, color: Colors.DEFAULT_TEXT_COLOR}}>
                                {`${data?.store.name}-${data?.location.code}`}
                            </Text>
                        </View>
                        <View style={style.productInfoContainer}>
                            <View style={style.quantityContainer}>
                                <Text style={style.quantityText} adjustsFontSizeToFit numberOfLines={1}>
                                    {Number(data.quantity)}
                                </Text>
                            </View>
                            <View style={style.unitTypeContainer}>
                                <Text style={style.unitTypeText} numberOfLines={1} adjustsFontSizeToFit>
                                    {data?.unit.name.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={style.bottomContainer}>
                    <Text style={style.barcodeText} numberOfLines={1} selectable>
                        {data?.barcode}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default memo(ProductListItem);