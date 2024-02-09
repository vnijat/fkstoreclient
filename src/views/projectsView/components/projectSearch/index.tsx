import React, {memo, useMemo, useState} from "react";
import {Text, View} from "react-native";
import {InputItem} from "../../../../components/inputItem/index.windows";
import {PrimaryButton} from "../../../../components/primaryButton";
import {Colors} from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import {getStyle} from "./styles";
import {ClientType} from "../../../../enums/clientType";
import FONT from "../../../../utils/font";
import CustomPicker from "../../../../containers/customPicker";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../../components/customPressable";



interface IProjectSearchCotnainer {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectSearchContainer = ({logicProvider, dataProvider}: IProjectSearchCotnainer) => {
    const {handleSearchInput, handleButtonCreateProject, handleFilterSelection} = logicProvider;
    const {projectsQueryParams, projectTypeData = [], queryData: {data}} = dataProvider;
    const style = useMemo(() => getStyle(), []);


    const projectFilters = [
        {
            title: 'Client Type',
            onSelect: ({label, value}: {label: string, value: string | number;}) => handleFilterSelection('clientType', value),
            selectableData: [...Object.values(ClientType), 'all'].map(item => ({label: item, value: item})),
            value: data?.clientType
        },
        {
            title: 'Project Type',
            onSelect: ({label, value}: {label: string, value: string | number;}) => handleFilterSelection('projectType', value),
            selectableData: [...projectTypeData, {label: 'all', value: 'all'}],
            value: data?.projectType
        }
    ];

    const onPressArchive = () => {
        handleFilterSelection('showDeleted', !projectsQueryParams?.showDeleted);
    };


    const renderArchiveButton = useMemo(() => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}} tooltip={'Show or Hide Archived Projects'.toUpperCase()}>
                <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_MEDIUM, fontWeight: FONT.FONT_BOLD, marginRight: 5}}>
                    {'ARCHIVE'}
                </Text>
                <CustomPressable
                    onHoverOpacity
                    onPress={onPressArchive}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                >
                    <Icon name={'archive'} size={25} color={projectsQueryParams?.showDeleted ? Colors.METALLIC_GOLD : Colors.DEFAULT_TEXT_COLOR} />
                </CustomPressable>
            </View>
        );
    }, [projectsQueryParams?.showDeleted]);



    const renderFilters = useMemo(() => {

        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, padding: 5}}>
                {projectFilters.map(({title, onSelect, selectableData, value, }) => (
                    <View style={{flexDirection: "row", alignItems: 'center', margin: 2}} key={title}>
                        <Text style={{fontSize: FONT.FONT_SIZE_SMALL, fontWeight: FONT.FONT_BOLD, color: Colors.DEFAULT_TEXT_COLOR, marginRight: 2}}>
                            {title.toUpperCase()}
                        </Text>
                        <CustomPicker
                            singleSelectMode
                            singleSelected={value}
                            singleOnSelect={onSelect}
                            buttonStyle={style.pickerButton}
                            itemStyle={{backgroundColor: Colors.CARD_COLOR, margin: 1, minHeight: 20, paddingLeft: 5, justifyContent: 'center'}}
                            arrowDownColor={Colors.DEFAULT_TEXT_COLOR}
                            singleSelectData={selectableData}
                        />
                    </View>
                ))}

            </View>
        );

    }, [projectFilters]);



    return (
        <>
            <View style={style.container}>
                <View style={{flex: 0.4}}>
                    <InputItem inputValue={projectsQueryParams?.search ?? ''} setValue={(value) => handleSearchInput(value as string)} isSearch height={30} />
                </View>
                <View style={{flex: 0.6, paddingLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <PrimaryButton onPress={handleButtonCreateProject} onHoverOpacity width={150} title={'CREATE PROJECT'} height={30} borderRadius={1} />
                    {renderFilters}
                    {renderArchiveButton}
                </View>
            </View>
        </>
    );

};

export default memo(ProjectSearchContainer);