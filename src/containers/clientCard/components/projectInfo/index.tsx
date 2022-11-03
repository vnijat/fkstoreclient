import React, { memo, useState } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../components/customPressable";
import { ProjectStatus } from "../../../../enums/projectStatus";
import { Colors } from "../../../../utils/colors";
import { CompletedIcon, DeclinedIcon, InProgressIcon, ShowIcon, TotalProjcetsIcon } from "../../../assets/icons/clientCardIcons";



interface IProjectInfo {
    projectsInProgress: number,
    projectsDeclined: number,
    projectsCompleted: number,
    totalProjects: number,
}


const ProjectInfo = ({ projectsCompleted, projectsDeclined, projectsInProgress, totalProjects }: IProjectInfo) => {
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
        <View>
            <View style={{ alignSelf: 'center', top: -30, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderColor: Colors.CARD_HEADER_COLOR }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: 12, color: Colors.CARD_HEADER_COLOR, fontWeight: '700' }}>
                        {'Projects'.toUpperCase()}
                    </Text>
                    <CustomPressable style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}
                        onPress={() => setIsShowProjects((prevValue) => !prevValue)}
                    >
                        <ShowIcon size={14} color={Colors.OLD_GOLD} />
                    </CustomPressable>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 10, opacity: isShowProjects ? 1 : 0 }}>
                {
                    projectsInfo.map((info, index) => {
                        const { value, icon, color, title } = info;
                        return (
                            <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View key={index} style={{ width: 30, height: 30, borderRadius: 40, borderWidth: 2, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                                        {icon}
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', paddingTop: 1 }}>
                                    <Text style={{ fontSize: 10, color: Colors.CARD_HEADER_COLOR, fontWeight: '700' }}>
                                        {title}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: Colors.METALLIC_GOLD, fontWeight: '700', marginBottom: 5 }}>
                                        {value}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );

};

export default memo(ProjectInfo)

