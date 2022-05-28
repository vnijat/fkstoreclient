import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Alert, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { InputItem } from '../../components/inputItem';
import { ListHeader } from '../../components/listHeader';
import RowItem from '../../components/rowItem';
import ItemsContent from '../../containers/itemsContent';
import ListFooter from '../../containers/listFooter';
import { useGetAllItemsQuery } from '../../modules/api/apiSlice';
import { addItemId } from '../../modules/redux/ItemsSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { selectMany } from '../../services/ItemServices';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';

export const HomeView: FC<any> = ({ navigation }) => {
  const style = getStyle();
  const selectQueryParams = useSelector((state: RootState) => state.querySlicer);
  const dispatch = useAppDispatch();
  const [isAlerted, setIsAlerted] = useState<boolean>(false);
  const { data: queryData, error: fetchError, isLoading, itemsCount } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
      data,
      error,
      isLoading: isUninitialized ? true : isLoading,
      itemsCount: data?.itemsCount ? data?.itemsCount : 0,
    }
    ),
    pollingInterval: 5000
  });
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

  return (
    <View style={style.container}>
      <View style={{ flex: 0.9, flexGrow: 0.9 }}>
        <View style={{ height: 70, backgroundColor: Colors.FLORAL_WHITE, marginBottom: 10 }}>
          <View style={{ height: 30, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              {renderSearch}
            </View>
          </View>
        </View>
        <ListHeader />
        <RowItem height={10} />
        {isLoading &&
          <View style={{ position: 'absolute', top: 200 }}>
            <ActivityIndicator color={Colors.OLD_GOLD} />
          </View>
        }
        <FlatList
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
        />
        {renderList}
      </View>
      {renderFooter}
    </View >
  );
};
