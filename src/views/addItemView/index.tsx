import React, { FC, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Alert } from 'react-native';
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
