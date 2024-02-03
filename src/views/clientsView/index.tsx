import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import PaginationContainer from '../../containers/paginationContainer';
import ClientDataProvider from './provider/data';
import ClientLogicProvider from './provider/logic';
import { getStyle } from './styles';
import AddEditClientModal from './containers/addEditClientModal';
import ClientListHeader from './containers/clientListHeader';
import ClientList from './components/clientList';
import {Colors} from '../../utils/colors';

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
