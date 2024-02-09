import React, {useMemo} from "react";
import {Text, View} from "react-native-windows";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
import HELP from "../../../../services/helpers";
import {Colors} from "../../../../utils/colors";
import FONT from "../../../../utils/font";
import {ITableDataConfig, ITableRowData} from "../../types";
import {getStyle} from "./styles";



interface ITableHeader<T> {
    tableDataConfig: ITableDataConfig<T>[];
    columnWidth?: number;
}

const TableHeader = <T extends ITableRowData>({tableDataConfig, columnWidth}: ITableHeader<T>) => {
    const style = useMemo(() => getStyle(columnWidth), [columnWidth]);
    const lang = UseLanguage();
    const withoutHidden = tableDataConfig?.filter(data => (data.accessRoles ? HELP.hasPermission(data.accessRoles) : true) && !data?.hidden);
    const headerNames = withoutHidden?.map((tableData) => {
        const headerTitle = HELP.modifyTextForLangSelect(tableData.headerTitle);
        return lang[headerTitle as keyof typeof lang] ?? tableData.headerTitle;
    });

    return (
        <View style={style.container}>
            {headerNames?.map((title, index) => {
                return (
                    <View style={style.headerColumn} key={`${index}`}>
                        <Text style={style.headerText}>
                            {title?.toUpperCase()}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default TableHeader;