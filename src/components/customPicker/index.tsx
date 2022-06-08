import CheckBox from '@react-native-community/checkbox';
import React, { FC, useEffect, useMemo, useRef, useState, } from 'react';
import { Pressable, Text, View, ScrollView, FlatList, StyleProp, PressableStateCallbackType, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Flyout } from 'react-native-windows';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import CustomPressable from '../customPressable';
import { getStyle } from './style';


interface ICustomPicker {
    data?: Array<{ id: number; label: string; }>;
    title?: string;
    onSelect?: (selected: { id: number; label: string; parent: FilterParamskey; }) => void;
    selectedIds?: number[];
    parent?: FilterParamskey;
    singleSelectMode?: boolean;
    singleSelected?: string | number;
    singleSelectData?: Array<string | number>;
    singleOnSelect?: (value: string | number) => void;
    buttonStyle?: StyleProp<ViewStyle> | undefined;
}

const CustomPicker = ({ data: multipleSelectData, title, onSelect, selectedIds, parent, singleSelectMode, singleSelected, singleSelectData, singleOnSelect, buttonStyle }: ICustomPicker) => {
    const style = getStyle();
    const [isShowContent, setShowContent] = useState(false);
    const buttonRef = useRef(null);
    const onPress = () => {
        setShowContent(true);
    };

    const onDismiss = () => {
        setShowContent(false);
    };


    const renderMultipleSelectItem = useMemo(() => ({ item, index }: { item: { id: number; label: string; }; index: number; }) => {
        const { id, label } = item;
        const isSelected = selectedIds?.includes(id);
        return (
            <CustomPressable style={{ height: 30, maxWidth: 200, minWidth: 100, margin: 1, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }} key={`${index}-${label}`} onPress={() => onSelect({ id, label, parent })} onHoverOpacity>
                < CheckBox value={isSelected}
                    tintColor={Colors.ALABASTER}
                    onValueChange={() => onSelect && onSelect({ id, label, parent: parent! })}
                    onCheckColor={Colors.OLD_GOLD}
                    onTintColor={Colors.OLD_GOLD}
                    onFillColor={Colors.CULTURED}
                />
                <Text style={{ fontSize: 12, color: Colors.OLD_GOLD }} key={`${label}`}>
                    {label}
                </Text>
            </CustomPressable>
        );

    }, [selectedIds, multipleSelectData?.length, parent]);


    const onPressSingleItem = (item: string | number) => {
        if (singleOnSelect) {
            singleOnSelect(item);
            setShowContent(false);
        } else {
            return;
        }
    };


    const renderSingleSelectItem = useMemo(() => ({ item, index }: { item: string | number; index: number; }) => {
        const isSelected = item === singleSelected;
        return (
            <CustomPressable style={{ height: 30, flexDirection: 'row', width: 120, alignItems: 'center', backgroundColor: isSelected ? Colors.OLD_GOLD : 'transparent', justifyContent: 'center' }}
                key={`${index}-${item}`}
                onPress={() => onPressSingleItem(item)} onHoverOpacity>
                <Text style={{ fontSize: 12, color: isSelected ? Colors.CULTURED : Colors.OLD_GOLD, paddingHorizontal: 10 }} key={`${item}-${index}`}>
                    {item.toString()}
                </Text>
            </CustomPressable>
        );

    }, [singleSelected, singleSelectData?.length,]);



    return (
        <>
            <View>
                {!singleSelectMode && !!selectedIds?.length && <View style={{ position: 'absolute', width: 18, height: 18, borderRadius: 100, backgroundColor: Colors.OLD_GOLD, justifyContent: 'center', alignItems: 'center', top: -5, right: -1, zIndex: 2 }}>
                    <Text style={{ color: Colors.FLORAL_WHITE, fontSize: 8, textAlign: 'center', fontWeight: '700' }}>
                        {selectedIds?.length}
                    </Text>
                </View>}
                <CustomPressable
                    style={buttonStyle || style.button}
                    ref={buttonRef}
                    onPress={onPress}
                    key={title}
                    onHoverOpacity>
                    <Text style={{ color: Colors.OLD_GOLD, fontSize: 14 }}>
                        {(singleSelectMode ? ` ${title && title || ''} (${singleSelected?.toString()})` : title) || ''}
                    </Text>
                    <Icon name="chevron-small-down" size={17} color={Colors.OLD_GOLD} />
                </CustomPressable>
            </View>
            <Flyout
                target={buttonRef.current}
                placement={'bottom'}
                isOpen={isShowContent}
                onDismiss={onDismiss}
                showMode={'transient'}
            >
                <View style={{ flex: 1 }}>
                    {singleSelectMode ? <FlatList
                        style={{ flex: 1, backgroundColor: Colors.FLORAL_WHITE, borderRadius: 3 }}
                        contentContainerStyle={{ padding: 1 }}
                        data={singleSelectData}
                        keyExtractor={(index) => index.toString()}
                        renderItem={renderSingleSelectItem}
                    /> : <FlatList
                        style={{ flex: 1, backgroundColor: Colors.FLORAL_WHITE, borderRadius: 3 }}
                        contentContainerStyle={{ padding: 1 }}
                        data={multipleSelectData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMultipleSelectItem}
                    />}
                </View>
            </Flyout>
        </>
    );
};


export default CustomPicker;