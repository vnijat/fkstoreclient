import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { ClientType } from '../../enums/clientType';
import { ClientDataMock } from '../../mocks/clientsData';
import { useGetClientsQuery } from '../../modules/api/clients.api';
import { setClientsQueryParams } from '../../modules/redux/clientsQuerySlicer';
import { RootState } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import ClientList from './components/clientList';
import ClientListHeader from './containers/clientListHeader';
import { getStyle } from './styles';


interface IClientsViewProps {
    navigation: StackNavigationProp<{}>;
}

export const ClientsView = ({ navigation }: IClientsViewProps) => {
    const style = getStyle();
    const selectClientsQueryParams = useSelector((state: RootState) => state.clientQuery);
    const { data: queryData } = useGetClientsQuery(selectClientsQueryParams, {
        selectFromResult: ({ data }) => ({
            data,
        }
        ),
        pollingInterval: 5000
    });
    return (
        <View style={style.container}>
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, flex: 0.2 }}>
                <ClientListHeader
                    searchValue={selectClientsQueryParams?.search ?? ''}
                    clientTypeValue={queryData?.type as ClientType & 'all'}
                    orderBy={queryData?.orderBy!}
                />
            </View>
            <ClientList data={queryData?.clients} />
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, flex: 0.1, justifyContent: 'center' }}>
                <PaginationContainer actionFunction={setClientsQueryParams} meta={queryData?.meta ?? {}} />
            </View>

        </View>
    );
};
