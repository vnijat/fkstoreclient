import React, { FC, useEffect, useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ItemListTable from '../../containers/itemList';
import ItemModal from '../../containers/itemModal';
import PaginationContainer from '../../containers/paginationContainer';
import ListFooter from '../../containers/paginationContainer';
import SearchContainer from '../../containers/search';
import { useGetAllItemsQuery, } from '../../modules/api/apiSlice';
import { setItemQueryParams } from '../../modules/redux/itemQuerySlicer';
import { selectFilterbyForQuery } from '../../modules/redux/selectors/filterSelector';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import AddEditItemModal from './components/addEditItemModal';
import { getStyle } from './styles';


export const ItemsView: FC<any> = ({ navigation }) => {
  const style = getStyle();
  const selectQueryParams = useSelector((state: RootState) => state.itemQuerySlicer, shallowEqual);
  const dispatch = useAppDispatch();
  const [isAlerted, setIsAlerted] = useState<boolean>(false);
  const queryFilterParams = useSelector(selectFilterbyForQuery, shallowEqual);
  const { data: queryData, error: fetchError, isLoading } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
      data,
      error,
      isLoading: isUninitialized ? true : isLoading,
    }
    ),
    pollingInterval: 5000
  });
  useEffect(() => {
    dispatch(setItemQueryParams({ ...queryFilterParams, page: 1 }));
  }, [queryFilterParams]);

  useEffect(() => {
    if (fetchError && !isAlerted) {
      setIsAlerted(true);
      Alert.alert(`${fetchError?.error}`, "Please check, is API correct", [
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
    return < PaginationContainer meta={queryData?.meta} actionFunction={setItemQueryParams} />;
  }, [queryData?.meta, queryData?.itemsCount, setItemQueryParams]);


  const renderListTable = useMemo(() => {
    if (queryData?.items.length || isLoading) {
      return <ItemListTable data={queryData?.items || []} isLoading={isLoading} />;
    }
    else {
      return null;
    }
  }, [queryData?.items, isLoading]);



  const renderSearchContainer = useMemo(() => <SearchContainer searchValue={selectQueryParams.search || ''} overallPrice={queryData?.sumTotal ?? 0} />, [selectQueryParams.search, queryData?.sumTotal]);


  return (
    <View style={style.container}>
      <AddEditItemModal />
      <ItemModal itemsData={queryData?.items!} />
      <View style={{ flex: 0.9, backgroundColor: Colors.BACKGROUND_COLOR }}>
        <View style={{ backgroundColor: Colors.CARD_COLOR, flexShrink: 0.2 }}>
          {renderSearchContainer}
        </View>
        <View style={{ flexGrow: 1 }}>
          {renderListTable}
        </View>
      </View>
      <View style={{ flex: 0.1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
        {renderFooter}
      </View>
    </View >
  );
};
