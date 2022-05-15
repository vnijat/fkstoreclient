import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PressableIcon } from '../pressableIcon';


interface IPagePAgination {


}


export const PagePagination: FC<IPagePAgination> = () => {


    return (
        <View >
            <PressableIcon onPress={()=>console.log("hahahaha Pressed")} >
                <Icon name="angle-left" size={22} color={'black'} />
            </PressableIcon>
        </View>
    );


};