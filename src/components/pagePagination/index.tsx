import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface IPagePAgination {


}


export const PagePagination: FC<IPagePAgination> = () => {


    return (
        <View >
                <Icon name="angle-left" size={22} color={'black'} />
        </View>
    );


};