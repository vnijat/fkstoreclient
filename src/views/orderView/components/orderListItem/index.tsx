import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import CustomContextMenu from "../../../../components/customContextMenu";
import CustomPressable from "../../../../components/customPressable";
import { setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost } from "../../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import { ProjectOrder } from "../../../../types/projectOrder";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency.windows";
import { getStyle } from "./styles";




interface IOrderListItem {
    data: ProjectOrder;
    onDeleteOrder: (orderId: number) => Promise<any>;
}

interface ICompundData {
    data: any,
    title: string;
    clickable?: boolean;
}

const OrderListItem = ({ data, onDeleteOrder }: IOrderListItem) => {
    const dispatch = useAppDispatch();
    const style = useMemo(() => getStyle(), []);



    const rowData = useMemo(() => [
        data.createdAt,
        data.detail,
        data.totalItems,
        currency.format(data.totalPrice),
        data.status
    ], [data]);


    const compoundDataModifier = useMemo(() => (data: any, title: string) => {
        const compoundData: { [key: string]: JSX.Element; } = {
        };
        return compoundData[title];
    }, []);


    const onPressItem = () => {
        dispatch(setOrderDataForPost({ ...data }));
        dispatch(setIsOrderForEdit(true));
        dispatch(setIsShowOrderModal(true));
    };

    const handleDelete = async () => {
        if (data.id) {
            await onDeleteOrder(data.id);
        }
    };

const contextActionButtons = [
    {
        title: 'DELETE', onPress: handleDelete
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
            <CustomPressable key={id} style={[style.columContent, { zIndex: 2 }]}
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
        onPress={onPressItem}
    >
        {renderRow}
        <CustomContextMenu zIndex={3}>
            {contextMenuContent}
        </CustomContextMenu>
    </CustomPressable>
);


};

export default memo(OrderListItem);