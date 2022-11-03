import React, { memo, useMemo } from "react";
import { FlatList, View } from "react-native";
import ClientCard from "../../../../containers/clientCard";
import { ClientType } from "../../../../enums/clientType";
import { Client } from "../../../../types/clientsQuery";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";

interface IClientList {
    data: Client[];

}



const ClientList = ({ data }: IClientList) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={{ backgroundColor: Colors.BACKGROUND_COLOR, flex: 1, alignItems: 'center' }}>
            <FlatList
                data={data}
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
                        id
                    } = item;
                    const type = item.type as ClientType;
                    return (<ClientCard
                        key={`${firstName}-${item.id}`}
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
                            id
                        }} />);
                }}
            />

        </View>
    );

};

export default memo(ClientList);