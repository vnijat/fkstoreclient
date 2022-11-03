import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../components/customPressable";
import { Project } from "../../../../types/projectsQuery";
import { currency } from "../../../../utils/currency";
import { getStyle } from "./styles";


interface IProjectslistItem {
    project: Project;
}



const ProjectListItem = ({ project }: IProjectslistItem) => {
    const style = useMemo(() => getStyle(), []);

    const rowData = useMemo(() => [
        project.client.firstName.toUpperCase(),
        project.title.toUpperCase(),
        project.description?.toUpperCase(),
        currency.format(project.price),
        currency.format(project.paid),
        project.deadline,
        project.status
    ], [project]);


    const RenderColumnContent = ({ content, id }: { content: string | number; id: string; }) => {
        return (
            <>
                <CustomPressable key={id} style={[style.columContent]} >
                    <Text key={`${content}-${id}`} style={style.columContentText}>
                        {content}
                    </Text>
                </CustomPressable>
            </>
        );
    };



    const renderRow = useMemo(() => {
        return rowData.map((content, i) => {
            return <RenderColumnContent content={content!} id={`${project.id}-${i}`} key={i} />;
        });

    }, [rowData]);



    return (
        <CustomPressable style={style.rowItem}
            onHoverOpacity
        >
            {renderRow}
        </CustomPressable>
    );
};

export default memo(ProjectListItem);