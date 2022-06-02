import {queryFilterByParam} from '../../../types/ItemsQuery';
import {RootState} from '../store';

export const selectFilterbyForQuery = (
  state: RootState,
): queryFilterByParam => {
  const filterByParams = state.filterSlicer.filterByParams;
  const filterParamObj: queryFilterByParam = {};
  for (let key in filterByParams) {
    filterParamObj[key as keyof typeof filterParamObj] =
      filterByParams[key as keyof typeof filterByParams].toString();
  }
  return filterParamObj;
};

export const selectFilterByForPicker = (state: RootState) =>
  state.filterSlicer.filterByParams;

export const selectSelectedWithLabel = (state: RootState) =>
  state.filterSlicer.selectedWithLabel;
