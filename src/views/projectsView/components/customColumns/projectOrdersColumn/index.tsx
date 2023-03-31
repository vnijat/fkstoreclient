import React, { useMemo } from "react";
import { Text } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import { Project } from "../../../../../types/project";
import { getStyle } from "./styles";




interface IProjectOrdersColumn {
    data: Project;
    handleOnPressOrdersCounts: (data: Project) => void;

}

const ProjectOrdersColumn = ({ data, handleOnPressOrdersCounts }: IProjectOrdersColumn) => {
    const style = useMemo(() => getStyle(), []);
    const onPressOrdersCount = () => {
        handleOnPressOrdersCounts(data);
    };

    return (<CustomPressable
        onPress={onPressOrdersCount}
        tooltip={'Click to View'}
        style={style.container}
    >
        <Text style={style.text}>
            {Number(data?.totalOrders)}
        </Text>
    </CustomPressable>);
};


export default ProjectOrdersColumn;