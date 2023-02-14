import React, { FC, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from '../../../../../../components/customPressable';
import { getStyle } from './styles';



interface IFilterItem {
    label: string;
    onPress: () => void;


}


const FilterItem: FC<IFilterItem> = ({ label, onPress }) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.filterItemContainer}>
            <Text style={style.filterItemText}>
                {label}
            </Text>
            <CustomPressable style={style.filterItemActionButton}
                onPress={onPress}
                onHoverOpacity >
                <Icon name={'cross'} color={'white'} size={15} />
            </CustomPressable>
        </View>
    );
};

export default FilterItem;