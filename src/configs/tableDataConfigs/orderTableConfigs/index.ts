import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {Item} from '../../../types/item';
import {ProjectOrder} from '../../../types/projectOrder';

const orderTableDataConfigs: ITableDataConfig<ProjectOrder>[] = [
  {
    headerTitle: 'Detail',
    dtoKey: 'detail',
    type: 'text',
  },
];

export default orderTableDataConfigs;
