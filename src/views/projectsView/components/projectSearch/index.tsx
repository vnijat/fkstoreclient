import { memo, useMemo } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../components/inputItem";
import { setProjectsQueryParams } from "../../../../modules/redux/projectQuerySlicer";
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


    return (

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 20 }}>
            <View style={{ flex: 0.4 }}>
                <InputItem inputValue={searchValue ?? ''} setValue={setSearchValue} isSearch />

            </View>
            <View style={{ flex: 0.6, }}>

            </View>
        </View>
    );

};

export default memo(ProjectSearchContainer);