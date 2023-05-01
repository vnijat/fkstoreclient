import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { ClientType } from '../../enums/clientType';
import { useGetClientsQuery } from '../../modules/api/clients.api';
import { setClientsQueryParams } from '../../modules/redux/clientsQuerySlicer';
import { RootState } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import ClientList from './components/clientList';
import AddEditClientModal from './containers/addEditClientModal';
import ClientListHeader from './containers/clientListHeader';
import ClientDataProvider from './provider/data';
import ClientLogicProvider from './provider/logic';
import { getStyle } from './styles';

interface IClientsViewProps {
}

export const ClientsView = ({ }: IClientsViewProps) => {
    const dataProvider = ClientDataProvider();
    const logicProvider = ClientLogicProvider();
    const {
        clientQueryParams,
        queryData: {
            data: queryData,
            isLoading,
        } } = dataProvider;
    const { handlePagination } = logicProvider;
    const style = useMemo(() => getStyle(), []);
console.log("ClientsView================>>>")
    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <AddEditClientModal />
                <View style={{ flex: 0.05 }} />
                <View style={style.container}>
                    <View style={{ backgroundColor: Colors.CARD_COLOR, flexShrink: 1 }}>
                        <ClientListHeader {...{ dataProvider, logicProvider }} />
                    </View>
                    <ClientList data={queryData?.clients} />
                    <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, flex: 0.1, justifyContent: 'center' }}>
                        <PaginationContainer paginationHandler={handlePagination} meta={queryData?.meta ?? {}} />
                    </View>

                </View>
            </View>
        </>
    );
};
