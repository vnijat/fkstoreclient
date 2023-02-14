import React, { FC } from "react";
import { Text, View } from "react-native";
import UseLanguage from "../../../../../../modules/lozalization/useLanguage.hook";
import { columnHeaders } from "../../configs/columnHeaders";
import { getStyle } from "./styles";


interface ListHeaderProps {
}

export const ListHeader: FC<ListHeaderProps> = () => {
    const style = getStyle();
    const lang = UseLanguage();
    return (
        <View style={style.container}>
            {columnHeaders.map(({ title, dtoKey, sortable }, i) => {
                const headerTitle = lang[dtoKey] ? lang[dtoKey] : title;
                return (
                    <View key={i} style={style.columnContainer}>
                        <Text key={`${title}-${i}`} style={style.columnText}>
                            {headerTitle.toUpperCase()}
                        </Text>
                    </View>
                );
            })
            }
        </View >
    );
};