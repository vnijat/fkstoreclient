import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import CustomContextMenu from "../../../../components/customContextMenu";
import CustomPressable from "../../../../components/customPressable";
import { ProjectOrder } from "../../../../types/projectOrder";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency";
import { getStyle } from "./styles";




interface IOrderListItem {
    data: ProjectOrder;

}

interface ICompundData {
    data: any,
    title: string;
    clickable?: boolean;
}

const OrderListItem = ({ data }: IOrderListItem) => {
    const style = useMemo(() => getStyle(), []);



    const rowData = useMemo(() => [
        data.createdAt,
        data.project.title,
        data.totalItems,
        currency.format(data.totalPrice),
        data.status
    ], [data]);


    const compoundDataModifier = useMemo(() => (data: any, title: string) => {
        const compoundData: { [key: string]: JSX.Element; } = {
        };
        return compoundData[title];
    }, []);


    const contextActionButtons = [
        {
            title: 'EDIT', onPress: () => { }
        },
        {
            title: 'DELETE', onPress: () => { }
        },
        {
            title: 'CLIENT INFO', onPress: () => { }
        },
    ];

    const contextMenuContent = useMemo(() => {
        return (
            <View style={{ width: 150, maxHeight: 200, backgroundColor: Colors.CARD_COLOR, padding: 2 }}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={{ width: '100%', height: 30, flexDirection: 'row', backgroundColor: Colors.CARD_HEADER_COLOR, marginVertical: 1, alignItems: 'center', paddingHorizontal: 5 }}
                            onPress={button.onPress}
                            onHoverOpacity
                        >
                            <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                {button.title}
                            </Text>
                        </CustomPressable>
                    );
                })
                }
            </View>
        );
    }, [data]);


    const RenderColumnContent = ({ content, id }: { content: string | number | ICompundData; id: string; }) => {
        return (
            <>
                <CustomPressable key={id} style={[style.columContent, { zIndex: 3 }]}
                    disabled
                >
                    {
                        (typeof content === 'object') && content !== null
                            ?
                            compoundDataModifier(content.data, content.title)
                            :
                            <View tooltip={content} >
                                < Text key={`${content}-${id}`} style={style.columContentText} >
                                    {content}
                                </Text>
                            </View>
                    }
                </CustomPressable>
            </>
        );
    };



    const renderRow = useMemo(() => {
        return rowData.map((content, i) => {
            return <RenderColumnContent content={content!} id={`${data.id}-${i}`} key={i} />;
        });

    }, [rowData]);




    return (
        <CustomPressable style={style.rowItem}
            onHoverOpacity
        >
            {renderRow}
            <CustomContextMenu>
                {contextMenuContent}
            </CustomContextMenu>
        </CustomPressable>
    );


};

export default memo(OrderListItem);