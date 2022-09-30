

import React, { FC, useMemo } from 'react';
import { View } from 'react-native-windows';
import AddItemСontainer from '../../containers/addItem';
import { getStyle } from './style';




export const AddItemView: FC<any> = ({ navigation }) => {
    const style = useMemo(() => getStyle(), []);

    return (
        <View style={style.container}>
            <AddItemСontainer />
        </View >
    );
};
