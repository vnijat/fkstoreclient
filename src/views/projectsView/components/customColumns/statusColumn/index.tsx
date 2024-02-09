import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {Animated, Easing, View} from "react-native";
import CustomPressable from "../../../../../components/customPressable";
import {ProjectStatus} from "../../../../../enums/projectStatus";
import {useEditProjectMutation} from "../../../../../modules/api/projects.api";
import {useAppDispatch} from "../../../../../modules/redux/store";
import HELP from "../../../../../services/helpers";
import {Project} from "../../../../../types/project";
import {Colors} from "../../../../../utils/colors";
import ProjectDataProvider from "../../../provider/data";
import ProjectLogicProvider from "../../../provider/logic";
import {getStyle} from "./styles";

interface IProjectStatusColumn {
    data: Project;
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}

const ProjectStatusColumn = ({data, logicProvider, dataProvider}: IProjectStatusColumn) => {
    const {status: currentStatus} = data;
    const {} = dataProvider;
    const {handleProjectStatusChange} = logicProvider;
    const style = useMemo(() => getStyle(), []);
    const animatedValue = useRef(new Animated.Value(-30)).current;
    const [isOpen, setIsOpen] = useState(false);

    const projectStatuses = [
        {title: 'COMPLETED', value: ProjectStatus.COMPLETED, borderColor: Colors.COMPLETED_COLOR},
        {title: 'IN PROGRESS', value: ProjectStatus.INPROGRESS, borderColor: Colors.INPROGRESS_COLOR},
        {title: 'DECLINED', value: ProjectStatus.DECLINED, borderColor: Colors.DECLINED_COLOR}
    ];

    const currentStatusBorderColor = useMemo(() => projectStatuses.find(status => status.value === currentStatus)?.borderColor, [currentStatus]);

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
            {translateX: animatedValue}
        ]
    };





    const onSelect = async (newStatus: ProjectStatus) => {
        await handleProjectStatusChange(data.id!, newStatus).then(() => setIsOpen(false));
    };

    return (
        <View style={style.container}>
            <CustomPressable style={[style.iconContainer, {borderColor: currentStatusBorderColor}]}
                tooltip={currentStatus.toUpperCase()}
                onPress={onPressIcon}
                onHoverOpacity
            >
                <View style={[style.iconButton]} >
                    {HELP.getProjectStatusIcons(currentStatus, 20, currentStatusBorderColor)}
                </View>
            </CustomPressable >
            <Animated.View style={[style.animatedIconSelector, {...animatedStle}]}
            >
                {projectStatuses.map((status) => {
                    const isNotSelected = status.value !== currentStatus;
                    return (
                        <View key={`${status.value}`}
                        >
                            {isNotSelected ?
                                <CustomPressable style={[style.iconContainer, {borderColor: status.borderColor}]}
                                    onPress={() => onSelect(status.value)}
                                    onHoverOpacity
                                    tooltip={status?.title}
                                >
                                    <View style={style.iconButton}>
                                        {HELP.getProjectStatusIcons(status.value, 20, status.borderColor)}
                                    </View>
                                </CustomPressable>
                                : null}
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );

};
export default ProjectStatusColumn;;