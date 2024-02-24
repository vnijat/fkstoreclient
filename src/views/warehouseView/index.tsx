import React, { FC, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import PaginationContainer from '../../containers/paginationContainer';
import SimpleTable from '../../containers/simpleTable';
import { IContextMenuButton, } from '../../containers/simpleTable/types';
import UseLanguage from '../../modules/lozalization/useLanguage.hook';
import { Item } from '../../types/item';
import ItemModal from './components/itemModal';
import SearchContainer from './components/search';
import WareHouseDataProvider from './provider/data';
import WareHouseLogicProvider from './provider/logic';
import { getStyle } from './styles';

const WareHouseView: FC<any> = ({ navigation }) => {
  const dataProvider = WareHouseDataProvider();
  const logicProvider = WareHouseLogicProvider();
  const lang = UseLanguage();
  const { queryData: { data: queryData, isLoading },
    wareHouseQueryFilterParams,
    wareHouseQueryParams,
    wareHouseTableConfigs, } = dataProvider;
  const { paginationHandler,
    onPressRowItem,
    onPressEdit,
    onResetTable,
    setNewTableConfig,
    handleDeleteWareHouseItems,
  } = logicProvider;
  const style = getStyle();

  const onPressDeleteItem = async (data: Item) => {
    await handleDeleteWareHouseItems([data.id!], lang);
  };

  const tableContextMenuButtons: IContextMenuButton<Item>[] = useMemo(() => [
    { title: 'Edit', onPress: onPressEdit },
    { title: 'Delete', onPress: onPressDeleteItem },
  ], [lang]);


  const renderSearchContainer = useMemo(() => <SearchContainer {...{ dataProvider, logicProvider }} />, [dataProvider, logicProvider]);

  const renderFooter = useMemo(() => {
    return < PaginationContainer
      meta={queryData?.meta}
      paginationHandler={paginationHandler} />;
  }, [queryData?.meta]);


  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.05 }} />
      <View style={style.container}>
        <ItemModal />
        <View style={style.listContainer}>
          <View style={style.searchContainer}>
            {renderSearchContainer}
          </View>
          <View style={style.listTable}>
            {/* {renderListTable} */}
            <SimpleTable
              tableData={queryData?.items!}
              tableDataConfig={wareHouseTableConfigs}
              contextMenuButtons={tableContextMenuButtons}
              onPressRow={onPressRowItem}
              getNewTableConfig={setNewTableConfig}
              onResetTable={onResetTable}
              isLoading={isLoading}
            />
          </View>
        </View>
        <View style={style.footContainer}>
          {renderFooter}
        </View>
      </View >
    </View>
  );
};
export default WareHouseView;