import { ElementType } from "react";

interface ITableDataConfig<T> {
    /**
     * Column Header Name 
     */
    headerTitle: string;
    /**
     * rowData key for recieveing value to columnComponent
     * if undefined will recieve full rowData object ?: useful when want to use customColumn
     * optional if want to use customColumnKey
     * 
     */
    dtoKey?: keyof T;
    /**
     * If has Nested Object set to true
     */
    isObject?: boolean;
    /**
     * Set nested object key to get value
     */
    objectDtoKey?: string;
    /**
     * Type of data for  selecting  preDesigned columnComponents
     * optional if want to use customColumnKey
     */
    type?: ITableDataTypes;
    /**
     * On rows selected show columns Total on Info Panel (only for numeric and number type ) 
     * 
     */
    showTotalOnRowselect?: boolean;

    /**
     * Hide column from showing
     */
    hidden: boolean;

    /**
     * Custom Column keyName 
     * Table component must recieve custom column components inside object with key {[customColumnKey]:({T})=>Component<T>}
     */
    customColumnKey?: string;
}

type ITableDataTypes = 'numeric' | 'money' | 'text' | 'date';

interface ITableRowData {
    [key: string]: any;
};


interface IContextMenuButton<T> {
    /**
     * Button Title
     */
    title: string;
    /**
     * onPress Button Recieves data id and index
     */
    onPress: (data: T, rowIndex: number) => void;
}


interface ICustomColumn<T> {
    [key: string]: ({ data }: { data: T; }) => JSX.Element;
}

export type {
    ITableRowData,
    ITableDataConfig,
    ITableDataTypes,
    IContextMenuButton,
    ICustomColumn
}

