import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import {View } from 'react-native';
import { getStyle } from './styles';


interface IorderView {
    navigation: StackNavigationProp<{}>
}

export const OrderView: FC<IorderView> = ({ navigation }) => {
    const style = getStyle();

    return (
        <View style={style.container}>
        </View>
    );
};
    