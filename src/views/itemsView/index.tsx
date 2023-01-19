import React, { FC, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { useGetAllItemsQuery, } from '../../modules/api/apiSlice';
import { setItemQueryParams } from '../../modules/redux/itemQuerySlicer';
import { selectFilterbyForQuery } from '../../modules/redux/selectors/filterSelector';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import HELP from '../../services/helpers';
import AddEditItemModal from './components/addEditItemModal';
import ItemListTable from './components/itemList';
import ItemModal from './components/itemModal';
import SearchContainer from './components/search';
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
      HELP.alertError(undefined, `${fetchError?.error}`, "Please check, is API correct",);
    } if (!fetchError) {
      setIsAlerted(false);
    }
  }, [fetchError, isAlerted]);

  const renderFooter = useMemo(() => {
    return < PaginationContainer
      meta={queryData?.meta}
      actionFunction={setItemQueryParams} />;
  }, [queryData?.meta, queryData?.itemsCount, setItemQueryParams]);


  const renderListTable = useMemo(() => {
    if (queryData?.items.length || isLoading) {
      return <ItemListTable data={queryData?.items || []} isLoading={isLoading} />;
    }
    else {
      return null;
    }
  }, [queryData?.items, isLoading]);



  const renderSearchContainer = useMemo(
    () => <SearchContainer
      searchValue={selectQueryParams.search || ''}
      overallPrice={queryData?.sumTotal ?? 0}
      outOfStockParam={queryData?.outOfStock}
    />,
    [selectQueryParams.search, queryData?.sumTotal, queryData?.outOfStock]);


  return (
    <View style={style.container}>
      <AddEditItemModal />
      <ItemModal />
      <View style={style.listContainer}>
        <View style={style.searchContainer}>
          {renderSearchContainer}
        </View>
        <View style={style.listTable}>
          {renderListTable}
        </View>
      </View>
      <View style={style.footContainer}>
        {renderFooter}
      </View>
    </View >
  );
};
