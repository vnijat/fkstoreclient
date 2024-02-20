import React, {memo, useMemo} from "react";
import {FlatList, View} from "react-native";
import ClientCard from "../../../../containers/clientCard";
import {ClientType} from "../../../../enums/clientType";
import {Client} from "../../../../types/client";
import {Colors} from "../../../../utils/colors";
import {getStyle} from "./styles";

interface IClientList {
    data: Client[];

}



const ClientList = ({data}: IClientList) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={{backgroundColor: Colors.BACKGROUND_COLOR, flexGrow: 1, alignItems: 'center'}}>
            <FlatList
                data={data}
                keyExtractor={({id}) => `${id}`}
                style={{flex: 1}}
                numColumns={4}
                key={4}
                contentContainerStyle={{padding: 5, gap: 10, }}
                columnWrapperStyle={{flexWrap: 'wrap', gap: 10}}
                renderItem={({item, index}) => {
                    return (<ClientCard
                        key={`${index}-${item.id}`}
                        data={item}
                    />);
                }}
            />

        </View>
    );

};

export default memo(ClientList);