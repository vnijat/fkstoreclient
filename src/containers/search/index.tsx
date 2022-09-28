import React, { FC, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { ClearIcon, FilterByIcon } from '../../assets/icons/searchContainerIcons';
import CustomPicker from '../../components/customPicker';
import CustomPressable from '../../components/customPressable';
import { InputItem } from '../../components/inputItem';
import { useGetItemInputsQuery } from '../../modules/api/apiSlice';
import { clearFilters, setFilterByParams, setSelectedWithLabel } from '../../modules/redux/filterSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { selectFilterByForPicker, selectSelectedWithLabel } from '../../modules/redux/selectors/filterSelector';
import { useAppDispatch } from '../../modules/redux/store';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import FilterItem from './component/filterItems';
import { getStyle } from './styles';




interface ISearchContainer {
    searchValue: string;
}


const SearchContainer: FC<ISearchContainer> = ({ searchValue }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const pickerFilterParams = useSelector(selectFilterByForPicker, shallowEqual);
    const selectedWithLabel = useSelector(selectSelectedWithLabel, shallowEqual);
    const searchInputRef = useRef(null);
    const { data: dataForFilterBy } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data
        }
        ),
        pollingInterval: 5000
    });


    const onInputvalueChange = (text: string) => {
        dispatch(setQueryParams({ search: text, page: 1 }));
    };


    const onSelectIdForFilter = (selected: { id: number; label: string; parent: FilterParamskey; }) => {
        dispatch(setSelectedWithLabel(selected));
        dispatch(setFilterByParams({ id: selected.id, parent: selected.parent }));
    };

    const renderSearch = useMemo(() => {
        return <InputItem width={'100%'} setValue={onInputvalueChange} inputValue={searchValue || ''} inputRef={(r) => searchInputRef.current = r} isSearch={true} />;

    }, [searchValue]);


    const renderFilterByPickers = useMemo(() => {
        if (dataForFilterBy) {
            const titleArray = Object.keys(dataForFilterBy);
            if (titleArray.length) {
                return titleArray.map((title, index) => {
                    const parent = `${title}Id` as keyof typeof pickerFilterParams;
                    const selectedIds = pickerFilterParams[parent];
                    const data = dataForFilterBy[title];
                    return < CustomPicker isDataSearchEnabled title={title} data={data} onSelect={onSelectIdForFilter} selectedIds={selectedIds} parent={parent} key={index} />;
                });

            }
        } else {
            return null;
        }

    }, [dataForFilterBy, pickerFilterParams]);



    const clearFiler = () => {
        dispatch(clearFilters());
        dispatch(setQueryParams({ search: '', page: 1 }));
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


    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 17, maxHeight: 300, minHeight: 40, paddingTop: 5, flexWrap: 'wrap' }}>
                {renderFilterItems}
            </View>
            <View style={style.search}>
                <View style={{ flex: 1 }}>
                    {renderSearch}
                </View>
            </View>
            <View style={style.sortBy}>
                <View style={{ marginHorizontal: 1 }}>
                    <FilterByIcon size={20} color={Colors.DEFAULT_TEXT_COLOR} />
                </View>
                {renderFilterByPickers}
                <CustomPressable onPress={clearFiler}
                    onHoverOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}
                >
                    <Text style={style.clearText}>
                        <ClearIcon size={20} color={Colors.METALLIC_GOLD} />
                    </Text>
                </CustomPressable>
            </View>
        </View>

    );
};

export default SearchContainer;