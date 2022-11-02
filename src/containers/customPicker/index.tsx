import CheckBox from '@react-native-community/checkbox';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleProp,
    ViewStyle,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Flyout } from 'react-native-windows';
import AddOptionsModal from '../../containers/addOptionsModal';
import { inputsForItemOptions } from '../../containers/addOptionsModal/configs';
import { ItemOptionsApi } from '../../modules/api/itemOptions.api';
import { useAppDispatch } from '../../modules/redux/store';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';
import { addItemOption, setIsOpenOptionModal, setIsOptionForEdit, setOptionNameForModal } from "../../modules/redux/itemOptions";
import HELP from '../../services/helpers';
import { InputItem } from '../../components/inputItem';
import CustomPressable from '../../components/customPressable';
import { PrimaryButton } from '../../components/primaryButton';
import MultipleSelectItem, { IMultipleSelectData } from './components/multipleSelectItem';

export interface IsingelSelectData {
    label?: string;
    value?: number | string;
}


interface ICustomPicker {
    data?: Array<IMultipleSelectData>;
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
    singleSelectData?: IsingelSelectData[];
    singleOnSelect?: (selected: IsingelSelectData) => void;
    buttonStyle?: StyleProp<ViewStyle> | undefined;
    butonTextStyle?: StyleProp<ViewStyle> | undefined;
    itemStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemStyle?: StyleProp<ViewStyle> | undefined;
    itemTextStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemTextStyle?: StyleProp<ViewStyle> | undefined;
    isDataSearchEnabled?: boolean;
    isAddButton?: boolean;
    dataKeyName?: keyof typeof inputsForItemOptions;
    isEditable?: boolean;
    isDisabled?: boolean;
    requiredText?: string;
    arrowDownColor?: string;
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
    isDataSearchEnabled,
    isAddButton,
    dataKeyName,
    isEditable,
    isDisabled,
    requiredText,
    arrowDownColor
}: ICustomPicker) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const [isShowContent, setShowContent] = useState(false);
    const [isShowEditButton, setIsshowEditButton] = useState<Array<{ id: number, isHover: boolean; }>>([]);
    const [searchText, setSearchText] = useState('');
    const buttonRef = useRef(null);


    const getFilteredData = useMemo(() => {
        let filteredData;
        if (isDataSearchEnabled && searchText.trim().length) {
            const dataForfilter = singleSelectMode ? singleSelectData : HELP.flatNestedCategories(multipleSelectData!);
            const regEx = new RegExp(searchText.trim(), 'i');
            filteredData = dataForfilter?.filter((data: { label: string; }) => regEx.test(data.label.trim()));
        }
        return filteredData;
    }, [searchText, singleSelectMode, singleSelectData, multipleSelectData, isDataSearchEnabled]);

    const onPress = () => {
        if (isDisabled) {
            Alert.alert('Requires field before select', requiredText);
        } else {
            setShowContent(true);
        }
    };

    const onDismiss = () => {
        setSearchText('');
        setShowContent(false);
    };

    const onMouseEnter = (index: number) => {
        if (isEditable) {
            setIsshowEditButton((prevstate) => {
                const newArray = [...prevstate];
                newArray.push({ id: index, isHover: true });
                return newArray;
            }
            );
        }
    };

    const onMouseLeave = (index: number) => {
        if (isEditable) {
            setIsshowEditButton((prevstate) => {
                const newArray = prevstate.filter(button => button.id !== index);
                return newArray;
            }
            );
        }
    };

    const getOptionData = async (optionId: number) => {
        try {
            const response = await dispatch(ItemOptionsApi.endpoints.getOption.initiate({ optionName: dataKeyName, id: optionId }));
            if (response.data) {
                return response?.data;
            }
        } catch (error) {

        }
    };

    const onPressEdit = async (optionId: number) => {
        const dataForEdit = await getOptionData(optionId);
        if (dataKeyName && dataForEdit) {
            dispatch(addItemOption({ [`${dataKeyName}`]: dataForEdit }));
            dispatch(setIsOptionForEdit(true));
            dispatch(setOptionNameForModal(dataKeyName));
        }
        dispatch(setIsOpenOptionModal(true));
    };

    const renerListEmptyComponent = () => {
        return (
            <View style={itemStyle || (singleSelectMode ? style.singleSelectItem : style.multipleSelectItem)}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                    {(isDataSearchEnabled && searchText.trim().length) ? 'not found' : 'no data'}
                </Text>
            </View>
        );
    };

    const renderSearchInput = useMemo(() => {
        return <InputItem isSearch inputValue={searchText} setValue={(text) => setSearchText(text)} height={30} />;
    }, [searchText]);


    const isShowableExited = useMemo(() => {
        const itemLength = (searchText.trim().length && !getFilteredData?.length) ? 0 : (getFilteredData?.length || multipleSelectData?.length || singleSelectData?.length);
        return itemLength > 3;
    }, [multipleSelectData?.length, singleSelectData?.length, getFilteredData?.length, searchText]);



    // const MultipleSelectItem = ({ isSelected, index, label, id, isShowEdit, nested, indent }: { isSelected: boolean; index: number; label: string; id: number; isShowEdit: boolean; nested?: ImultipleSelectItem[]; indent: number; }) => {
    //     const [isShowNested, setIsshowNested] = useState(false);
    //     const isHasNestedData = !!nested?.length;
    //     const rotate = isShowNested ? '90deg' : '0deg';
    //     const nestedIds = HELP.getNestedCategoriesIds(nested ?? []);
    //     const nestedSelectedCount = (nestedIds.length && selectedIds?.filter(id => nestedIds.includes(id)).length) ?? 0;
    //     const onPressItem = () => {
    //         if (isHasNestedData) {
    //             setIsshowNested(!isShowNested);
    //         } else {
    //             onSelect && onSelect({ id, label, parent: parent! });
    //         }
    //     };

    //     return (<>
    //         {(nestedSelectedCount > 0) &&
    //             <View
    //                 style={style.counter}>
    //                 <Text
    //                     style={style.counterText}>
    //                     {selectedIds?.length}
    //                 </Text>
    //             </View>}
    //         <CustomPressable
    //             style={[{ paddingLeft: indent }, (isSelected && selectedItemStyle) ? selectedItemStyle : (itemStyle || style.multipleSelectItem)]}
    //             key={`${index}-${label}`}
    //             onPress={onPressItem}
    //             onMouseEnter={() => onMouseEnter(index)}
    //             onMouseLeave={() => onMouseLeave(index)}
    //             onHoverOpacity>
    //             <CheckBox
    //                 value={isSelected}
    //                 tintColor={Colors.CARD_COLOR}
    //                 onValueChange={() =>
    //                     onSelect && onSelect({ id, label, parent: parent! })
    //                 }
    //                 onCheckColor={Colors.CARD_HEADER_COLOR}
    //                 onTintColor={Colors.CARD_HEADER_COLOR}
    //                 onFillColor={Colors.CULTURED}
    //             />
    //             <Text
    //                 style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || { fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR })]}
    //                 key={`${label}`}>
    //                 {label}
    //             </Text>
    //             {isHasNestedData &&
    //                 <View style={{ transform: [{ rotate }] }}>
    //                     <Icon name={'chevron-small-right'} size={24} color={Colors.METALLIC_GOLD} />
    //                 </View>
    //             }
    //             {isEditable && isShowEdit &&
    //                 <CustomPressable onPress={onPressEdit} key={`${index}-${item.label}`}>
    //                     <Icon size={14} color={Colors.METALLIC_GOLD} name={'cog'} key={`${index}-${item.label}`} />
    //                 </CustomPressable>
    //             }
    //         </CustomPressable>
    //         {
    //             isShowNested && isHasNestedData && nested.map((item: ImultipleSelectItem, index) => {
    //                 const { id, label } = item;
    //                 const isSelected = !!selectedIds?.includes(id);
    //                 const isShowEdit = isShowEditButton.some(item => item.id === index);
    //                 return <MultipleSelectItem {...{ id, index, label, isSelected, isShowEdit }} nested={item.nested} key={`${id}-${index}`} indent={indent + 5} />;
    //             })
    //         }
    //     </>

    //     );

    // };


    const renderMultipleSelectItem = useMemo(
        () =>
            ({ item, index }: { item: IMultipleSelectData; index: number; }) => {
                const { id, label } = item;
                const isSelected = !!selectedIds?.includes(id);
                // const nestedIds = item.nested?.length ? HELP.getNestedCategoriesIds(item.nested) : [];
                return (
                    <>
                        <MultipleSelectItem {...{ id, index, label, isSelected, itemStyle, itemTextStyle, selectedIds, parent, selectedItemStyle, selectedItemTextStyle, onSelect }} nestedData={item?.nested} key={`${id}-${index}`} indent={0} />
                    </>
                );
            },
        [selectedIds, multipleSelectData?.length, parent, itemStyle, isShowEditButton.length]
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
        dispatch(setIsOpenOptionModal(true));
        dispatch(setOptionNameForModal(dataKeyName!));
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
                const isShowEdit = isShowEditButton.some(item => item.id === index);
                return (
                    <>
                        <CustomPressable
                            style={[(isSelected && selectedItemStyle) ? selectedItemStyle : (itemStyle || [style.singleSelectItem, { backgroundColor: isSelected ? Colors.CARD_HEADER_COLOR : 'transparent' }])]}
                            key={`${index}`}
                            onPress={() => onPressSingleItem(item)}
                            onMouseEnter={() => onMouseEnter(index)}
                            onMouseLeave={() => onMouseLeave(index)}
                            onHoverOpacity>
                            <Text
                                style={[(isSelected && selectedItemTextStyle) ? selectedItemTextStyle : (itemTextStyle || { fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR })]}
                                key={`${index}`}>
                                {item?.label}
                            </Text>
                            {isEditable && isShowEdit &&
                                <CustomPressable onPress={() => onPressEdit(item.value)} key={`${index}-${item.label}`}>
                                    <Icon size={14} color={Colors.METALLIC_GOLD} name={'cog'} key={`${index}-${item.label}`} />
                                </CustomPressable>
                            }
                        </CustomPressable >
                    </>
                );
            },
        [singleSelected, singleSelectData?.length, itemStyle, selectedItemStyle, itemTextStyle, selectedItemTextStyle, isEditable, isShowEditButton.length, isDisabled]
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
            <View>
                {renderCounter}
                <CustomPressable
                    style={[buttonStyle || style.button]}
                    ref={buttonRef}
                    onPress={onPress}
                    key={title}
                    onHoverOpacity
                >
                    <Text style={[butonTextStyle || { color: Colors.DEFAULT_TEXT_COLOR, fontSize: 12 }]}>
                        {(singleSelectMode
                            ? ` ${(title && title) || ''} ${singleSelectedTitle}`
                            : title) || ''}
                    </Text>
                    <Icon name="chevron-small-down" size={17} color={arrowDownColor || Colors.CARD_HEADER_COLOR} />
                </CustomPressable>
            </View>
            <Flyout
                target={buttonRef.current}
                placement={'bottom'}
                isOpen={isShowContent}
                onDismiss={onDismiss}
                showMode={'transient-with-dismiss-on-pointer-move-away'}
            >
                <View style={{ flex: 1, justifyContent: 'space-between', minWidth: 200 }}>
                    {isDataSearchEnabled
                        &&
                        <View style={{ backgroundColor: Colors.FLORAL_WHITE }}>
                            {renderSearchInput}
                        </View>
                    }
                    {singleSelectMode ? (
                        <FlatList
                            style={{
                                flex: 1,
                                maxHeight: 100,
                                paddingRight: 10,
                                backgroundColor: isShowableExited ? Colors.CARD_HEADER_COLOR : Colors.FLORAL_WHITE,
                            }}
                            contentContainerStyle={{
                                backgroundColor: Colors.FLORAL_WHITE,
                            }}
                            data={getFilteredData || singleSelectData}
                            keyExtractor={(item) => `${item.label}-${item.value}`}
                            renderItem={renderSingleSelectItem}
                            ListEmptyComponent={renerListEmptyComponent}

                        />
                    ) : (
                        <FlatList
                            style={{
                                flex: 1,
                                maxHeight: 100,
                                paddingRight: 10,
                                backgroundColor: isShowableExited ? Colors.CARD_HEADER_COLOR : Colors.FLORAL_WHITE,
                            }}
                            contentContainerStyle={{
                                backgroundColor: Colors.FLORAL_WHITE,
                            }}
                            data={getFilteredData || multipleSelectData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderMultipleSelectItem}
                            ListEmptyComponent={renerListEmptyComponent}
                        />
                    )}
                    {isAddButton && <PrimaryButton onPress={onPressAddButton} title={'Add new'.toUpperCase()} textColor={Colors.DEFAULT_TEXT_COLOR} buttonColor={Colors.CARD_HEADER_COLOR} height={30} />}
                </View>
            </Flyout>
        </>
    );
};

export default memo(CustomPicker);
