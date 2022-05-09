import {RootState} from '../store';

export const selectIsEditMode = (state: RootState): boolean =>
  state.itemsSlicer.isEditMode;
