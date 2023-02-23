import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import { ProjectStatus } from "../../../../../enums/projectStatus";
import { useEditProjectMutation } from "../../../../../modules/api/projects.api";
import { useAppDispatch } from "../../../../../modules/redux/store";
import HELP from "../../../../../services/helpers";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "./styles";

interface IProjectStatusColumn {
    status: ProjectStatus;
    projectId?: number;


}

const ProjectStatusColumn = ({ status: currentStatus, projectId }: IProjectStatusColumn) => {
    const style = useMemo(() => getStyle(), []);
    const animatedValue = useRef(new Animated.Value(-30)).current;
    const [apiEditProject] = useEditProjectMutation();
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        isOpen ? animationOnOpen() : animationOnClose();
    }, [isOpen]);


    const onPressIcon = () => {
        setIsOpen(!isOpen);
    };

    const animationOnOpen = () => {
        Animated.timing(animatedValue, {
            toValue: 30,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    };

    const animationOnClose = () => {
        Animated.timing(animatedValue, {
            toValue: -30,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    };

    const animatedStle = {
        opacity: animatedValue.interpolate({
            inputRange: [-30, 0, 30],
            outputRange: [0, 0, 1]
        }),
        transform: [
            { translateX: animatedValue }
        ]
    };

    const projectStatuses = [
        { title: 'COMPLETED', value: ProjectStatus.COMPLETED },
        { title: 'IN PROGRESS', value: ProjectStatus.INPROGRESS },
        { title: 'DECLINED', value: ProjectStatus.DECLINED }
    ];

    const onSelect = async (newStatus: ProjectStatus) => {
        console.log("onSelect=>", newStatus);
        const response = await apiEditProject({ id: projectId, body: { status: newStatus } });
        if (response?.error) {
            console.log("response.error====>>>", response?.error);
            return;
        }
        else { setIsOpen(false); }
    };

    return (
        <>
            <CustomPressable style={style.iconContainer}
                tooltip={currentStatus.toUpperCase()}
                onPress={onPressIcon}
                onHoverOpacity
            >
                <View style={style.iconButton} >
                    {HELP.getProjectStatusIcons(currentStatus, 20)}
                </View>
            </CustomPressable >
            <Animated.View style={[style.animatedIconSelector, { ...animatedStle }]}
            >
                {projectStatuses.map((status) => {
                    const isNotSelected = status.value !== currentStatus;
                    return (
                        <View key={`${status.value}`}
                        >
                            {isNotSelected ?
                                <CustomPressable style={style.iconContainer}
                                    onPress={() => onSelect(status.value)}
                                    onHoverOpacity
                                    tooltip={status.title}
                                >
                                    <View style={style.iconButton}>
                                        {HELP.getProjectStatusIcons(status.value, 20)}
                                    </View>
                                </CustomPressable>
                                : null}
                        </View>
                    );
                })}
            </Animated.View>
        </>
    );

};
export default memo(ProjectStatusColumn);