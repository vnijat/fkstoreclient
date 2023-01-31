import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useToast } from "react-native-rooster";
import Icon from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-windows";
import CustomPressable from "../../components/customPressable";
import { PrimaryButton } from "../../components/primaryButton";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency.windows";
import HeaderColumn from "./components/headerColumn";
import TableInputRow from "./components/tableInputRow";
import { getStyle } from "./styles";
import { ITableConfig, RowDataType, } from "./types";


interface ITableInput {
    tableData: RowDataType[];
    tableConfig: ITableConfig[];
    getNewTableData?: (data: RowDataType[]) => void;
    isDataEditable?: boolean;
}

const TableInput = ({ tableData, tableConfig, getNewTableData, isDataEditable }: ITableInput) => {
    const style = useMemo(() => getStyle(), []);
    const { addToast } = useToast();
    const [data, setData] = useState<RowDataType[]>([...tableData]);
    const scrollRef = useRef(null);
    const columnHeaderTitles = useMemo(() => tableConfig.map(item => item.headerTitle), [tableConfig]);
    const isHasChanges = useMemo(() => JSON.stringify(tableData) !== JSON.stringify(data), [tableData, data]);
    const emptyRow = useMemo(() => tableConfig.reduce((acc, curr) => {
        acc[curr.dtoKey] = '';
        return acc;
    }, {} as RowDataType), [tableConfig.length]);


    const addRowToTable = () => {
        setData(prev => [...prev, emptyRow]);
        setTimeout(() => scrollRef?.current.scrollToEnd(), 100);
    };

    const removeRowFromTable = () => {
        if (data?.length) {
            setData((prev) => {
                prev.pop();
                return [...prev];
            });
        }
    };

    const setRowDataToTableData = (data: { [key: string]: string; }, index: number) => {
        setData(prev => {
            prev[index] = { ...prev[index], ...data };
            return [...prev];
        });
    };

    const renderDataToTable = useMemo(() => {
        return data.map((rowData, index) => {
            const isLast = data.length - 1 === index;
            return (<View key={`${index}-data`}>
                <TableInputRow
                    getRowData={(data) => setRowDataToTableData(data, index)}
                    key={`${index}-inputs`}
                    defaultRowData={rowData}
                    tableInputConfigs={tableConfig}
                    isEditable={isDataEditable}
                />
                {isDataEditable && isLast &&
                    <>
                        <CustomPressable style={style.addRowButton} onPress={addRowToTable} onHoverOpacity key={`${index}-plus`}>
                            <Icon name={'circle-with-plus'} size={24} color={Colors.METALLIC_GOLD} />
                        </CustomPressable>
                        {< CustomPressable style={style.removeRowButton} onPress={removeRowFromTable} onHoverOpacity key={`${index}-delete`}>
                            <Icon name={'circle-with-cross'} size={20} color={Colors.METALLIC_GOLD} />
                        </CustomPressable>}
                    </>
                }
            </View>);
        });
    }, [data, isDataEditable]);

    const renderColumnHeaderTitles = useMemo(() => columnHeaderTitles.map((title, index) => <HeaderColumn title={title} key={`${index}-${title}`} />), [columnHeaderTitles.length]);



    const getTotalSUM = useCallback((dtoKey: string) => {
        return data.reduce((acc, curr) => +curr[dtoKey] + acc, 0);
    }, [data]);


    const getColumnsAllowedToSum = useMemo(() => {
        const columnsAllowedToSum = tableConfig.filter(data => (data.isMoney && data.isSumTotal));
        return columnsAllowedToSum;
    }, [tableConfig]);


    const onPressSave = async () => {
        const notEmptyRow = data.filter((rowData) => Object.keys(rowData).every(keys => !!rowData[keys].toString().length));
        if (isHasChanges) {
            getNewTableData && getNewTableData(notEmptyRow);
            await addToast({
                type: 'success',
                message: `Table Data Saved`.toUpperCase(),
                title: "Success"
            });
        }
    };

    const onPressReset = () => {
        if (isHasChanges) {
            setData([]);
            setTimeout(() => setData([...tableData]), 100);
        }
    };

    const renderTableFooter = useMemo(() => {
        return (
            <View style={style.tableFooterContent}>
                <View style={style.columnTotalsContainer}>
                    {getColumnsAllowedToSum.map((col, index) => {
                        return (
                            <View key={`${index}-container`} style={style.columnTotalContent}>
                                <Text style={style.columnTotalName} key={`${index}-${col.headerTitle}`}>
                                    {`${col.headerTitle} TOTAL : `}
                                </Text>
                                <Text style={style.columnTotalValue} key={`${index}-${col.dtoKey}`}>
                                    {currency.format(getTotalSUM(col.dtoKey))}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }, [getColumnsAllowedToSum.length, data]);


    const renderActionButtons = useMemo(() => {
        const isDisabled = !isHasChanges || (!data.length && !isHasChanges);
        if (isDataEditable) {
            return (
                <View style={[style.actionButtonsContainer, isDisabled && { opacity: 0.5 }]}>
                    <CustomPressable
                        style={style.actionButton}
                        onHoverOpacity={!isDisabled}
                        onPress={onPressReset}
                        disabled={isDisabled}
                    >
                        <Icon name={'back'} size={15} color={Colors.CARD_COLOR} />
                    </CustomPressable>
                    <CustomPressable
                        style={style.actionButton}
                        onHoverOpacity={!isDisabled}
                        onPress={onPressSave}
                        disabled={isDisabled}
                    >
                        <Icon name={'check'} size={15} color={Colors.CARD_COLOR} />
                    </CustomPressable>
                </View>
            );
        } else {
            return null;
        }
    }, [isHasChanges, data, isDataEditable]);



    return (
        <View style={style.tableContainer}>
            <View style={style.tableHeaderContainer}>
                {renderColumnHeaderTitles}
            </View>
            <View style={style.tableRowsContainer}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={style.tableContent}
                    ref={scrollRef}
                >
                    {isDataEditable && !data.length && <CustomPressable style={style.addButton} onPress={addRowToTable} onHoverOpacity>
                        <Icon name={'circle-with-plus'} size={24} color={Colors.METALLIC_GOLD} />
                    </CustomPressable>}
                    {renderDataToTable}
                </ScrollView>
            </View >
            <View style={style.tableFooterContainer}>
                {renderTableFooter}
            </View>
            {renderActionButtons}
        </View >
    );
};

export default TableInput;