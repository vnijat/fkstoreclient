import React, { useMemo } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import HELP from "../../../../../services/helpers";
import { Project } from "../../../../../types/project";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "./styles";



interface IProjectClientColumn {
    data: Project;
    onPressClient?: (data: Project) => void;
}


const ProjectClientColumn = ({ data, onPressClient }: IProjectClientColumn) => {
    const { client } = data;
    const style = useMemo(() => getStyle(), []);
    const clientInfo = client === null ? 'Unknown' : client?.companyName || `${client?.firstName} ${client?.lastName}`;

    const onPressIcon = () => {
        onPressClient && onPressClient(data);
    };

    return (
        <>
            <CustomPressable
                style={style.container}
                onPress={onPressIcon}
                tooltip={'Click to View'}
            >
                <View style={style.clientIconContainer}>
                    {HELP.getClientTypeIcons(client?.type, 18, Colors.DEFAULT_TEXT_COLOR)}
                </View>
                <View >
                    <Text style={style.columContentText} >
                        {clientInfo.toUpperCase()}
                    </Text>
                </View>
            </CustomPressable>
        </>
    );
};


export default ProjectClientColumn;