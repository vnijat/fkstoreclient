import CheckBox from "@react-native-community/checkbox";
import React, { memo, useMemo, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../../components/customPressable";
import HELP from "../../../../services/helpers";
import { FilterParamskey } from "../../../../types/ItemsQuery";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";


export interface IMultipleSelectData {
    id: number;
    label: string;
    nested?: IMultipleSelectData[];
}

interface IMultipleSelectItem {
    isSelected: boolean;
    index: number;
    label: string;
    id: number;
    nestedData?: IMultipleSelectData[];
    indent: number;
    selectedIds?: number[];
    onSelect?: (selected: {
        id: number;
        label: string;
        parent: FilterParamskey;
    }) => void;
    parent?: FilterParamskey;
    itemStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemStyle?: StyleProp<ViewStyle> | undefined;
    itemTextStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemTextStyle?: StyleProp<ViewStyle> | undefined;

}



const MultipleSelectItem = ({ isSelected, index, label, id, nestedData, indent, selectedIds, onSelect, parent, selectedItemStyle, selectedItemTextStyle, itemStyle, itemTextStyle }: IMultipleSelectItem) => {
    const style = useMemo(() => getStyle(), []);
    const [isShowNested, setIsshowNested] = useState(false);
    const isHasNestedData = !!nestedData?.length;
    const rotate = isShowNested ? '90deg' : '0deg';
    const nestedIds = HELP.getNestedCategoriesIds(nestedData ?? []);
    const nestedSelectedCount = useMemo(() => (nestedIds.length && selectedIds?.filter(id => nestedIds.includes(id)).length) ?? 0, [selectedIds]);
    const onPressItem = () => {
        if (isHasNestedData) {
            setIsshowNested(!isShowNested);
        } else {
            onSelect && onSelect({ id, label, parent: parent! });
        }
    };


    const renderSelectedCounter = useMemo(() => {
        if ((nestedSelectedCount > 0) && !isShowNested) {
            return (< View
                style={style.counter}>
                <Text
                    style={style.counterText}>
                    {nestedSelectedCount}
                </Text>
            </View>);
        } else {
            return null;
        }
    }, [nestedSelectedCount, isShowNested]);



    return (<>
        <CustomPressable
            style={[{ paddingLeft: indent }, (isSelected && selectedItemStyle) ? selectedItemStyle : (itemStyle || style.multipleSelectItem)]}
            key={`${index}-${label}`}
            onPress={onPressItem}
            onHoverOpacity
        >
            <CheckBox
                value={isSelected}
                tintColor={Colors.CARD_COLOR}
                onValueChange={() =>
                    onSelect && onSelect({ id, label, parent: parent! })
                }
                onCheckColor={Colors.CARD_HEADER_COLOR}
                onTintColor={Colors.CARD_HEADER_COLOR}
                onFillColor={Colors.CULTURED}
            />
            <Text
                style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || { fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR })]}
                key={`${label}`}>
                {label}
            </Text>
            {renderSelectedCounter}
            {isHasNestedData &&
                <View style={{ transform: [{ rotate }] }}>
                    <Icon name={'chevron-small-right'} size={24} color={Colors.METALLIC_GOLD} />
                </View>
            }
        </CustomPressable>
        {isShowNested && nestedData?.map((item: IMultipleSelectData, index: number) => {
            const { id, label } = item;
            const isSelected = !!selectedIds?.includes(id);
            return <MultipleSelectItem {...{ id, index, label, isSelected, selectedIds, selectedItemStyle, selectedItemTextStyle, onSelect, parent, itemStyle, itemTextStyle }} nestedData={item?.nested ?? []} key={`${id}-${index}`} indent={indent + 5} />;
        })
        }
    </>

    );

};

export default memo(MultipleSelectItem);