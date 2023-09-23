import {memo, useEffect, useMemo, useRef} from "react";
import {getStyle} from "./styles";
import {Pressable, View, Text} from "react-native";
import FONT from "../../../../utils/font";
import {Colors} from "../../../../utils/colors";
import ProjectLogicProvider from "../../provider/logic";
import ProjectDataProvider from "../../provider/data";
import CheckBox from "@react-native-community/checkbox";
import {AddClientProject} from "../../../../types/project";
import CustomPressable from "../../../../components/customPressable";
import Icon from "react-native-vector-icons/Entypo";
import ProjectTypesModal from "../projectTypesModal";



interface IProjecTypeSelector {
    setDataForRequest: (data: {[key: string]: string | number;}) => void;

    projectDataForPost: AddClientProject;
    disableForEdit: boolean;
}

const ProjectTypeSelector = ({setDataForRequest, projectDataForPost, disableForEdit}: IProjecTypeSelector) => {
    const style = useMemo(() => getStyle(), []);
    const logicProvider = ProjectLogicProvider();
    const dataProvider = ProjectDataProvider();
    const {handleOnOpenProjectTypesModal} = logicProvider;
    const {projectTypeData, isShowProjectTyepsModal} = dataProvider;


    const onCheCkBoxValueChange = (data, isSelected) => {
        if (isSelected || disableForEdit) {
            return;
        }
        setDataForRequest(data);
    };


    const renderCheckBoxes = useMemo(() => {
        if (!projectTypeData?.length) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_MEDIUM}}>
                        {'Please Add Project Type First'.toUpperCase()}
                    </Text>

                </View>
            );
        }
        return projectTypeData?.map((data, index) => {
            const isSelected = data.value === projectDataForPost?.typeId;
            return (
                <View style={[style.checkBoxContainer, (!isSelected && disableForEdit) && {opacity: 0.4}]} key={index}>
                    <Text style={[style.checkBoxText, isSelected && {fontWeight: FONT.FONT_BOLD}]}>
                        {data.label.toUpperCase()}
                    </Text>
                    <CheckBox
                        value={isSelected}
                        onFillColor={Colors.METALLIC_GOLD}
                        onTintColor={Colors.METALLIC_GOLD}
                        tintColor={Colors.CARD_HEADER_COLOR}
                        onCheckColor={Colors.CARD_COLOR}
                    />
                    <Pressable
                        onPress={() => onCheCkBoxValueChange({typeId: data.value}, isSelected)}
                        style={style.chekBoxPressHandler}

                    />
                </View>
            );
        });
    }, [projectTypeData, projectDataForPost, disableForEdit]);

    return (
        <View style={style.container}>
            <ProjectTypesModal  {...{logicProvider, dataProvider}} />
            <View style={style.topContainer}>
                <Text style={style.topContainerText}>
                    {'PROJECT TYPE'}
                </Text>
                <CustomPressable
                    style={{justifyContent: 'center', marginLeft: 5}}
                    onPress={handleOnOpenProjectTypesModal}
                    onHoverOpacity
                >
                    <Icon name='cog' size={14} color={Colors.DEFAULT_TEXT_COLOR} />
                </CustomPressable>
            </View>
            <View style={style.checkBoxesContainer}>
                {renderCheckBoxes}
            </View>
        </View >
    );
};
export default memo(ProjectTypeSelector);