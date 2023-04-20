import React, { memo, useMemo } from "react";
import { Image, View, Linking, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import DataField from "./components/dataField";
import { getStyle } from "./style";
import CustomModal from "../../../../components/customModal";
import { PrimaryButton } from "../../../../components/primaryButton";
import { useGetItemQuery, InventoryApi } from "../../../../modules/api/apiSlice";
import { setIsShowItemModal } from "../../../../modules/redux/itemsSlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { currency } from "../../../../utils/currency.windows";
import { Colors } from "../../../../utils/colors";
import HELP from "../../../../services/helpers";
import SimpleTable from "../../../../containers/simpleTable";
import { ICustomColumn, ITableDataConfig } from "../../../../containers/simpleTable/types";
import { InventoryTrackData } from "../../../../types/inventoryTrack";
import TrackStatusColumn from "../../../inventoryTrackView/components/customColumns/statusColumn";
import FONT from "../../../../utils/font";


interface IItemModal {
}


interface propertiesData {
    title: string;
    value?: string;
    width?: number;
}

const ItemModal = ({ }: IItemModal) => {
    const style = useMemo(() => getStyle(), []);
    const apiURL = useSelector((state: RootState) => state.configs.apiURL);
    const dispatch = useAppDispatch();
    const itemId = useSelector((state: RootState) => state.itemsSlicer.itemIdForFullResponse);
    const isShowModal = useSelector((state: RootState) => state.itemsSlicer.isShowItemModal);
    const { data } = useGetItemQuery(itemId, {
        selectFromResult: ({ data }) => ({
            data,
        })
    });

    const onCloseModal = () => {
        dispatch(setIsShowItemModal(false));
    };


    const propertiesData = useMemo(() => {
        let properties: propertiesData[] = [];
        if (data?.properties) {
            const { dimensionMeasure, volumeMeasure, volume, width, height, length, area, areaMeasure, weight, weightMeasure, supplierColorVariant, supplierProductArticule } = data?.properties;
            const dimensionsData = `l: ${Number(length)} w: ${Number(width)} h: ${Number(height)}`;
            const areaData = `${Number(area)}`;
            const volumeData = `${Number(volume)}`;
            const weightData = `${Number(weight)}`;
            properties = [
                { title: `Dimensions (${dimensionMeasure})`, value: dimensionsData, width: 150 },
                { title: `Area (${areaMeasure})`, value: areaData },
                { title: `Volume (${volumeMeasure})`, value: volumeData },
                { title: `Weight (${weightMeasure})`, value: weightData },
                { title: 'Color/Variant', value: supplierColorVariant },
                { title: 'Aritcule', value: supplierProductArticule },
            ];
        }
        return properties;
    }, [data?.properties]);


    const tableDataConfig: ITableDataConfig<InventoryTrackData>[] = [
        {
            headerTitle: 'Date',
            dtoKey: 'updatedat',
            hidden: false,
            type: 'date'
        },
        {
            headerTitle: 'Quantity',
            dtoKey: 'quantity',
            type: 'numeric',
            hidden: false
        },
        {
            headerTitle: 'Status',
            customColumnKey: 'status',
            hidden: false
        }
    ];

    const customColumn: ICustomColumn<InventoryTrackData> = {
        status: ({ data }) => <TrackStatusColumn data={data} />
    };

    const onPressGetBarcodePdf = async () => {
        Linking.openURL(`${apiURL}/item/barcode/pdf/${itemId}`);
    };

    const onPressPrint = async () => {
        const response = await dispatch(InventoryApi.endpoints.printBarcode.initiate({ itemId: itemId! }));
        if (response?.data) {
            HELP.showToast('success', `${response?.data?.message}`.toUpperCase(), "Print Job Sent");
        } else {
            HELP.alertError(response?.error);
        }

    };

    return (
        <CustomModal
            isShowModal={isShowModal}
            isDissmissEnabled={false}
            closeModal={onCloseModal}
            width={1000}
            borderColor={Colors.DEFAULT_TEXT_COLOR}
        >
            <View style={style.container}>
                {(isShowModal && data) ? <>
                    <View style={style.contentTopContainer}>
                        <View style={style.contentTopLeftContainer}>
                            <DataField title={'Name'} value={data?.name!} />
                            <DataField title={'Description'} value={data?.description!} height={60} />
                            <DataField title={'Category'} value={data?.category!} />
                            <View style={{ flexDirection: 'row' }}>
                                <DataField title={'Unit'} value={data?.unit.name!} width={100} />
                                <DataField title={'At Stock'} value={Number(data?.quantity!)} width={100} />
                                <DataField title={'Cost Price'} value={currency.format(Number(data?.costPrice!))} width={100} />

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <DataField title={'Color'} value={data?.color.name!} width={100} />
                                <DataField title={'Store'} value={data?.store.name!} width={100} />
                                <DataField title={'Location'} value={data?.location.code!} width={100} />
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {propertiesData?.map((data, index) => {
                                    return (
                                        <DataField title={data.title} value={data.value as string} width={data?.width || 100} key={`${index}`} />
                                    );
                                })}
                            </View>
                        </View>
                        <View style={style.contentTopRightContainer}>
                            <View style={style.itemBarcodeContainer}>
                                <View style={style.barcodeImage}>
                                    <Image source={{ uri: `data:image/png;base64,${data?.qrCode}` }} resizeMode={'center'} style={{ flex: 1, }} />
                                </View>
                                <Text style={style.rightContainerInfoText}>
                                    {`SKU: ${data?.skuCode}`}
                                </Text>
                                <Text style={style.rightContainerInfoText}>
                                    {!!data?.label.name.length && `Label: ${data?.label.name}`}
                                </Text>
                            </View>
                            <View style={style.barcodeActionsButton}>
                                <PrimaryButton onPress={onPressGetBarcodePdf} title={'Get PDF'} width={100} onHoverOpacity />
                                <PrimaryButton onPress={onPressPrint} title={'Print'} width={100} onHoverOpacity />
                            </View>
                        </View>
                    </View>
                    <View style={style.contentBottomContainer}>
                        <View style={style.contentBottomLeft}>
                            <View style={{ height: 280 }}>
                                <View style={style.bottemLeftTitle}>
                                    <Text style={style.bottemLeftTitleText}>
                                        {'Transactions'.toUpperCase()}
                                    </Text>
                                </View>
                                <View style={{ flexShrink: 1, backgroundColor: Colors.CARD_HEADER_COLOR, }}>
                                    <SimpleTable
                                        tableData={data.transactions}
                                        tableDataConfig={tableDataConfig}
                                        customColumns={customColumn}
                                        rowHeight={35}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={style.bottomRightContainer}>
                            <View style={style.bottomRightContent}>
                                <Icon name={'shop'} color={Colors.METALLIC_GOLD} size={34} />
                                <Text style={style.bottomRightTitleText}>
                                    {'Supplier'}
                                </Text>
                            </View>
                            <DataField title={'Name'} value={data?.supplier.name!} />
                            {data?.supplier.phone && < DataField title={'Phone'} value={data?.supplier.phone!} />}
                            {data?.supplier.email && < DataField title={'Email'} value={data?.supplier.email!} />}
                            {data?.supplier.address && < DataField title={'Address'} value={data?.supplier.address!} />}
                        </View>
                    </View>
                </> : <ActivityIndicator />
                }
            </View>
        </CustomModal >

    );

};

export default memo(ItemModal);