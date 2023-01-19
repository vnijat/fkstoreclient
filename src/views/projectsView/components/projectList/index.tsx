import React, { memo, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Project } from "../../../../types/project";
import ProjecListItem from "../projecListItem";
import ProjectHeader from "../projectHeader";
import { getStyle } from "./styles";



interface IProjectslist {
    data: Project[];


}


const ProjectsList = ({ data }: IProjectslist) => {
    const style = useMemo(() => getStyle(), []);


    return (

        <View style={style.container}>
            <View style={style.listHeaderContainer}>
                <ProjectHeader />
            </View>
            <View>
            </View>
            <FlatList
                style={style.listContent}
                data={data}
                keyExtractor={(item, index) => `${item.id ? item.id : index}`}
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