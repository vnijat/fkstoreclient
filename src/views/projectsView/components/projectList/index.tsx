import React, { memo, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Project } from "../../../../types/projectsQuery";
import { Colors } from "../../../../utils/colors";
import ProjecListItem from "../projecListItem";
import ProjectHeader from "../projectHeader";
import { getStyle } from "./styles";



interface IProjectslist {
    data: Project[];


}


const ProjectsList = ({ data }: IProjectslist) => {
    const style = useMemo(() => getStyle(), []);



    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                <ProjectHeader />
            </View>
            <View>
            </View>
            <FlatList
                style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <ProjecListItem
                            key={item.id}
                            project={item}
                        />
                    );
                }}
            />
        </View>


    );


};

export default memo(ProjectsList);