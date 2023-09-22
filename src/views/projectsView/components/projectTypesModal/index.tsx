import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getStyle} from "./styles";
import {Pressable, View, Text} from "react-native";
import FONT from "../../../../utils/font";
import {Colors} from "../../../../utils/colors";
import ProjectLogicProvider from "../../provider/logic";
import ProjectDataProvider from "../../provider/data";
import CustomModal from "../../../../components/customModal";
import {projectTypeInputConfig} from "../../../../configs/projectTypeInputConfigs";
import {IProjectType} from "../../../../types/project";
import {PrimaryButton} from "../../../../components/primaryButton";
import {InputItem} from "../../../../components/inputItem/index.windows";
import CustomPressable from "../../../../components/customPressable";
import Icon from "react-native-vector-icons/Entypo";



interface IProjectTypesModal {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}

const ProjectTypesModal = ({logicProvider, dataProvider}: IProjectTypesModal) => {
    const style = useMemo(() => getStyle(), []);
    const [isEditMode, setIsEditMode] = useState(false);
    const buttonTitle = useMemo(() => `${isEditMode ? 'Save' : 'Add'}`.toUpperCase(), [isEditMode]);
    const {isShowProjectTyepsModal, projectTypeDataForPost, projectTypeData} = dataProvider;
    const {
        handleOnCloseProjectTypesModal,
        handleProjectTypesInput,
        handleAddProjectType,
        handleEditProjectType,
        handleClearProjectTypeDataForPost
    } = logicProvider;


    const handleOnPressTypeCard = useCallback(({label, value, prefix}) => {
        setIsEditMode(true);
        handleProjectTypesInput({title: label, prefix, id: value});
    }, [projectTypeData]);

    const handleOnpressReset = useCallback(() => {
        setIsEditMode(false);
        handleClearProjectTypeDataForPost();
    }, []);


    const onCloseModal = useCallback(() => {
        setIsEditMode(false);
        handleOnCloseProjectTypesModal();
    }, []);


    const handleOnpressInputButton = useCallback(async () => {
        if (isEditMode) {
            await handleEditProjectType(projectTypeDataForPost);
            setIsEditMode(false);
        } else {
            await handleAddProjectType(projectTypeDataForPost);
        }
        handleClearProjectTypeDataForPost();
    }, [projectTypeDataForPost, isEditMode]);




    const renderResetButton = useMemo(() => {
        if (!isEditMode) return null;
        return (
            <CustomPressable
                tooltip={'Reset'.toUpperCase()}
                onHoverOpacity
                onPress={handleOnpressReset}
                style={{position: 'absolute', right: 10, top: 10}}
            >
                <Icon name={'back'} size={25} color={Colors.METALLIC_GOLD} />
            </CustomPressable>
        );
    }, [isEditMode]);


    const renderProjectTypeCard = useCallback(({label, value, prefix}, index) => {
        return (
            <CustomPressable
                onPress={() => handleOnPressTypeCard({label, value, prefix})}
                onHoverOpacity
                tooltip={'Press to Edit Project Type'.toUpperCase()}
                key={index}
                style={{minWidth: 80, height: 30, backgroundColor: Colors.CARD_HEADER_COLOR, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5}}>
                <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_MEDIUM}}>
                    {label?.toUpperCase()}
                </Text>
            </CustomPressable>
        );
    }, [projectTypeData]);

    const renderProejctTypeInputs = useMemo(() => {
        return projectTypeInputConfig.map(({title, dtoKey, width, height, placeHolder, isDisableForEdit}, index) => {
            const objectKey = dtoKey as keyof IProjectType;
            return (
                <InputItem
                    key={index}
                    height={height}
                    width={width}
                    inputTitle={title}
                    disabledForEdit={(isEditMode && isDisableForEdit)}
                    titleColor={Colors.CARD_COLOR}
                    inputValue={projectTypeDataForPost?.[dtoKey!]}
                    setValue={(value) => handleProjectTypesInput({[objectKey]: value} as {[K in keyof IProjectType]: IProjectType[K]})}
                />
            );
        });
    }, [projectTypeData, projectTypeDataForPost, isEditMode]);


    return (
        <CustomModal
            closeModal={onCloseModal}
            isShowModal={isShowProjectTyepsModal}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
            width={600}
        >
            <View style={{flex: 1, height: 400, backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 5}}>

                <View style={{flex: 0.7, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {projectTypeData?.map(renderProjectTypeCard)}
                </View>
                <View style={{height: 5, backgroundColor: Colors.METALLIC_GOLD}} />
                <View style={{flex: 0.3, backgroundColor: Colors.DEFAULT_TEXT_COLOR, marginBottom: 5, justifyContent: 'center'}}>
                    {renderResetButton}
                    <View style={{flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {renderProejctTypeInputs}
                        </View>
                        <View style={{margin: 5, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <PrimaryButton title={buttonTitle} onHoverOpacity buttonColor={Colors.CARD_COLOR} textColor={Colors.DEFAULT_TEXT_COLOR} onPress={handleOnpressInputButton} borderRadius={3} height={35} width={100} />
                        </View>
                    </View>
                </View>
            </View>
        </CustomModal>
    );
};
export default ProjectTypesModal;