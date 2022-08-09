import CheckBox from '@react-native-community/checkbox';
import React, { useMemo, useRef, useState } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Flyout } from 'react-native-windows';
import AddOptionsModal from '../../containers/addOptionsModal';
import { inputsForItemOptions } from '../../containers/addOptionsModal/configs';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import CustomPressable from '../customPressable';
import { PrimaryButton } from '../primaryButton';
import { getStyle } from './style';

export interface IsingelSelectData {
    label: string;
    value: number | string;
}

interface ICustomPicker {
    data?: Array<{ id: number; label: string; }>;
    title?: string;
    onSelect?: (selected: {
        id: number;
        label: string;
        parent: FilterParamskey;
    }) => void;
    selectedIds?: number[];
    parent?: FilterParamskey;
    singleSelectMode?: boolean;
    singleSelected?: string | number;
    singleSelectData?: Array<IsingelSelectData>;
    singleOnSelect?: (selected: IsingelSelectData) => void;
    buttonStyle?: StyleProp<ViewStyle> | undefined;
    butonTextStyle?: StyleProp<ViewStyle> | undefined;
    itemStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemStyle?: StyleProp<ViewStyle> | undefined;
    itemTextStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemTextStyle?: StyleProp<ViewStyle> | undefined;
    isFilterEnabled?: boolean;
    isAddButton?: boolean;
    dataKeyName?: keyof typeof inputsForItemOptions;
}

const CustomPicker = ({
    data: multipleSelectData,
    title,
    onSelect,
    selectedIds,
    parent,
    singleSelectMode,
    singleSelected,
    singleSelectData,
    singleOnSelect,
    buttonStyle,
    butonTextStyle,
    itemStyle,
    itemTextStyle,
    selectedItemStyle,
    selectedItemTextStyle,
    isFilterEnabled,
    isAddButton,
    dataKeyName
}: ICustomPicker) => {
    const style = getStyle();
    const [isShowContent, setShowContent] = useState(false);
    const [isShowAddNewModal, setisShowAddNewModal] = useState(false);
    const buttonRef = useRef(null);
    const isShowableExited = useMemo(() => {
        const itemLength = multipleSelectData?.length || singleSelectData?.length || 0;
        return itemLength > 3;
    }, [multipleSelectData?.length, singleSelectData?.length]);

    const onPress = () => {
        setShowContent(true);
    };

    const onDismiss = () => {
        setShowContent(false);
    };
    const renderMultipleSelectItem = useMemo(
        () =>
            ({ item, index }: { item: { id: number; label: string; }; index: number; }) => {
                const { id, label } = item;
                const isSelected = selectedIds?.includes(id);
                return (
                    <CustomPressable
                        style={[(isSelected && selectedItemStyle) ? selectedItemStyle : (itemStyle || style.multipleSelectItem)]}
                        key={`${index}-${label}`}
                        onPress={() => onSelect({ id, label, parent })}
                        onHoverOpacity>
                        <CheckBox
                            value={isSelected}
                            tintColor={Colors.ALABASTER}
                            onValueChange={() =>
                                onSelect && onSelect({ id, label, parent: parent! })
                            }
                            onCheckColor={Colors.OLD_GOLD}
                            onTintColor={Colors.OLD_GOLD}
                            onFillColor={Colors.CULTURED}
                        />
                        <Text
                            style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || { fontSize: 12, color: Colors.OLD_GOLD })]}
                            key={`${label}`}>
                            {label}
                        </Text>
                    </CustomPressable>
                );
            },
        [selectedIds, multipleSelectData?.length, parent, itemStyle, selectedItemStyle, itemTextStyle, selectedItemTextStyle],
    );



    const onPressSingleItem = (item: IsingelSelectData) => {
        const { label, value } = item;
        if (singleOnSelect) {
            singleOnSelect({ label, value });
            setShowContent(false);
        } else {
            return;
        }
    };

    const onPressAddButton = () => {
        setShowContent(false);
        setisShowAddNewModal(true);

    };
    const closeAddOptionsModal = () => {
        setisShowAddNewModal(false);
    };

    const singleSelectedTitle = useMemo(() => {
        if (singleSelectData?.length) {
            const selected = singleSelectData.filter((item) => item.value == singleSelected)[0];
            return selected?.label ?? 'select';
        } else return 'no data';
    }, [singleSelected, singleSelectData?.length]);


    const renderSingleSelectItem = useMemo(
        () =>
            ({ item, index }: { item: IsingelSelectData; index: number; }) => {
                const isSelected = item?.value == singleSelected;
                return (
                    <CustomPressable
                        style={[(isSelected && selectedItemStyle) ? selectedItemStyle : (itemStyle || [style.singleSelectItem, { backgroundColor: isSelected ? Colors.OLD_GOLD : 'transparent' }])]}
                        key={`${index}`}
                        onPress={() => onPressSingleItem(item)}
                        onHoverOpacity>
                        <Text
                            style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || { fontSize: 12, color: isSelected ? Colors.CULTURED : Colors.OLD_GOLD })]}
                            key={`${index}`}>
                            {item?.label}
                        </Text>
                    </CustomPressable>
                );
            },
        [singleSelected, singleSelectData?.length, itemStyle, selectedItemStyle, itemTextStyle, selectedItemTextStyle]
    );


    const renderCounter = useMemo(() => {
        if (!singleSelectMode && !!selectedIds?.length) {
            return (
                <View
                    style={style.counter}>
                    <Text
                        style={style.counterText}>
                        {selectedIds?.length}
                    </Text>
                </View>
            );
        } else {
            return null;
        }

    }, [singleSelectMode, selectedIds?.length]);

    return (
        <>
            {isAddButton && < AddOptionsModal closeModal={closeAddOptionsModal} isShowModal={isShowAddNewModal} optionName={dataKeyName} />
            }
            <View>
                {renderCounter}
                <CustomPressable
                    style={[buttonStyle || style.button]}
                    ref={buttonRef}
                    onPress={onPress}
                    key={title}
                    onHoverOpacity>
                    <Text style={[butonTextStyle || { color: Colors.OLD_GOLD, fontSize: 12 }]}>
                        {(singleSelectMode
                            ? ` ${(title && title) || ''} ${singleSelectedTitle}`
                            : title) || ''}
                    </Text>
                    <Icon name="chevron-small-down" size={17} color={Colors.OLD_GOLD} />
                </CustomPressable>
            </View>
            <Flyout
                target={buttonRef.current}
                placement={'bottom'}
                isOpen={isShowContent}
                onDismiss={onDismiss}
            >
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    {singleSelectMode ? (
                        <FlatList
                            style={{
                                flex: 1,
                                maxHeight: 100,
                                paddingRight: 10,
                                backgroundColor: isShowableExited ? Colors.OLD_GOLD : Colors.FLORAL_WHITE,
                            }}
                            contentContainerStyle={{
                                backgroundColor: Colors.FLORAL_WHITE,
                            }}
                            data={singleSelectData}
                            keyExtractor={item => item.label}
                            renderItem={renderSingleSelectItem}
                        />
                    ) : (
                        <FlatList
                            style={{
                                flex: 1,
                                maxHeight: 100,
                                paddingRight: 10,
                                backgroundColor: isShowableExited ? Colors.OLD_GOLD : Colors.FLORAL_WHITE,
                            }}
                            contentContainerStyle={{
                                backgroundColor: Colors.FLORAL_WHITE,
                            }}
                            data={multipleSelectData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderMultipleSelectItem}
                        />
                    )}
                    {isAddButton && <PrimaryButton onPress={onPressAddButton} title={'Add new'} textColor={Colors.OLD_GOLD} buttonColor={Colors.ALABASTER} height={30} />}
                </View>
            </Flyout>
        </>
    );
};

export default CustomPicker;
