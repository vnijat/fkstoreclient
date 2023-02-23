import CheckBox from '@react-native-community/checkbox';
import React, { FC, useMemo, useRef, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
import FONT from '../../../../utils/font';
import WareHouseDataProvider from '../../provider/data';
import WareHouseLogicProvider from '../../provider/logic';
import FilterItem from './component/filterItems';
import { getStyle } from './styles';



interface ISearchContainer {
    logicProvider: ReturnType<typeof WareHouseLogicProvider>;
    dataProvider: ReturnType<typeof WareHouseDataProvider>;
}


const SearchContainer: FC<ISearchContainer> = ({ logicProvider, dataProvider }) => {
    const {
        pickerFilterParams,
        selectedFilterParamsWithLabel,
        isSomeParamSelected,
        dataForFilterBy,
        wareHouseQueryParams,
        queryData: {
            data: queryData
        }
    } = dataProvider;
    const {
        handleFilterParamSelect,
        handleSearchValueChange,
        handleClearFilters,
        handleCreateNew,
        handleOutofstockSelect
    } = logicProvider;

    const style = useMemo(() => getStyle(), []);
    const lang = UseLanguage();
    const searchInputRef = useRef(null);

    const renderSearch = useMemo(() => {
        return <InputItem width={'100%'} setValue={(value) => handleSearchValueChange(value as string)} inputValue={wareHouseQueryParams?.search || ''} inputRef={(r) => searchInputRef.current = r} isSearch={true} />;

    }, [wareHouseQueryParams?.search]);

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
                        onSelect={handleFilterParamSelect}
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



    const clearFiler = () => {
        if (isSomeParamSelected || wareHouseQueryParams?.search?.trim().length) {
            handleClearFilters();
        }
    };


    const renderFilterItems = useMemo(() => {
        if (selectedFilterParamsWithLabel.length) {
            return selectedFilterParamsWithLabel.map((item: { id: number, label: string, parent: FilterParamskey; }, index: number) => {
                const { id, label, parent } = item;
                return <FilterItem label={label} key={index} onPress={() => handleFilterParamSelect({ id, label, parent })} />;
            });
        } else {
            return null;
        }

    }, [selectedFilterParamsWithLabel.length]);


    return (
        <View style={style.container}>
            < View style={style.topContainer}>
                <View style={{ flexShrink: 1, maxHeight: 40 }}>
                    <ScrollView >
                        <View style={style.filterItemsContainer}>
                            {renderFilterItems}
                        </View>
                    </ScrollView>
                </View>
                <View style={style.search}>
                    {renderSearch}
                </View>
            </View>
            < View style={style.bottomContainer}>
                <View style={style.sortBy}>
                    <View style={style.bottomLeftContainer}>
                        <View style={style.sortByPickers}>
                            {renderFilterByPickers}
                        </View>
                        <CustomPressable onPress={clearFiler}
                            onHoverOpacity
                            style={style.clearButtonContainer}
                        >
                            <View style={style.clearText} tooltip={lang['clearFilters']}  >
                                <ClearIcon size={22} color={isSomeParamSelected ? Colors.METALLIC_GOLD : Colors.DEFAULT_TEXT_COLOR} />
                            </View>
                        </CustomPressable>
                    </View>
                    <View style={style.bottomRightContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={style.infoText}>
                                {`${lang['outOfStock']}: `.toUpperCase()}
                            </Text>
                            <CheckBox
                                tintColor={Colors.CARD_HEADER_COLOR}
                                onFillColor={Colors.CARD_HEADER_COLOR}
                                onCheckColor={Colors.METALLIC_GOLD}
                                onTintColor={Colors.CARD_COLOR}
                                value={queryData?.outOfStock}
                                onValueChange={handleOutofstockSelect}

                            />
                            <Text style={style.infoText}>
                                {`${lang['overallPrice']} : `.toUpperCase()}
                                <Text style={{ color: Colors.METALLIC_GOLD }}>
                                    {currency.format(queryData?.sumTotal!)}
                                </Text>
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PrimaryButton
                                title={lang['newProduct'].toUpperCase()}
                                onPress={handleCreateNew}
                                onHoverOpacity
                                textColor={Colors.CARD_COLOR}
                                buttonColor={Colors.DEFAULT_TEXT_COLOR}
                                borderRadius={2}
                            />
                        </View>

                    </View>
                </View>
            </View>
        </View >

    );
};

export default SearchContainer;