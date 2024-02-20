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
import CustomContextMenu from "../../../../components/customContextMenu";



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
        handleClearProjectTypeDataForPost,
        handleDeleteProjectType,
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
                style={style.resetButton}
            >
                <Icon name={'back'} size={25} color={Colors.CARD_COLOR} />
            </CustomPressable>
        );
    }, [isEditMode]);





    const ContextMenuContent = useCallback(({typeId}: {typeId: number;}) => {
        return (
            <View style={style.contextMenuContainer}>
                <CustomPressable style={style.contextMenuItem} onHoverOpacity
                    onPress={() => handleDeleteProjectType(typeId)}
                >
                    <Text style={style.contextMenuItemText}>
                        {'Delete'.toUpperCase()}
                    </Text>
                </CustomPressable>
            </View>
        );
    }, []);


    const renderProjectTypeCard = useCallback(({label, value, prefix}, index) => {
        return (
            <CustomPressable
                onPress={() => handleOnPressTypeCard({label, value, prefix})}
                onHoverOpacity
                tooltip={'Press to Edit Project Type'.toUpperCase()}
                key={index}
                style={style.typeCardContainer}>
                <CustomContextMenu>
                    <ContextMenuContent typeId={value} />
                </CustomContextMenu>
                <Text style={style.typeCardText}>
                    {label?.toUpperCase()}
                </Text>
            </CustomPressable>
        );
    }, [projectTypeData]);

    const onKeyPress = useCallback((e) => {
        if (e.nativeEvent.key === 'Enter') {
            handleOnpressInputButton();
        }
    }, [projectTypeDataForPost]);

    const renderProejctTypeInputs = useMemo(() => {
        return projectTypeInputConfig.map(({title, dtoKey, width, height, placeHolder, isDisableForEdit}, index) => {
            const objectKey = dtoKey as keyof IProjectType;
            return (
                <InputItem
                    onKeyPress={onKeyPress}
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
            <View style={style.container}>
                <View style={style.typeContentContainer}>
                    {projectTypeData?.map(renderProjectTypeCard)}
                </View>
                <View style={{height: 5, backgroundColor: Colors.METALLIC_GOLD}} />
                <View style={style.bottomContainer}>
                    {renderResetButton}
                    <View style={style.inputContainer}>
                        <View style={style.inputItemsContainer}>
                            {renderProejctTypeInputs}
                        </View>
                        <View style={style.inputButtonContainer}>
                            <PrimaryButton
                                title={buttonTitle}
                                onHoverOpacity
                                buttonColor={Colors.CARD_COLOR}
                                textColor={Colors.DEFAULT_TEXT_COLOR}
                                onPress={handleOnpressInputButton}
                                borderRadius={3}
                                height={35}
                                width={100} />
                        </View>
                    </View>
                </View>
            </View>
        </CustomModal>
    );
};
export default ProjectTypesModal;