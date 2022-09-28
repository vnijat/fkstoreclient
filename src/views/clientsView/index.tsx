import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import ClientCard from '../../containers/clientCard';
import { ClientType } from '../../enums/clientType';
import { ClientDataMock } from '../../mocks/clientsData';
import { Colors } from '../../utils/colors';
import { getStyle } from './style';


interface IClientsViewProps {
    navigation: StackNavigationProp<{}>;
}

export const ClientsView = ({ navigation }: IClientsViewProps) => {
    const style = getStyle();
    return (
        <View style={style.container}>
            <View style={{ backgroundColor: 'red', flex: 0.2 }}>

            </View>
            <View style={{ backgroundColor: Colors.CULTURED, flex: 1, alignItems: 'center' }}>
                <FlatList
                    data={ClientDataMock}
                    keyExtractor={({ id }) => `${id}`}
                    style={{ flex: 1 }}
                    numColumns={4}
                    key={4}
                    contentContainerStyle={{ padding: 5 }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    renderItem={({ item, index }) => {
                        const {
                            firstName,
                            lastName,
                            companyName,
                            projectsCompleted,
                            projectsDeclined,
                            projectsInProgress,
                            totalProjects,
                            phone,
                            email,
                        } = item;
                        const type = item.type as ClientType;
                        return (<ClientCard
                            {...{
                                firstName,
                                lastName,
                                companyName,
                                projectsCompleted,
                                projectsDeclined,
                                projectsInProgress,
                                totalProjects,
                                type,
                                phone,
                                email,
                            }} />);
                    }}
                />

            </View>

            <View style={{ backgroundColor: 'yellow', flex: 0.1 }}>

            </View>

        </View>
    );
};
