import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../components/inputItem/index.windows";
import { PrimaryButton } from "../../../../components/primaryButton";
import { Colors } from "../../../../utils/colors";
import ProjectDataProvider from "../../provider/data";
import ProjectLogicProvider from "../../provider/logic";
import { getStyle } from "./styles";



interface IProjectSearchCotnainer {
    logicProvider: ReturnType<typeof ProjectLogicProvider>;
    dataProvider: ReturnType<typeof ProjectDataProvider>;
}


const ProjectSearchContainer = ({ logicProvider, dataProvider }: IProjectSearchCotnainer) => {
    const { handleSearchInput, handleButtonCreateProject } = logicProvider;
    const { projectsQueryParams } = dataProvider;
    const style = useMemo(() => getStyle(), []);

    return (
        <>
            <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, padding: 5 }}>
                <View style={{ flex: 0.4 }}>
                    <InputItem inputValue={projectsQueryParams?.search ?? ''} setValue={(value) => handleSearchInput(value as string)} isSearch height={30} />
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10 }}>
                    <PrimaryButton onPress={handleButtonCreateProject} onHoverOpacity width={100} title={'CREATE PROJECT'} height={30} borderRadius={1} />
                </View>
            </View>
        </>
    );

};

export default memo(ProjectSearchContainer);