import CheckBox from '@react-native-community/checkbox';
import { useEffect, useMemo, useState } from 'react';
import { View, Text, Alert } from 'react-native';
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



interface ITableColumnsEditModal<T> {
    isSwohModal: boolean;
    onClose: () => void;
    tableDataConfigs: ITableDataConfig<T>[];
    getTableConfigsNewState?: (tableData: ITableDataConfig<T>[]) => void;
}


const TableColumnsEditModal = <T extends ITableRowData>({ onClose, isSwohModal, tableDataConfigs, getTableConfigsNewState }: ITableColumnsEditModal<T>) => {
    const [tableConfig, setTableConfig] = useState([...tableDataConfigs]);
    const style = useMemo(() => getStyle(), []);

    useEffect(() => {
        getTableConfigsNewState && getTableConfigsNewState(tableConfig);
    }, [tableConfig]);


    const onCloseModal = () => {
        onClose();
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



    const onPressUp = (currentIndex: number, newIndex: number) => {
        setTableConfig((prevState) => {
            const configs = [...prevState];
            const columnCurrent = { ...configs[currentIndex] };
            const columnNew = { ...configs[newIndex] };
            configs[newIndex] = columnCurrent;
            configs[currentIndex] = columnNew;
            return configs;
        });

    };

    const onPressDown = (currentIndex: number, newIndex: number) => {
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
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={{ height: 400, flexWrap: 'wrap' }}>
                    {tableConfig?.length && tableConfig.map((column, index) => {
                        const cantMoveUp = index === 0;
                        const cantMoveDown = index === (tableConfig?.length - 1);
                        return (
                            <TableColumnEditItem
                                cantMoveDown={cantMoveDown}
                                cantMoveUp={cantMoveUp}
                                chekBoxValue={!column?.hidden}
                                onCheckBoxValueChanged={(value) => handleChekBoxValueChange(!value, index)}
                                onMoveDown={() => onPressDown(index, index + 1)}
                                onMoveUp={() => onPressUp(index, index - 1)}
                                title={column.headerTitle}
                                key={`${index}`}
                            />
                        );
                    })}
                </View>

            </View>
        </CustomModal>
    );
};
export default TableColumnsEditModal;