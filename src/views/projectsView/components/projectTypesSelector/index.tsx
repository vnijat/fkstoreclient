import {useEffect, useMemo, useRef} from "react";
import {getStyle} from "./styles";
import {Pressable, View, Text} from "react-native";
import FONT from "../../../../utils/font";
import {Colors} from "../../../../utils/colors";
import ProjectLogicProvider from "../../provider/logic";
import ProjectDataProvider from "../../provider/data";
import CheckBox from "@react-native-community/checkbox";
import {AddClientProject} from "../../../../types/project";



interface IProjecTypeSelector {
    setDataForRequest: (data: {[key: string]: string | number;}) => void;
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
    projectDataForPost: AddClientProject;
    disableForEdit: boolean;
}

const ProjectTypeSelector = ({setDataForRequest, logicProvider, dataProvider, projectDataForPost, disableForEdit}: IProjecTypeSelector) => {
    const style = useMemo(() => getStyle(), []);
    const {projectTypeData} = dataProvider;

    const onCheCkBoxValueChange = (data, isSelected) => {
        if (isSelected || disableForEdit) {
            return;
        }
        setDataForRequest(data);
    };

    const renderCheckBoxes = useMemo(() => {
        return projectTypeData.map((data, index) => {
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
            <View style={style.topContainer}>
                <Text style={style.topContainerText}>
                    {'PROJECT TYPE'}
                </Text>
            </View>
            <View style={style.checkBoxesContainer}>
                {renderCheckBoxes}
            </View>
        </View>
    );
};
export default ProjectTypeSelector;