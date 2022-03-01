import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { FontIcon, NavigationView, NavigationViewItem } from 'react-native-xaml';
import { XamlSideBar } from '../../modules/navigation/xamlSideBar';
import { getStyle } from './style';


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
    