import React, {memo, useMemo, useRef, useState} from "react";
import {Text, View, Animated, Pressable, Easing} from "react-native";
import {CompletedIcon, DeclinedIcon, InProgressIcon, ShowIcon, TotalProjcetsIcon} from "../../../../assets/icons/clientCardIcons";
import {ProjectStatus} from "../../../../enums/projectStatus";
import {Colors} from "../../../../utils/colors";
import {getStyle} from "./styles";



interface IProjectInfo {
    projectsInProgress: number,
    projectsDeclined: number,
    projectsCompleted: number,
    totalProjects: number,
}


const ProjectInfo = ({projectsCompleted, projectsDeclined, projectsInProgress, totalProjects}: IProjectInfo) => {
    const style = useMemo(() => getStyle(), []);
    const animatedValue = useRef(new Animated.Value(0.3)).current;
    const ICON_SIZE = 16;
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


    const startAnimatedOpacity = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            duration: 300,
        }).start();
    };

    const endAnimatedOpacity = () => {
        Animated.timing(animatedValue, {
            toValue: 0.3,
            useNativeDriver: true,
            duration: 500,
        }).start();
    };

    return (
        <View style={{justifyContent: 'center', gap: 5}}>
            <View style={style.projectInfoTitleContainer}>
                <View style={style.projectInfoButtonContiner}>
                    <Text style={style.projectInfoButtonText}>
                        {'Projects'.toUpperCase()}
                    </Text>
                </View>
            </View>
            <Animated.View style={{opacity: animatedValue}}>
                <Pressable
                    onHoverIn={startAnimatedOpacity}
                    onHoverOut={endAnimatedOpacity}
                    style={style.projectInfoContentContainer}
                >
                    {
                        projectsInfo.map((info, index) => {
                            const {value, icon, color, title} = info;
                            return (
                                <View key={index} style={style.infoItemContainer}>
                                    <View key={index} style={[style.infoIconContiner, {borderColor: color}]}>
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
                </Pressable >
            </Animated.View >
        </View >
    );

};

export default memo(ProjectInfo)

