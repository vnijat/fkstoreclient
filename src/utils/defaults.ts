import { QueryStateSelector } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {AddItemInterface} from '../types/Item';

export const ItemForPostDefaults: AddItemInterface = {
  name: '',
  description: '',
};

// export const selectFromResultDefault = (queryParams:QueryStateSelector):=> {
//   return {
//     data,
//     error,
//     isLoading: isUninitialized ? true : isLoading,
//   };
// };
