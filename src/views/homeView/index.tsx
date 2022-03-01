import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, TouchableWithoutFeedback, View, Dimensions, useWindowDimensions, Pressable, Alert, Image } from 'react-native';
import { Flyout, Popup } from 'react-native-windows';
import { useSelector } from 'react-redux';
import { AddItem } from '../../components/addItem';
import { FlatListContent } from '../../components/flatlistContent';
import { InventoryInfo } from '../../components/inventoryInfo';
import { ListFooter } from '../../components/listFooter';
import { ListHeader } from '../../components/listHeader';
import { useDeleteManyItemsMutation, useGetAllItemsQuery } from '../../modules/api/apiSlice';
import { addItemId, clearSelectedItems, setIsEditMode } from '../../modules/redux/ItemsSlicer';
import { setQueryParams } from '../../modules/redux/querySlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { selectMany } from '../../services/ItemServices';
import { Data, Item } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';


export const HomeView: FC<any> = ({ navigation }) => {
  const style = useMemo(() => getStyle(), []);
  const selectQueryParams = useSelector((state: RootState) => state.querySlicer);
  const dispatch = useAppDispatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const { data: queryData, error: fetchError, isLoading, itemsCount, } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ data, isLoading, isUninitialized, error, }) => ({
      data,
      error,
      isLoading: isUninitialized ? true : isLoading,
      itemsCount: data?.itemsCount ? data?.itemsCount : 0,
    }
    ),
    pollingInterval: 5000
  });
  const isAllfetched = queryData?.items.length === itemsCount;

  useEffect(() => {
    if (fetchError) {
      Alert.alert(`${fetchError?.error}`);
    }
  }, [fetchError]);

  const selectBulk = useCallback((from: number, to: number) => selectMany(from, to, queryData!, dispatch, addItemId), [queryData]);

  const loadMore = () => {
    const limit = selectQueryParams.limit! + 10;
    dispatch(setQueryParams({ limit }));
  };

  return (
    <View style={style.container}>
      <AddItem />
      <View style={{ flex: 0.10 }}>
        <InventoryInfo itemsCount={itemsCount} />
      </View>
      <View style={{ flexDirection: 'row', flex: 0.90, }}>
        <View style={{ flex: 0.8, flexGrow: 0.8, justifyContent: 'center', backgroundColor: Colors.CULTURED }}>
          <ListHeader items={queryData?.items!} />
          {isLoading && <ActivityIndicator />}
          <FlatList
            style={{ flex: 1 }}
            data={queryData?.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              const { name, barCode, category, quantity, purchasePrice, unit, id, photoPath, pricePerUnit, } = item;
              return (
                <FlatListContent key={id + index} id={id} name={name} barcode={barCode?.code!} category={category?.title!} quantity={Number(quantity)} stockPrice={Number(pricePerUnit)} purchasePrice={Number(purchasePrice)} unit={unit.name} itemIndex={index} lastItem={queryData.items.length - 1} selectBulk={selectBulk} photoName={photoPath || ''} />
              );
            }}
          />
          {isAllfetched ? null : <Pressable onPress={loadMore} style={{ position: 'absolute', bottom: 65, padding: 5, borderRadius: 5, backgroundColor: '#4DB6AC', alignSelf: 'center' }} >
            {isLoading ? <ActivityIndicator /> : <Text style={{ color: '#FFF', fontSize: 10 }}>{'Load More'}</Text>}
          </Pressable>}
          <ListFooter />
        </View>
      </View>
    </View >
  );
};
