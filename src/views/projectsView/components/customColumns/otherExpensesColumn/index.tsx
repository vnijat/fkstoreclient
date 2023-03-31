import React, { useMemo } from "react";
import { Text } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import { Project } from "../../../../../types/project";
import { getStyle } from "./styles";




interface IProjectOtherExpensesColumn {
    data: Project;
    handleOnPressCount: (data: Project) => void;

}

const ProjectOtherExpensesColumn = ({ data, handleOnPressCount }: IProjectOtherExpensesColumn) => {
    const style = useMemo(() => getStyle(), []);
    const onPressOrdersCount = () => {
        handleOnPressCount(data);
    };

    return (<CustomPressable
        onPress={onPressOrdersCount}
        tooltip={'Click to View'}
        style={style.container}
    >
        <Text style={style.text}>
            {Number(data?.totalExpenses)}
        </Text>
    </CustomPressable>);
};


export default ProjectOtherExpensesColumn;