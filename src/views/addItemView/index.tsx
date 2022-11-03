

import React, { FC, useMemo } from 'react';
import { View } from 'react-native-windows';
import AddItemСontainer from '../../containers/addItem';
import AddOptionsModal from '../../containers/addOptionsModal';
import { getStyle } from './styles';




export const AddItemView: FC<any> = ({ navigation }) => {
    const style = useMemo(() => getStyle(), []);

    return (
        <View style={style.container}>
            < AddOptionsModal />
            <AddItemСontainer />
        </View >
    );
};
