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
import { getStyle } from "./styles";



interface IClinetListHeader {
    searchValue: string;
    clientTypeValue: ClientType & 'all';
    orderBy: { sort: ClientSort; order: Order; };
}

const ClientListHeader = ({ searchValue, clientTypeValue, orderBy }: IClinetListHeader) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const onPressAddClient = () => {
        dispatch(setIsShowClientModal(true));
    };


    const onSearch = (text: string) => {
        dispatch(setClientsQueryParams({ page: 1, search: text.trim() }));
    };

    const clientType = [
        ...Object.values(ClientType),
        'all'
    ].map(item => ({ value: item, label: item }));

    const clientSortData = Object.keys(ClientSort).map((item) => ({ value: ClientSort[item as keyof typeof ClientSort], label: item }));

    const onSelectType = (data: IsingelSelectData) => {
        dispatch(setClientsQueryParams({ page: 1, type: data?.value as ClientType & 'all' }));
    };


    const onSelectSortBy = (value: IsingelSelectData) => {
        dispatch(setClientsQueryParams({ page: 1, sort: value.value as ClientSort }));

    };

    const onPressOrderButton = () => {
        const order: Order = (orderBy?.order === Order.DESC) ? Order.ASC : Order.DESC;
        dispatch(setClientsQueryParams({ page: 1, order }));
    };


    const renderAscDescIcon = useMemo(() => {
        const Icons = {
            ASC: < Icon name={'arrow-up'} size={25} color={Colors.DEFAULT_TEXT_COLOR} />,
            DESC: < Icon name={'arrow-down'} size={25} color={Colors.DEFAULT_TEXT_COLOR} />
        };
        return (
            <CustomPressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={onPressOrderButton}>
                {Icons[orderBy?.order]}
            </CustomPressable >
        );
    }, [orderBy?.order]);


    const renderSortByes = useMemo(() => {
        const data =
            [
                { title: 'Client Type', onSelect: onSelectType, selected: clientTypeValue, selectedData: clientType, isOrder: false },
                { title: 'Sort By', onSelect: onSelectSortBy, selected: orderBy?.sort, selectedData: clientSortData, isOrder: true },
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

    }, [clientType, orderBy, clientTypeValue]);



    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.6, flexDirection: 'row' }}>
                    <View style={{ flex: 0.3, justifyContent: 'center', paddingLeft: 10 }}>
                        <InputItem isSearch setValue={onSearch} inputValue={searchValue} />
                    </View>
                    <View style={{ flex: 0.7, paddingLeft: 10, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {renderSortByes}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CustomPressable style={style.addButton}
                            onHoverOpacity
                            onPress={onPressAddClient}>
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