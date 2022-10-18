import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { getStyle } from './styles';


interface IProjectsView {
    navigation: StackNavigationProp<{}>;
}

const ProjectsView = ({ navigation }: IProjectsView) => {
    const style = getStyle();

    return (
        <View style={style.container}>
        </View>
    );
};
export default ProjectsView;