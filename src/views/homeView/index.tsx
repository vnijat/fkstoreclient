import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Alert, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { ListHeader } from '../../components/listHeader';
import RowItem from '../../components/rowItem';
import ItemsContent from '../../containers/itemsContent';
import ListFooter from '../../containers/listFooter';
import { useGetAllItemsQuery } from '../../modules/api/apiSlice';
import { addItemId } from '../../modules/redux/ItemsSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { selectMany } from '../../services/ItemServices';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';

export const HomeView: FC<any> = ({ navigation }) => {
  const style = useMemo(() => getStyle(), []);
  const selectQueryParams = useSelector((state: RootState) => state.querySlicer);
  const dispatch = useAppDispatch();
  const [isAlerted, setIsAlerted] = useState<boolean>(false);
  const { currentData: queryData, error: fetchError, isLoading, itemsCount } = useGetAllItemsQuery(selectQueryParams, {
    selectFromResult: ({ data, isLoading, isUninitialized, error, currentData }) => ({
      data,
      error,
      isLoading: isUninitialized ? true : isLoading,
      itemsCount: data?.itemsCount ? data?.itemsCount : 0,
      currentData,
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
  },
    [queryData]);


  return (
    <View style={style.container}>
      <View style={{ flex: 0.9, flexGrow: 0.9, }}>
        <ListHeader />
        <RowItem height={10} />
        {isLoading ?
          <View style={{ position: 'absolute', top: 100, alignSelf: 'center' }}>
            <ActivityIndicator size={'small'} color={Colors.OLD_GOLD} />
          </View>
          :
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
                photoPath,
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
                  photoName={photoPath || ''}
                />
              );
            }}
          />

        }

      </View>
      {renderFooter}
    </View >
  );
};
