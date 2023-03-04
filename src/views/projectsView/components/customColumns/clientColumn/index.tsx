import React, { useMemo } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import HELP from "../../../../../services/helpers";
import { Project } from "../../../../../types/project";
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
            >
                <View style={style.clientIconContainer} tooltip={client?.type}>
                    {HELP.getClientTypeIcons(client?.type, 18)}
                </View>
                <View tooltip={clientInfo} >
                    <Text style={style.columContentText} >
                        {clientInfo.toUpperCase()}
                    </Text>
                </View>
            </CustomPressable>
        </>
    );
};


export default ProjectClientColumn;