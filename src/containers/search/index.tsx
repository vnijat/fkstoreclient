import React, { FC, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { shallowEqual, useSelector } from 'react-redux';
import CustomPicker from '../../components/customPicker';
import CustomPressable from '../../components/customPressable';
import { InputItem } from '../../components/inputItem';
import { useGetItemInputsQuery } from '../../modules/api/apiSlice';
import { clearFilters, setFilterByParams, setSelectedWithLabel } from '../../modules/redux/filterSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { selectFilterByForPicker, selectSelectedWithLabel } from '../../modules/redux/selectors/filterSelector';
import { useAppDispatch } from '../../modules/redux/store';
import { FilterParamskey } from '../../types/ItemsQuery';
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
                    return < CustomPicker title={title} data={data} onSelect={onSelectIdForFilter} selectedIds={selectedIds} parent={parent} key={index} />;
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
            <View style={style.search}>
                <View style={{ flex: 1, paddingTop: 15 }}>
                    {renderSearch}
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 17, marginVertical: 2 }}>
                {renderFilterItems}
            </View>
            <View style={style.sortBy}>
                <Text style={style.filterByText}>
                    {'Filter By:'}
                </Text>
                {renderFilterByPickers}
                <CustomPressable onPress={clearFiler}
                    onHoverOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}
                >
                    <Text style={style.clearText}>
                        {'Clear'}
                    </Text>
                </CustomPressable>
            </View>
        </View>

    );
};

export default SearchContainer;