import React, { FC, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { shallowEqual, useSelector } from 'react-redux';
import CustomPicker from '../../components/customPicker';
import { InputItem } from '../../components/inputItem';
import { useGetItemInputsQuery } from '../../modules/api/apiSlice';
import { clearFilters, setFilterByParams, setSelectedWithLabel } from '../../modules/redux/filterSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { selectFilterByForPicker } from '../../modules/redux/selectors/filterSelector';
import { useAppDispatch } from '../../modules/redux/store';
import { FilterParamskey } from '../../types/ItemsQuery';
import { getStyle } from './styles';




interface ISearchContainer {
    searchValue: string;
}


const SearchContainer: FC<ISearchContainer> = ({ searchValue }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const pickerFilterParams = useSelector(selectFilterByForPicker, shallowEqual);
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

    console.log("isFocused--->>>",searchInputRef?.current?.isFocused());

    const renderSearch = useMemo(() => {
        return <InputItem width={'100%'} setValue={onInputvalueChange} inputValue={searchValue || ''} placeHolder={'Search in name or description'} inputRef={(r) => searchInputRef.current = r} />;

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
    };

    return (
        <View style={style.container}>
            <View style={style.search}>
                <View style={{ flex: 1 }}>
                    {renderSearch}
                </View>
            </View>
            <View style={style.sortBy}>
                <Text style={style.filterByText}>
                    {'Filter By:'}
                </Text>
                {renderFilterByPickers}
                <Text style={style.clearText}
                    onPress={clearFiler}
                >
                    {'Clear'}
                </Text>
            </View>
        </View>

    );
};

export default SearchContainer;