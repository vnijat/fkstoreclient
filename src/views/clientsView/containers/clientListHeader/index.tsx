import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Text } from "react-native-windows";
import CustomPressable from "../../../../components/customPressable";
import { InputItem } from "../../../../components/inputItem/index.windows";
import AddClientModal from "../../../../containers/addClient";
import CustomPicker, { IsingelSelectData } from "../../../../containers/customPicker";
import { ClientSort } from "../../../../enums/clientSort";
import { ClientType } from "../../../../enums/clientType";
import { Order } from "../../../../enums/order.enum";
import { setClientsQueryParams } from "../../../../modules/redux/clientsQuerySlicer";
import { setIsShowClientModal } from "../../../../modules/redux/clientsSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { Colors } from "../../../../utils/colors";
import ClientDataProvider from "../../provider/data";
import ClientLogicProvider from "../../provider/logic";
import { getStyle } from "./styles";



interface IClinetListHeader {
    logicProvider: ReturnType<typeof ClientLogicProvider>;
    dataProvider: ReturnType<typeof ClientDataProvider>;
}

const ClientListHeader = ({ logicProvider, dataProvider }: IClinetListHeader) => {
    const style = useMemo(() => getStyle(), []);
    const {
        handleOnPressAddClient,
        handleSearchInput,
        handleClientSortBy,
        handleClientTypeSort,
        handleClientSortByOrder


    } = logicProvider;
    const { clientTypes, clientSortData, queryData: { data: queryData }, clientQueryParams } = dataProvider;


    const onPressOrderButton = () => {
        const order: Order = (queryData?.orderBy?.order === Order.DESC) ? Order.ASC : Order.DESC;
        handleClientSortByOrder(order);
    };


    const renderAscDescIcon = useMemo(() => {
        const Icons = {
            ASC: < Icon name={'arrow-up'} size={25} color={Colors.DEFAULT_TEXT_COLOR} />,
            DESC: < Icon name={'arrow-down'} size={25} color={Colors.DEFAULT_TEXT_COLOR} />
        };
        return (
            <CustomPressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={onPressOrderButton}>
                {Icons[queryData?.orderBy?.order!]}
            </CustomPressable >
        );
    }, [queryData?.orderBy.order]);


    const renderSortByes = useMemo(() => {
        const data =
            [
                { title: 'Client Type', onSelect: handleClientTypeSort, selected: queryData?.type, selectedData: clientTypes, isOrder: false },
                { title: 'Sort By', onSelect: handleClientSortBy, selected: queryData?.orderBy?.sort, selectedData: clientSortData, isOrder: true },
            ];
        return data.map(({ title, onSelect, selected, selectedData, isOrder }, index) => {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} key={index}>
                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                        {title.toLowerCase()}
                    </Text>
                    <CustomPicker
                        singleSelectMode
                        singleOnSelect={onSelect}
                        singleSelectData={selectedData}
                        singleSelected={selected}
                        buttonStyle={style.pickerButton}
                        itemStyle={{ backgroundColor: Colors.CARD_COLOR, margin: 1, minHeight: 20, paddingLeft: 5, justifyContent: 'center' }}
                        arrowDownColor={Colors.DEFAULT_TEXT_COLOR}
                    />
                    {isOrder && renderAscDescIcon}
                </View>
            );
        });

    }, [queryData?.orderBy, queryData?.type]);



    return (
        <>
            <View style={{ flexGrow: 1, padding: 5 }}>
                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.3, justifyContent: 'center', paddingLeft: 10 }}>
                        <InputItem isSearch setValue={handleSearchInput} inputValue={clientQueryParams?.search!} height={30} />
                    </View>
                    <View style={{ flex: 0.7, paddingLeft: 10, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {renderSortByes}
                        </View>
                    </View>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CustomPressable style={style.addButton}
                            onHoverOpacity
                            onPress={handleOnPressAddClient}>
                            <View style={{ paddingRight: 5 }}>
                                <Icon size={12} name={'add-user'} color={Colors.CARD_COLOR} />
                            </View>
                            <Text style={{ color: Colors.CARD_COLOR }}>
                                {'Add Client'}
                            </Text>
                        </CustomPressable>
                    </View>
                </View>
            </View>
        </>
    );
};

export default memo(ClientListHeader);