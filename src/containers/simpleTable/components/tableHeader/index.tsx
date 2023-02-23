import React from "react";
import { Text, View } from "react-native-windows";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
import { Colors } from "../../../../utils/colors";
import FONT from "../../../../utils/font";
import { ITableDataConfig, ITableRowData } from "../../types";



interface ITableHeader<T> {
    tableDataConfig: ITableDataConfig<T>[];
}

const TableHeader = <T extends ITableRowData>({ tableDataConfig }: ITableHeader<T>) => {
    const lang = UseLanguage();
    const withoutHidden = tableDataConfig?.filter(data => !data?.hidden);
    const headerNames = withoutHidden?.map((tableData) => lang[tableData.dtoKey as keyof typeof lang] ? lang[tableData.dtoKey as keyof typeof lang] : tableData?.headerTitle);

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 10 }}>
            {headerNames?.map((title, index) => {
                return (
                    <View style={{ flex: 1, padding: 5, minWidth: 200, maxWidth: 250 }} key={`${index}`}>
                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_MEDIUM, fontFamily: FONT.FONT_FAMILY, fontWeight: FONT.FONT_BOLD }}>
                            {title?.toUpperCase()}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default TableHeader;