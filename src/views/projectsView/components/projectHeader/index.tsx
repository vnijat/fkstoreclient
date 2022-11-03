import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { Project } from "../../../../types/projectsQuery";
import { ProjectColumnsTitle } from "./config";
import { getStyle } from "./styles";


interface IProjectListHeader {
}



const ProjectListHeader = ({ }: IProjectListHeader) => {
    const style = useMemo(() => getStyle(), []);




    return (
        <View style={style.container}>
            {ProjectColumnsTitle.map(({ title, dtoKey, sortable }, i) => {
                return (
                    <View key={i} style={style.columnContainer}>
                        <Text key={`${title}-${i}`} style={style.columnText}>
                            {title.toUpperCase()}
                        </Text>
                    </View>
                );
            })
            }
        </View>
    );
};

export default memo(ProjectListHeader);