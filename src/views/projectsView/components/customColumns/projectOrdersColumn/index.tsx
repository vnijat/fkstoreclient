import React from "react";
import { Text } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import { Project } from "../../../../../types/project";
import { Colors } from "../../../../../utils/colors";




interface IProjectOrdersColumn {
    data: Project;
    handleOnPressOrdersCounts: (data: Project) => void;

}

const ProjectOrdersColumn = ({ data, handleOnPressOrdersCounts }: IProjectOrdersColumn) => {

    const onPressOrdersCount = () => {
        handleOnPressOrdersCounts(data);
    };

    return (<CustomPressable
        onPress={onPressOrdersCount}
        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.DEFAULT_TEXT_COLOR, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 }}
    >
        <Text style={{ fontSize: 10, textAlign: 'center', justifyContent: 'center' }}>
            {Number(data?.totalOrders)}
        </Text>
    </CustomPressable>);
};


export default ProjectOrdersColumn;