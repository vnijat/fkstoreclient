import CheckBox from '@react-native-community/checkbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Alert, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomModal from "../../components/customModal";
import CustomPressable from "../../components/customPressable";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { setIsHideTableColumn, setMoveColumn } from '../../modules/redux/tableConfigs';
import HELP from '../../services/helpers';
import { Colors } from '../../utils/colors';
import { ITableDataConfig, ITableRowData } from '../simpleTable/types';
import TableColumnEditItem from './components/tableColumnItem';
import { getStyle } from './style';
import { IListItemLayoutData } from './types';



interface ITableColumnsEditModal<T> {
    isSwohModal: boolean;
    onClose: () => void;
    tableDataConfigs: ITableDataConfig<T>[];
    getTableConfigsNewState?: (tableData: ITableDataConfig<T>[]) => void;
}


const TableColumnsEditModal = <T extends ITableRowData>({ onClose, isSwohModal, tableDataConfigs, getTableConfigsNewState }: ITableColumnsEditModal<T>) => {
    const [tableConfig, setTableConfig] = useState([...tableDataConfigs]);
    const style = useMemo(() => getStyle(), []);
    const [listItemsData, setListItemsData] = useState<IListItemLayoutData[]>([]);

    useEffect(() => {
        getTableConfigsNewState && getTableConfigsNewState(tableConfig);
    }, [tableConfig]);


    const onCloseModal = () => {
        onClose();
    };


    const getItemLayoutData = (index: number, data: any) => {
        setListItemsData((prev) => {
            const newData = [...prev];
            newData[index] = data;
            return newData;
        });
    };

    const handleChekBoxValueChange = (value: boolean, index: number) => {
        setTableConfig((prevState) => {
            const configs = [...prevState];
            const column = { ...configs[index] };
            column.hidden = value;
            configs[index] = column;
            return configs;
        });
    };

    const swipeItems = (currentIndex: number, newIndex: number) => {
        setTableConfig((prevState) => {
            const configs = [...prevState];
            const columnCurrent = { ...configs[currentIndex] };
            const columnNew = { ...configs[newIndex] };
            configs[newIndex] = columnCurrent;
            configs[currentIndex] = columnNew;
            return configs;
        });
    };


    return (
        <CustomModal
            isShowModal={isSwohModal}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={600}
        >
            <View style={{ flex: 1, padding:5 }}>
                <View style={{ height: 400, flexWrap: 'wrap' }}>
                    {tableConfig?.length && tableConfig.map((column, index) => {
                        return (
                            <TableColumnEditItem
                                chekBoxValue={!column?.hidden}
                                onCheckBoxValueChanged={(value) => handleChekBoxValueChange(!value, index)}
                                title={column.headerTitle}
                                index={index}
                                key={`${index}`}
                                setListItemsData={getItemLayoutData}
                                listItemsData={listItemsData}
                                swipeItems={swipeItems}
                            />
                        );
                    })}
                </View>

            </View>
        </CustomModal>
    );
};
export default TableColumnsEditModal;