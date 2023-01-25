import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import CustomContextMenu from "../../../components/customContextMenu";
import CustomPressable from "../../../components/customPressable";
import { setIsPurchaseForEdit, setIsShowPurchaseModal, setPurchaseDataForPost } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { PurchaseDto } from "../../../types/purchase";
import { Colors } from "../../../utils/colors";
import { currency } from "../../../utils/currency.windows";
import { getStyle } from "./styles";




interface IPurchaseListItem {
    data: PurchaseDto;
    onDeletePurchase: (orderId: number) => Promise<any>;
}

interface ICompundData {
    data: any,
    title: string;
    clickable?: boolean;
}

const PurchaseListItem = ({ data, onDeletePurchase }: IPurchaseListItem) => {
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
        dispatch(setPurchaseDataForPost({ ...data }));
        dispatch(setIsPurchaseForEdit(true));
        dispatch(setIsShowPurchaseModal(true));
    };

    const handleDelete = async () => {
        if (data.id) {
            await onDeletePurchase(data.id);
        }
    };

    const contextActionButtons = [
        {
            title: 'DELETE', onPress: handleDelete
        },
    ];

    const contextMenuContent = useMemo(() => {
        return (
            <View style={style.contextMenuContent}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={style.contextMenuItem}
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

export default memo(PurchaseListItem);