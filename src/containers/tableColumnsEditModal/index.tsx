import CheckBox from '@react-native-community/checkbox';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from "react-redux";
import CustomModal from "../../components/customModal";
import CustomPressable from "../../components/customPressable";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { setIsHideTableColumn, setMoveColumn } from '../../modules/redux/tableConfigs';
import { Colors } from '../../utils/colors';



interface ITableColumnsEditModal {
    isSwohModal: boolean;
    onClose: () => void;
}


const TableColumnsEditModal = ({ onClose, isSwohModal }: ITableColumnsEditModal) => {
    const tableConfig = useSelector((state: RootState) => state.tableConfigs.item);
    const dispatch = useAppDispatch();

    const onCloseModal = () => {
        onClose();
    };


    const onChangeValue = (value: boolean, index: number) => {
        dispatch(setIsHideTableColumn({ tableName: 'item', value, index }));
    };


    const onPressUp = (currentIndex: number, newIndex: number) => {
        dispatch(setMoveColumn({ tableName: 'item', currentIndex, newIndex }));

    };

    const onPressDown = (currentIndex: number, newIndex: number) => {
        dispatch(setMoveColumn({ tableName: 'item', currentIndex, newIndex }));
    };

    return (
        <CustomModal
            isShowModal={isSwohModal}
            closeModal={onCloseModal}
            isDissmissEnabled={false}
            width={600}
        >
            <View style={{ flex: 1, paddingHorizontal: 10, flexWrap: 'wrap' }}>
                {tableConfig?.length && tableConfig.map((column, index) => {
                    const isCanMoveUp = index !== 0;
                    const isCanMoveDown = index !== (tableConfig?.length - 1);
                    return (
                        <View
                            key={`${index}`}
                            style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: 200 }}
                        >
                            <View style={{ flex: 0.1, marginRight: 5 }}>
                                <CheckBox
                                    value={!column?.hidden}
                                    onValueChange={(value) => onChangeValue(!value, index)}
                                />
                            </View>
                            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                    {column?.headerTitle}
                                </Text>
                                <CustomPressable
                                    disabled={!isCanMoveUp}
                                    onPress={() => onPressUp(index, index - 1)}
                                >
                                    <Icon name={'chevron-small-up'} color={Colors.DEFAULT_TEXT_COLOR} size={18} />
                                </CustomPressable>
                                <CustomPressable
                                    disabled={!isCanMoveDown}
                                    onPress={() => onPressDown(index, index + 1)}
                                >
                                    <Icon name={'chevron-small-down'} color={Colors.DEFAULT_TEXT_COLOR} size={18} />
                                </CustomPressable>
                            </View>
                        </View>
                    );
                })}
            </View>
        </CustomModal>
    );
};
export default TableColumnsEditModal;