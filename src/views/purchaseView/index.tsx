import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { getStyle } from './style';


interface IPurchaseView {
    navigation: StackNavigationProp<{}>;
}

export const PurchaseView: FC<IPurchaseView> = ({ navigation }) => {
    const style = getStyle();

    return (
        <View style={style.container}>
        </View>
    );
};
