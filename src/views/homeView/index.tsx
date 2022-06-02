import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import { Flyout } from 'react-native-windows';
import { shallowEqual, useSelector } from 'react-redux';
import CustomPicker from '../../components/customPicker';
import { InputItem } from '../../components/inputItem';
import { ListHeader } from '../../components/listHeader';
import RowItem from '../../components/rowItem';
import ItemListTable from '../../containers/itemList';
import ItemsContent from '../../containers/itemsContent';
import ListFooter from '../../containers/listFooter';
import SearchContainer from '../../containers/search';
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
  const { currentData: queryData, error: fetchError, isLoading } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ currentData, isLoading, isUninitialized, error }) => ({
      currentData,
      error,
      isLoading: isUninitialized ? true : isLoading,
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

  const renderFooter = useMemo(() => {
    return < ListFooter meta={queryData?.meta} />;
  }, [queryData?.meta]);


  const renderListTable = useMemo(() => {
    if (queryData?.items.length || isLoading) {
      return <ItemListTable data={queryData?.items || []} isLoading={isLoading} />;
    }
    else {
      return null;
    }
  }, [queryData?.items, isLoading]);




  const renderSearchContainer = useMemo(() => <SearchContainer searchValue={selectQueryParams.search || ''} />, [selectQueryParams.search]);


  return (
    <View style={style.container}>
      <View style={{ flex: 0.9, flexGrow: 0.9 }}>
        {renderSearchContainer}
        {renderListTable}
      </View>
      {renderFooter}
    </View >
  );
};
