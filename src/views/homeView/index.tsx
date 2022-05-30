import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import { Flyout } from 'react-native-windows';
import { shallowEqual, useSelector } from 'react-redux';
import CustomPicker from '../../components/customPicker';
import { InputItem } from '../../components/inputItem';
import { ListHeader } from '../../components/listHeader';
import RowItem from '../../components/rowItem';
import ItemsContent from '../../containers/itemsContent';
import ListFooter from '../../containers/listFooter';
import { useGetAllItemsQuery, useGetItemInputsQuery } from '../../modules/api/apiSlice';
import { clearFilters, setFilterByParams, setSelectedWithLabel } from '../../modules/redux/filterSlicer';
import { addItemId } from '../../modules/redux/ItemsSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { selectFilterByForPicker, selectFilterbyForQuery } from '../../modules/redux/selectors/filterSelector';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { selectMany } from '../../services/ItemServices';
import { FilterParamskey } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';


export const HomeView: FC<any> = ({ navigation }) => {
  const style = getStyle();
  const selectQueryParams = useSelector((state: RootState) => state.querySlicer, shallowEqual);
  const dispatch = useAppDispatch();
  const [isAlerted, setIsAlerted] = useState<boolean>(false);
  const queryFilterParams = useSelector(selectFilterbyForQuery, shallowEqual);
  const pickerFilterParams = useSelector(selectFilterByForPicker, shallowEqual);
  const { currentData: queryData, error: fetchError, isLoading } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ currentData, isLoading, isUninitialized, error }) => ({
      currentData,
      error,
      isLoading: isUninitialized ? true : isLoading,
    }
    ),
    pollingInterval: 5000
  });

  const { data: dataForFilterBy } = useGetItemInputsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data
    }
    ),
    pollingInterval: 5000
  });

  useEffect(() => {
    dispatch(setQueryParams({ ...queryFilterParams, page: 1 }));
  }, [queryFilterParams]);

  useEffect(() => {
    if (fetchError && !isAlerted) {
      setIsAlerted(true);
      Alert.alert(`${fetchError?.error}`, "Please check is API correct", [
        {
          text: 'Ok',
          onPress: () => { }
        },
      ]);
    } if (!fetchError) {
      setIsAlerted(false);
    }
  }, [fetchError, isAlerted]);


  const selectBulk = useCallback((from: number, to: number) => selectMany(from, to, queryData!, dispatch, addItemId), [queryData]);
  const renderFooter = useMemo(() => {
    return < ListFooter meta={queryData?.meta} />;
  }, [queryData?.meta]);

  const onInputvalueChange = (text: string) => {
    dispatch(setQueryParams({ search: text, page: 1 }));
  };
  const renderSearch = useMemo(() => {
    return <InputItem width={'100%'} setValue={onInputvalueChange} inputValue={selectQueryParams.search || ''} />;

  }, [selectQueryParams.search]);


  const renderList = useMemo(() => {
    return <FlatList
      style={{ flex: 1, backgroundColor: Colors.ALABASTER, margin: 5 }}
      data={queryData?.items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        const {
          name,
          barcode,
          category,
          quantity,
          purchasePrice,
          unit,
          id,
          pricePerUnit,
          description,
          supplier,
          store } = item;
        return (
          <ItemsContent
            key={id + index}
            id={id}
            name={name}
            barcode={barcode?.code!}
            category={category?.title!}
            quantity={Number(quantity)}
            stockPrice={Number(pricePerUnit)}
            purchasePrice={Number(purchasePrice)}
            unit={unit.name}
            itemIndex={index}
            lastItem={(queryData?.items.length ?? 1) - 1}
            selectBulk={selectBulk}
          />
        );
      }}
    />;
  }, [queryData?.items]);


  const onSelectIdForFilter = (selected: { id: number; label: string; parent: FilterParamskey; }) => {
    dispatch(setSelectedWithLabel(selected));
    dispatch(setFilterByParams({ id: selected.id, parent: selected.parent }));
  };

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
      <View style={{ flex: 0.9, flexGrow: 0.9 }}>
        <View style={{ backgroundColor: Colors.FLORAL_WHITE, marginBottom: 10, justifyContent: 'space-between' }}>
          <View style={{ minHeight: 100, maxHeight: 300, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              {renderSearch}
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
            <Text style={{ color: Colors.OLD_GOLD, fontWeight: '600', fontSize: 11, textAlign: 'center' }}>
              {'Filter By:'}
            </Text>
            {renderFilterByPickers}
            <Text style={{ color: Colors.OLD_GOLD, fontWeight: '700', fontSize: 14, textAlign: 'center', marginLeft: 10 }}
              onPress={clearFiler}
            >
              {'Clear'}
            </Text>
          </View>
        </View>
        <View>
        </View>
        <ListHeader />
        <RowItem height={10} />
        {isLoading &&
          <View style={{ paddingTop: 100 }}>
            <ActivityIndicator color={Colors.OLD_GOLD} />
          </View>
        }
        {renderList}
      </View>
      {renderFooter}
    </View >
  );
};
