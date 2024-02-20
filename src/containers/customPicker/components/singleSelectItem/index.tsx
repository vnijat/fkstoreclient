import React, {useMemo, useState} from "react";
import {Pressable, StyleProp, Text, View, ViewStyle, TextStyle} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {IsingelSelectData} from "../..";
import CustomPressable from "../../../../components/customPressable";
import HELP from "../../../../services/helpers";
import {Colors} from "../../../../utils/colors";
import {getStyle} from "./styles";




interface ISingleSelectItem {
    singleSelected?: string | number;
    isEditable?: boolean;
    data: IsingelSelectData;
    selectedItemStyle?: StyleProp<ViewStyle> | undefined;
    itemTextStyle?: StyleProp<TextStyle> | undefined;
    selectedItemTextStyle?: StyleProp<TextStyle> | undefined;
    itemStyle?: StyleProp<ViewStyle> | undefined;
    index?: number;
    indent: number;
    onPressEditButton?: (value?: string | number | boolean) => void;
    disablePickerActionButtons?: boolean;
    onPressSingleItem: (data: IsingelSelectData) => void;
    canSelectParent?: boolean;
    isDeselectEnabled?: boolean;
}

const SingleSelectItem = ({singleSelected, data, onPressSingleItem, indent, isEditable, canSelectParent, selectedItemStyle, selectedItemTextStyle, onPressEditButton, itemTextStyle, itemStyle, disablePickerActionButtons, isDeselectEnabled}: ISingleSelectItem) => {
    const [isShowEditButton, setIsshowEditButton] = useState<boolean>(false);
    const [isShowNested, setIsShowNested] = useState(false);
    const style = useMemo(() => getStyle(indent), [indent]);
    const nestedValues = HELP.getNestedDataValues(data.nested ?? []);
    const isSelected = useMemo(() => singleSelected == data.value, [singleSelected]);
    const isChildSelected = useMemo(() => nestedValues.some((item) => item == singleSelected), [singleSelected]);
    const rotate = isShowNested ? '90deg' : '0deg';

    const onPressItem = () => {
        if (!!data.nested?.length && !canSelectParent) {
            setIsShowNested(!isShowNested);
        } else {
            if (isDeselectEnabled && isSelected) {
                onPressSingleItem({value: null, label: data.label});
            } else {

                onPressSingleItem(data);
            }
        }
    };


    const onPressArrow = () => {
        setIsShowNested(!isShowNested);
    };

    const onPressEdit = () => {
        isEditable && onPressEditButton && onPressEditButton(data?.value);
    };


    const renderSelectedCounter = useMemo(() => {
        if (isChildSelected && !!data.nested?.length) {
            return (< View
                style={style.counter}>
                <Text style={style.counterText}>
                    {'1'}
                </Text>
            </View>);
        } else {
            return null;
        }
    }, [isChildSelected, data.nested?.length]);


    return (
        <>
            <CustomPressable
                style={[(isSelected && selectedItemStyle) ? [selectedItemStyle, !!indent && style.withIndent] : ([itemStyle, !!indent && style.withIndent] || [style.singleSelectItem, {backgroundColor: isSelected ? Colors.CARD_HEADER_COLOR : 'transparent'}, !!indent && style.withIndent])]}
                onPress={onPressItem}
                onMouseEnter={() => setIsshowEditButton(true)}
                onMouseLeave={() => setIsshowEditButton(false)}
                onHoverOpacity>
                <Text
                    style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || {fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR})]}
                >
                    {data?.label?.toUpperCase()}
                </Text>
                <View style={style.buttonRightContainer}>
                    <View style={style.selectedInfoContainer}>
                        {renderSelectedCounter}
                    </View>
                    {!!data.nested?.length && <Pressable
                        onPress={onPressArrow}
                        style={style.arrowButton}>
                        <View style={{transform: [{rotate}]}}>
                            <Icon name={'chevron-small-right'} size={22} color={Colors.METALLIC_GOLD} />
                        </View>
                    </Pressable>}
                    {isEditable && isShowEditButton &&
                        <CustomPressable onPress={onPressEdit} disabled={disablePickerActionButtons} style={{marginRight: 10}}>
                            <Icon size={14} color={Colors.METALLIC_GOLD} name={'cog'} />
                        </CustomPressable>
                    }
                </View>

            </CustomPressable >
            {
                isShowNested && data.nested?.map((item, index) => {
                    return (
                        <SingleSelectItem
                            {...{
                                itemStyle,
                                selectedItemStyle,
                                selectedItemTextStyle,
                                itemTextStyle,
                                singleSelected,
                                disablePickerActionButtons,
                                isEditable,
                                index,
                                canSelectParent,
                                isDeselectEnabled
                            }}
                            data={item}
                            indent={indent + 5}
                            onPressSingleItem={onPressSingleItem}
                            onPressEditButton={onPressEditButton}
                            key={`${index}-${item.label}`}
                        />
                    );
                })

            }


        </>
    );

};

export default SingleSelectItem;