import React, { memo, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { CompletedIcon, DeclinedIcon, InProgressIcon, ShowIcon, TotalProjcetsIcon } from "../../../../assets/icons/clientCardIcons";
import CustomPressable from "../../../../components/customPressable";
import { ProjectStatus } from "../../../../enums/projectStatus";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";



interface IProjectInfo {
    projectsInProgress: number,
    projectsDeclined: number,
    projectsCompleted: number,
    totalProjects: number,
}


const ProjectInfo = ({ projectsCompleted, projectsDeclined, projectsInProgress, totalProjects }: IProjectInfo) => {
    const style = useMemo(() => getStyle(), []);

    const ICON_SIZE = 16;
    const [isShowProjects, setIsShowProjects] = useState(false);

    const projectsInfo = [
        {
            value: totalProjects,
            icon: <TotalProjcetsIcon size={ICON_SIZE} color={Colors.METALLIC_GOLD} />,
            color: Colors.CARD_HEADER_COLOR,
            title: 'total'.toUpperCase()
        },
        {
            value: projectsInProgress,
            icon: <InProgressIcon size={ICON_SIZE} color={Colors.METALLIC_GOLD} />,
            color: Colors.CARD_HEADER_COLOR,
            title: ProjectStatus.INPROGRESS.toUpperCase()
        },
        {
            value: projectsDeclined,
            icon: <DeclinedIcon size={ICON_SIZE} color={Colors.METALLIC_GOLD} />,
            color: Colors.CARD_HEADER_COLOR,
            title: ProjectStatus.DECLINED.toUpperCase()
        },
        {
            value: projectsCompleted,
            icon: <CompletedIcon size={ICON_SIZE} color={Colors.METALLIC_GOLD} />,
            color: Colors.CARD_HEADER_COLOR,
            title: ProjectStatus.COMPLETED.toUpperCase()
        },
    ];

    return (
        <>
            <View style={style.projectInfoTitleContainer}>
                <View style={style.projectInfoButtonContiner}>
                    <Text style={style.projectInfoButtonText}>
                        {'Projects'.toUpperCase()}
                    </Text>
                    <CustomPressable style={style.projectInfoIconButton}
                        onPress={() => setIsShowProjects((prevValue) => !prevValue)}
                    >
                        <ShowIcon size={14} color={Colors.OLD_GOLD} />
                    </CustomPressable>
                </View>
            </View>
            <View style={[style.projectInfoContentContainer, { opacity: isShowProjects ? 1 : 0 }]}>
                {
                    projectsInfo.map((info, index) => {
                        const { value, icon, color, title } = info;
                        return (
                            <View key={index} style={style.infoItemContainer}>
                                <View key={index} style={[style.infoIconContiner, { borderColor: color }]}>
                                    <View style={style.infoIcon}>
                                        {icon}
                                    </View>
                                </View>
                                <View style={style.infoContentContainer}>
                                    <Text style={style.infoTitleText}>
                                        {title}
                                    </Text>
                                    <Text style={style.infoValueText}>
                                        {value}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        </>
    );

};

export default memo(ProjectInfo)

