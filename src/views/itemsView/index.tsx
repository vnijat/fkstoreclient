import React, { FC, useEffect, useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ItemListTable from '../../containers/itemList';
import ListFooter from '../../containers/itemList/components/listFooter';
import SearchContainer from '../../containers/search';
import { useGetAllItemsQuery, } from '../../modules/api/apiSlice';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { selectFilterbyForQuery } from '../../modules/redux/selectors/filterSelector';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { getStyle } from './style';

// import countries from 'i18n-iso-countries';
// countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
// countries.registerLocale(require("i18n-iso-countries/langs/az.json"));
// const countryobjects = countries.getNames('en', { select: 'official' });

export const ItemsView: FC<any> = ({ navigation }) => {
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
    return < ListFooter meta={queryData?.meta} totalItems={queryData?.itemsCount ?? 0} />;
  }, [queryData?.meta, queryData?.itemsCount]);


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
