import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native-windows";
import { InputItem } from "../../../../components/inputItem/index.windows";
import { PrimaryButton } from "../../../../components/primaryButton";
import TableInput from "../../../../containers/tableInput";
import { ITableConfig } from "../../../../containers/tableInput/types";
import { setProjectsQueryParams } from "../../../../modules/redux/projectQuerySlicer";
import { setIsShowProjectAddEditModal } from "../../../../modules/redux/projectSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";



interface IProjectSearchCotnainer {
    searchValue: string;




}


const ProjectSearchContainer = ({ searchValue }: IProjectSearchCotnainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const setSearchValue = (text: string) => {
        dispatch(setProjectsQueryParams({ page: 1, search: text }));
    };

    const onPressAddProject = () => {
        dispatch(setIsShowProjectAddEditModal(true));
    };

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 20 }}>
                <View style={{ flex: 0.4 }}>
                    <InputItem inputValue={searchValue ?? ''} setValue={setSearchValue} isSearch />
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10 }}>
                    <PrimaryButton onPress={onPressAddProject} onHoverOpacity width={100} title={'ADD PROJECT'} height={30} borderRadius={1} />
                </View>
            </View>
        </>
    );

};

export default memo(ProjectSearchContainer);