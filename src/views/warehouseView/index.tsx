import React, { FC, useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-windows';
import { shallowEqual, useSelector } from 'react-redux';
import CustomModal from '../../components/customModal';
import CustomPressable from '../../components/customPressable';
import PaginationContainer from '../../containers/paginationContainer';
import SimpleTable from '../../containers/simpleTable';
import { IContextMenuButton, ITableDataConfig, ITableRowData } from '../../containers/simpleTable/types';
import TableColumnsEditModal from '../../containers/tableColumnsEditModal';
import { useGetAllItemsQuery, } from '../../modules/api/apiSlice';
import { setItemQueryParams } from '../../modules/redux/itemQuerySlicer';
import { clearSelectedItems, setIsEditMode, setIsItemForEdit, setIsShowAddEditModal, setIsShowItemModal, setItemForPost, setItemIdForFullResponse } from '../../modules/redux/itemsSlicer';
import { selectFilterbyForQuery } from '../../modules/redux/selectors/filterSelector';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { resetTable } from '../../modules/redux/tableConfigs';
import HELP from '../../services/helpers';
import { Item } from '../../types/item';
import { Colors } from '../../utils/colors';
import AddEditItemModal from './components/addEditItemModal';
import ItemListTable from './components/itemList';
import ItemModal from './components/itemModal';
import SearchContainer from './components/search';
import { getStyle } from './styles';

const WareHouseView: FC<any> = ({ navigation }) => {
  const style = getStyle();
  const selectQueryParams = useSelector((state: RootState) => state.itemQuerySlicer, shallowEqual);
  const dispatch = useAppDispatch();
  const [isAlerted, setIsAlerted] = useState<boolean>(false);
  const queryFilterParams = useSelector(selectFilterbyForQuery, shallowEqual);
  const itemTableConfigData = useSelector((state: RootState) => state.tableConfigs.item);
  const [isShowColumnEditModal, setShowColumnEditModal] = useState(false);
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


  const onPressConfig = () => {
    setShowColumnEditModal(true);
  };


  const ActionColumn = ({ data }: { data: Item; }) => {
    return <View style={{}}>
      <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
        {`${data.name}-${data.color.name}`}
      </Text>
    </View>;
  };



  const customTableColumns = {
    action: ActionColumn

  };

  const onPressTableRow = (data: Item) => {
    dispatch(setIsShowItemModal(true));
    dispatch(setItemIdForFullResponse(data?.id!));
  };

  const onPressEdit = (data: Item) => {
    const itemForPost = HELP.modifyItemForEdit(data, data.id);
    dispatch(setIsItemForEdit(true));
    dispatch(setItemForPost(itemForPost));
    dispatch(setIsShowAddEditModal(true));
    dispatch(clearSelectedItems());
    dispatch(setIsEditMode(false));
  };

  const tableContextMenuButtons: IContextMenuButton<Item>[] = useMemo(() => [
    { title: 'Edit', onPress: onPressEdit }
  ], []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.05 }} />
      <View style={style.container}>
        <AddEditItemModal />
        <ItemModal />
        <View style={style.listContainer}>
          <View style={style.searchContainer}>
            {renderSearchContainer}
          </View>
          <View style={style.listTable}>
            {/* {renderListTable} */}
            <TableColumnsEditModal isSwohModal={isShowColumnEditModal} onClose={() => setShowColumnEditModal(false)} />
            <SimpleTable
              tableData={queryData?.items!}
              tableDataConfig={itemTableConfigData}
              contextMenuButtons={tableContextMenuButtons}
              onPressRow={onPressTableRow}
              customColumns={customTableColumns}
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