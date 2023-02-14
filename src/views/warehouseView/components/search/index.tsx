import CheckBox from '@react-native-community/checkbox';
import React, { FC, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { cos } from 'react-native-reanimated';
import { shallowEqual, useSelector } from 'react-redux';
import { ClearIcon } from '../../../../assets/icons/searchContainerIcons';
import CustomPressable from '../../../../components/customPressable';
import { InputItem } from '../../../../components/inputItem';
import { PrimaryButton } from '../../../../components/primaryButton';
import CustomPicker from '../../../../containers/customPicker';
import { useGetItemInputsQuery } from '../../../../modules/api/apiSlice';
import UseLanguage from '../../../../modules/lozalization/useLanguage.hook';
import { setSelectedWithLabel, setFilterByParams, clearFilters } from '../../../../modules/redux/filterSlicer';
import { setItemQueryParams } from '../../../../modules/redux/itemQuerySlicer';
import { setIsShowAddEditModal } from '../../../../modules/redux/itemsSlicer';
import { selectFilterByForPicker, selectSelectedWithLabel } from '../../../../modules/redux/selectors/filterSelector';
import { useAppDispatch } from '../../../../modules/redux/store';
import { FilterParamskey, ItemOptionForInputs } from '../../../../types/item';
import { Colors } from '../../../../utils/colors';
import { currency } from '../../../../utils/currency.windows';
import FilterItem from './component/filterItems';
import { getStyle } from './styles';



interface ISearchContainer {
    searchValue: string;
    overallPrice: number;
    outOfStockParam?: boolean;

}


const SearchContainer: FC<ISearchContainer> = ({ searchValue, overallPrice, outOfStockParam }) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const lang = UseLanguage();
    const pickerFilterParams = useSelector(selectFilterByForPicker, shallowEqual);
    const selectedWithLabel = useSelector(selectSelectedWithLabel, shallowEqual);
    const searchInputRef = useRef(null);
    const isHasFitlerParams = useMemo(() => Object.values(pickerFilterParams).some((item) => item.length), [pickerFilterParams]);
    const { data: dataForFilterBy } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data
        }
        ),
        pollingInterval: 5000
    });

    const onInputvalueChange = (text: string) => {
        dispatch(setItemQueryParams({ search: text, page: 1 }));
    };

    const onSelectIdForFilter = (selected: { id: number; label: string; parent: FilterParamskey; }) => {
        dispatch(setSelectedWithLabel(selected));
        dispatch(setFilterByParams({ id: selected.id, parent: selected.parent }));
    };

    const renderSearch = useMemo(() => {
        return <InputItem width={'100%'} setValue={onInputvalueChange} inputValue={searchValue || ''} inputRef={(r) => searchInputRef.current = r} isSearch={true} />;

    }, [searchValue]);

    const inWaitAnotherData = [{ title: lang['location'], waitsForDtokey: 'storeId', waitsForTitle: lang['store'] }];


    const renderFilterByPickers = useMemo(() => {
        if (dataForFilterBy) {
            const titleArray = Object.keys(dataForFilterBy);
            if (titleArray.length) {
                return titleArray.map((title, index) => {
                    let data = dataForFilterBy[title as keyof ItemOptionForInputs];
                    const pickerTitle = lang[title as keyof typeof lang] ? lang[title as keyof typeof lang] : title;
                    const waitsFor = inWaitAnotherData.find(item => item.title === title)?.waitsForDtokey;
                    const waitsForTitle = inWaitAnotherData.find(item => item.title === title)?.waitsForTitle;
                    let isDisabled = !!waitsFor?.length;
                    const requiredDataIds = !!waitsFor && pickerFilterParams[waitsFor as keyof typeof pickerFilterParams];
                    if (requiredDataIds.length) {
                        data = dataForFilterBy[title as keyof ItemOptionForInputs]?.filter(item => requiredDataIds.includes(Number((item[waitsFor] || item[waitsFor.toLowerCase()]))));
                        isDisabled = false;
                    }
                    const parent = `${title}Id` as keyof typeof pickerFilterParams;
                    const selectedIds = pickerFilterParams[parent];
                    return < CustomPicker
                        isDataSearchEnabled
                        title={pickerTitle}
                        data={data}
                        onSelect={onSelectIdForFilter}
                        selectedIds={selectedIds}
                        parent={parent}
                        key={index}
                        buttonStyle={style.pickerButtonStyle}
                        requiredText={`Please select ${waitsForTitle} first`.toUpperCase()}
                        isDisabled={isDisabled}
                    />;
                });

            }
        } else {
            return null;
        }

    }, [dataForFilterBy, pickerFilterParams, inWaitAnotherData, lang]);



    const clearFiler = async () => {
        if (isHasFitlerParams || searchValue.trim().length) {
            dispatch(clearFilters());
            dispatch(setItemQueryParams({ search: '', page: 1 }));
        }
    };


    const removeFromFiltered = (selected: { id: number; label: string; parent: FilterParamskey; }) => {
        dispatch(setSelectedWithLabel(selected));
        dispatch(setFilterByParams({ id: selected.id, parent: selected.parent }));
    };

    const renderFilterItems = useMemo(() => {
        if (selectedWithLabel.length) {
            return selectedWithLabel.map((item: { id: number, label: string, parent: FilterParamskey; }, index: number) => {
                const { id, label, parent } = item;
                return <FilterItem label={label} key={index} onPress={() => removeFromFiltered({ id, label, parent })} />;
            });
        } else {
            return null;
        }

    }, [selectedWithLabel.length]);


    const onPressAddItem = () => {
        dispatch(setIsShowAddEditModal(true));

    };

    const handleOutofstockSelect = (value: boolean) => {
        dispatch(setItemQueryParams({ outOfStock: value, page: 1 }));
    };

    return (
        <View style={style.container}>
            <View style={style.filterItemsContainer}>
                {renderFilterItems}
            </View>
            <View style={style.search}>
                <View style={{ flex: 1 }}>
                    {renderSearch}
                </View>
            </View>
            <View style={style.sortBy}>
                {renderFilterByPickers}
                <CustomPressable onPress={clearFiler}
                    onHoverOpacity
                    style={style.clearButtonContainer}
                >
                    <View style={style.clearText} tooltip={lang['clearFilters']}  >
                        <ClearIcon size={22} color={isHasFitlerParams ? Colors.METALLIC_GOLD : Colors.DEFAULT_TEXT_COLOR} />
                    </View>
                </CustomPressable>
                <View style={style.rightContainer}>
                    <PrimaryButton
                        title={lang['newProduct'].toUpperCase()}
                        onPress={onPressAddItem}
                        onHoverOpacity
                        textColor={Colors.CARD_COLOR}
                        buttonColor={Colors.DEFAULT_TEXT_COLOR}
                        borderRadius={2}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: Colors.DEFAULT_TEXT_COLOR }}>
                            {`${lang['outOfStock']}: `.toUpperCase()}
                        </Text>
                        <CheckBox
                            tintColor={Colors.CARD_HEADER_COLOR}
                            onFillColor={Colors.CARD_HEADER_COLOR}
                            onCheckColor={Colors.METALLIC_GOLD}
                            onTintColor={Colors.CARD_COLOR}
                            value={outOfStockParam}
                            onValueChange={handleOutofstockSelect}

                        />
                        <Text style={style.infoText}>
                            {`${lang['overallPrice']} : `.toUpperCase()}
                            <Text style={{ color: Colors.METALLIC_GOLD }}>
                                {currency.format(overallPrice)}
                            </Text>
                        </Text>
                    </View>

                </View>
            </View>
        </View>

    );
};

export default SearchContainer;