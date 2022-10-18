import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from '../../../../components/customPressable';
import { Colors } from '../../../../utils/colors';



interface IFilterItem {
    label: string;
    onPress: () => void;


}


const FilterItem: FC<IFilterItem> = ({ label, onPress }) => {

    return (
        <View style={{ height: 25, flexDirection: 'row', backgroundColor: Colors.CARD_HEADER_COLOR, borderRadius: 3, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, margin: 3 }}>

            <Text style={{ fontSize: 12, fontWeight: '500', color: Colors.DEFAULT_TEXT_COLOR }}>
                {label}
            </Text>
            <CustomPressable style={{ width: 15, height: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 3 }} onPress={onPress} onHoverOpacity >
                <Icon name={'cross'} color={'white'} size={15} />
            </CustomPressable>
        </View>
    );
};

export default FilterItem;