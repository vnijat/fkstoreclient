import {QueryFilterByParam} from '../../../types/item';
import {RootState} from '../store';

export const selectFilterbyForQuery = (
  state: RootState,
): QueryFilterByParam => {
  const filterByParams = state.warehouseFiltersSlicer.filterByParams;
  const filterParamObj: QueryFilterByParam = {};
  for (let key in filterByParams) {
    filterParamObj[key as keyof typeof filterParamObj] =
      filterByParams[key as keyof typeof filterByParams].toString();
  }
  return filterParamObj;
};

export const selectFilterByForPicker = (state: RootState) =>
  state.warehouseFiltersSlicer.filterByParams;

export const selectSelectedWithLabel = (state: RootState) =>
  state.warehouseFiltersSlicer.selectedWithLabel;
