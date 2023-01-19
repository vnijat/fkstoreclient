import CheckBox from '@react-native-community/checkbox';
import React, { memo, useMemo, useRef, useState, useCallback } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleProp,
    ViewStyle,
    Alert,
    TextStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Flyout } from 'react-native-windows';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';
import { setIsOpenOptionModal, setOptionNameForModal } from "../../modules/redux/itemOptions";
import HELP from '../../services/helpers';
import { InputItem } from '../../components/inputItem/index.windows';
import CustomPressable from '../../components/customPressable';
import { PrimaryButton } from '../../components/primaryButton';
import MultipleSelectItem, { IMultipleSelectData } from './components/multipleSelectItem';
import { inputsForItemOptions } from '../../configs/ItemOptionsInputConfigs';
import SingleSelectItem from './components/singleSelectItem';
import { useAppDispatch } from '../../modules/redux/store';
import { FilterParamskey } from '../../types/item';

export interface IsingelSelectData {
    id?: number;
    label?: string;
    value?: number | string | boolean | null;
    code?: string;
    nested?: IsingelSelectData[];
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
    butonTextStyle?: StyleProp<TextStyle> | undefined;
    itemStyle?: StyleProp<ViewStyle> | undefined;
    selectedItemStyle?: StyleProp<ViewStyle> | undefined;
    itemTextStyle?: StyleProp<TextStyle> | undefined;
    selectedItemTextStyle?: StyleProp<TextStyle> | undefined;
    isDataSearchEnabled?: boolean;
    isAddButton?: boolean;
    dataKeyName?: keyof typeof inputsForItemOptions;
    isEditable?: boolean;
    isDisabled?: boolean;
    requiredText?: string;
    arrowDownColor?: string;
    onPressEditButton?: (dataId: number, dataKeyName?: string) => void;
    onPressAddButton?: (dataKeyName: string) => void;
    disablePickerActionButtons?: boolean;
    disabledForEdit?: boolean;
    canSelectParent?: boolean;
    isDeselectEnabled?: boolean;
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
    arrowDownColor,
    onPressEditButton,
    onPressAddButton,
    disablePickerActionButtons,
    disabledForEdit,
    canSelectParent,
    isDeselectEnabled
}: ICustomPicker) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const [isShowContent, setShowContent] = useState(false);
    const [searchText, setSearchText] = useState('');
    const buttonRef = useRef(null);


    const getFilteredData = useMemo(() => {
        let filteredData;
        if (isDataSearchEnabled && searchText.trim().length) {
            const nestedData = multipleSelectData! || singleSelectData;
            const dataForfilter = HELP.flatNestedCategories(nestedData);
            const regEx = new RegExp(searchText.trim(), 'i');
            filteredData = dataForfilter?.filter((data: { label: string; hasNested: boolean; }) => !data.hasNested && regEx.test(data.label.trim()));
        }
        return filteredData;
    }, [searchText, singleSelectMode, singleSelectData, multipleSelectData, isDataSearchEnabled]);


    const onPress = useCallback(() => {
        if (isDisabled) {
            HELP.alertError(undefined, 'Requires field before select', requiredText);
        } else if (disabledForEdit) {
            HELP.alertError(undefined, 'You cant edit this field');
        } else {
            setShowContent(true);
        }
    }, [isDisabled, disabledForEdit, requiredText]);

    const onDismiss = useCallback(() => {
        setSearchText('');
        setShowContent(false);
    }, []);


    const onPressEdit = useCallback(async (optionId: number | string) => {
        if (onPressEditButton) {
            onPressEditButton(optionId as number, dataKeyName as string);
            dispatch(setIsOpenOptionModal(true));
        }
    }, [dataKeyName]);

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


    const renderMultipleSelectItem = useMemo(
        () =>
            ({ item, index }: { item: IMultipleSelectData; index: number; }) => {
                const { id, label } = item;
                const isSelected = !!selectedIds?.includes(id);
                return (
                    <>
                        <MultipleSelectItem {...{ id, index, label, isSelected, itemStyle, itemTextStyle, selectedIds, parent, selectedItemStyle, selectedItemTextStyle, onSelect }} nestedData={item?.nested} key={`${id}-${index}`} indent={0} />
                    </>
                );
            },
        [selectedIds, multipleSelectData?.length, parent, itemStyle]
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



    const onPressAdd = () => {
        if (onPressAddButton) {
            setShowContent(false);
            onPressAddButton(dataKeyName!);
        } else {
            setShowContent(false);
            dispatch(setIsOpenOptionModal(true));
            dispatch(setOptionNameForModal(dataKeyName!));
        }

    };

    const singleSelectedTitle = useMemo(() => {
        if (singleSelectData?.length) {
            const selected = HELP.flatNestedCategories(singleSelectData).filter((item) => item.value == singleSelected)[0];
            return selected?.label ?? 'select';
        } else return 'no data';
    }, [singleSelected, singleSelectData?.length]);


    const renderSingleSelectItem = useMemo(
        () =>
            ({ item, index }: { item: IsingelSelectData; index: number; }) => {
                return (
                    <>
                        <SingleSelectItem
                            {...{ isDeselectEnabled, itemStyle, selectedItemStyle, selectedItemTextStyle, itemTextStyle, singleSelected, disablePickerActionButtons, isEditable, index }}
                            data={item}
                            indent={0}
                            onPressSingleItem={(data: IsingelSelectData) => onPressSingleItem(data)}
                            onPressEditButton={(value?: string | number) => onPressEdit(value!)}
                            canSelectParent={canSelectParent}
                            key={`${index}-${item.label}`}
                        />
                    </>
                );
            },
        [singleSelected, singleSelectData?.length, itemStyle, selectedItemStyle, itemTextStyle, selectedItemTextStyle, isEditable, isDisabled, disablePickerActionButtons]
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
                    <Text style={[butonTextStyle || style.pickerButtonText]}>
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
                <View style={style.flyoutContent}>
                    {isDataSearchEnabled
                        &&
                        <View style={style.searchInputContainer}>
                            {renderSearchInput}
                        </View>
                    }
                    {singleSelectMode ? (
                        <FlatList
                            style={[style.listContainer, { backgroundColor: isShowableExited ? Colors.CARD_HEADER_COLOR : Colors.FLORAL_WHITE }]}
                            contentContainerStyle={style.listContentContainer}
                            data={getFilteredData || singleSelectData}
                            listKey={(item, index) => `${index}-singleModeList`}
                            keyExtractor={(item, index) => `${item.label}-${item.value}`}
                            renderItem={renderSingleSelectItem}
                            ListEmptyComponent={renerListEmptyComponent}
                        />
                    ) : (
                        <FlatList
                            style={[style.listContainer, { backgroundColor: isShowableExited ? Colors.CARD_HEADER_COLOR : Colors.FLORAL_WHITE }]}
                            contentContainerStyle={style.listContentContainer}
                            data={getFilteredData || multipleSelectData}
                            keyExtractor={(item, index) => item?.id.toString()}
                            listKey={(item, index) => `${index}-multiselectList`}
                            renderItem={renderMultipleSelectItem}
                            ListEmptyComponent={renerListEmptyComponent}
                        />
                    )}
                    {isAddButton && <PrimaryButton onPress={onPressAdd} title={'Add new'.toUpperCase()} textColor={Colors.DEFAULT_TEXT_COLOR} buttonColor={Colors.CARD_HEADER_COLOR} height={30} disabled={disablePickerActionButtons} />}
                </View>
            </Flyout>
        </>
    );
};

export default memo(CustomPicker);
