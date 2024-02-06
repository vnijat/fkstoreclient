import {Text, View} from "react-native";
import {Project} from "../../types/project";
import {useMemo} from "react";
import {getStyle} from "./styles";
import ProjectClientColumn from "../../views/projectsView/components/customColumns/clientColumn";
import CustomPressable from "../customPressable";


interface IProjectCard {
    data: Project;
    hanldeOnPressClient?: (data: Project) => void;
    handleOnPressSelect?: (data: Project) => void;
}


const ProjectCard = ({data, hanldeOnPressClient, handleOnPressSelect}: IProjectCard) => {
    const style = useMemo(() => getStyle(), []);
    const {projectCode} = data;


    const onPressSelect = () => {
        handleOnPressSelect && handleOnPressSelect(data);
    };
    return (
        <View style={style.container}>
            <View style={style.topContainer}>
                <View style={style.projectCodeContainer}>
                    <Text style={style.projectCodeText}>
                        {projectCode}
                    </Text>
                </View>
                <View style={style.projectClientContainer}>
                    <ProjectClientColumn data={data} onPressClient={hanldeOnPressClient} />
                </View>
            </View>
            <View style={style.bottomContiner}>
                <CustomPressable
                    onHoverOpacity
                    onPress={onPressSelect}
                    style={style.selectProjectButton}>
                    <Text style={style.selectProjectButtonText}>
                        {'SELECT PROJECT'}
                    </Text>
                </CustomPressable>
            </View>
        </View>
    );
};
export default ProjectCard;