import React, { memo, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ProjectOrder } from "../../../../types/projectOrder";
import { Project } from "../../../../types/projectsQuery";
import { Colors } from "../../../../utils/colors";
import OrderHeader from "../orderHeader";
import OrderListItem from "../orderListItem";
import { getStyle } from "./styles";




interface IOrderList {
    data: ProjectOrder[];


}


const ProjectsList = ({ data }: IOrderList) => {
    const style = useMemo(() => getStyle(), []);


    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                <OrderHeader />
            </View>
            <View>
            </View>
            <FlatList
                style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <OrderListItem
                            key={item.id}
                            data={item}
                        />
                    );
                }}
            />
        </View>


    );


};

export default memo(ProjectsList);