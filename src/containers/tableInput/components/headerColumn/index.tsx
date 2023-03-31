import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
import HELP from "../../../../services/helpers";
import { getStyle } from "./styles";

interface IHeaderColumn {
    title: string;
}

const HeaderColumn = ({ title }: IHeaderColumn) => {
    const style = useMemo(() => getStyle(), []);
    const lang = UseLanguage();
    const headerTitle = lang[HELP.modifyTextForLangSelect(title) as keyof typeof lang] ?? title;
    return (
        <View style={style.columnContaier}>
            <Text style={style.columnText} >
                {headerTitle}
            </Text>
        </View>

    );
};
export default memo(HeaderColumn);