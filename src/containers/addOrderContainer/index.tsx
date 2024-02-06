import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {Text, View, ActivityIndicator, Alert, FlatList} from "react-native";
import {useSelector} from "react-redux";
import {InputItem} from "../../components/inputItem/index.windows";
import {PrimaryButton} from "../../components/primaryButton";
import {OrderItemStatus} from "../../enums/orderItemStatus";
import {OrderStatus} from "../../enums/orderStatus";
import {useAddOrderMutation, useEditOrderMutation} from "../../modules/api/orders.api";
import {useGetActiveProjectsQuery, useGetProjectsForPickerQuery} from "../../modules/api/projects.api";
import {clearOrderDataForPost, setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost, setProjectId} from "../../modules/redux/orderSlicer";
import {RootState, useAppDispatch} from "../../modules/redux/store";
import HELP from "../../services/helpers";
import {AddOrderDto} from "../../types/projectOrder";
import {Colors} from "../../utils/colors";
import ItemsForOrderList from "./itemsForOrderList";
import ItemsForOrderListHeader from "./itemsForOrderListHeader";
import ItemsForOrderSearch from "./itemsForOrderSearch";
import {getStyle} from "./style";
import ProjectCard from "../../components/projectCard";
import {Project} from "../../types/project";
import FONT from "../../utils/font";
import {setClientInfoData, setIsOpenClientInfoModal} from "../../modules/redux/projectSlicer";
import {setIsShowClientModal} from "../../modules/redux/clientsSlicer";
import ClientInfoModal from "../../views/projectsView/components/clientInfoModal";



interface IAddOrderContainer {

}

const AddOrderCntainer = ({}: IAddOrderContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [isSkipProjectSlection, setIsSkipProjectSlection] = useState<boolean>(false);
    const [projectCodeValue, setProjectCodeValue] = useState<string>('');
    const projectId = useSelector((state: RootState) => state.ordersSlicer.projectId);
    const [apiAddOrder] = useAddOrderMutation();
    const [apiUpdateOrder] = useEditOrderMutation();
    const {data: projectsData, isLoading} = useGetProjectsForPickerQuery(undefined, {
        selectFromResult: ({data, isLoading}) => ({
            data,
            isLoading
        })
    });
    const {data: activeProjects} = useGetActiveProjectsQuery(projectCodeValue, {
        selectFromResult: ({data, isLoading}) => ({
            data,
        })
    });

    const isOrderForEdit = useSelector((state: RootState) => state.ordersSlicer?.isOrderForEdit);
    const orderData = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost);
    const [tempOrderData, setTempOrderData] = useState<AddOrderDto>();
    const orderStatus = useMemo(() => {
        return {
            confirmed: orderData.status === OrderStatus.COMPLETED,
            rejected: orderData.status === OrderStatus.DECLINED,
            inProgress: orderData.status === OrderStatus.PENDING
        };
    }, [orderData.status]);

    useEffect(() => {
        return () => {
            setTempOrderData(undefined);
            dispatch(clearOrderDataForPost());
            dispatch(setIsShowOrderModal(false));
            dispatch(setIsOpenClientInfoModal(false));
            dispatch(setProjectId(null));
        };
    }, []);

    useEffect(() => {
        if (isOrderForEdit) {
            dispatch(setProjectId(null));
            setIsSkipProjectSlection(true);
            setTempOrderData(orderData);
            dispatch(setIsOrderForEdit(false));
        }
    }, [isOrderForEdit]);

    const handleCreateOrder = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiAddOrder(orderData);
            if (response?.data) {
                dispatch(setOrderDataForPost({...response.data}));
                setTempOrderData({...response.data});
            }
        } else {
            HELP.alertError(undefined, `Cant Create Order`, `Order Cart is Empty`);
        }
    };
    const handleClearOrderData = () => {
        if (tempOrderData) {
            dispatch(setOrderDataForPost(tempOrderData));
        } else {
            dispatch(clearOrderDataForPost());
        }
    };

    const orderDetailSetValue = (value: string) => {
        dispatch(setOrderDataForPost({detail: value}));
    };

    const handleUpdateOrder = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiUpdateOrder({body: orderData, id: orderData?.id!});
            if (response?.data) {
                dispatch(setOrderDataForPost({...response.data}));
                setTempOrderData({...response.data});
            }
        } else {
            HELP.alertError(undefined, `Cant Update Order`, `Order Cart is Empty`);
        }
    };


    const handleOrderConfirm = async () => {
        try {
            const isOrderCanConfirmed = !!orderData?.orderItems?.length && !orderData.orderItems?.some(item => [OrderItemStatus.IN_USE].includes(item.status!));
            if (isOrderCanConfirmed) {
                const response = await apiUpdateOrder({body: {...orderData, status: OrderStatus.COMPLETED}, id: orderData?.id!}).unwrap();
                if (response?.data) {
                    dispatch(setOrderDataForPost({...response.data}));
                    setTempOrderData({...response.data});
                }
            }
            else {
                HELP.alertError(undefined, `Can't Confirm!`, `cart empty or  some item status is"${OrderItemStatus.IN_USE.toUpperCase()}"`);
            }

        } catch (error) {

            HELP.alertError(error);
        }


    };

    const handleOrderReject = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiUpdateOrder({body: {...orderData, status: OrderStatus.DECLINED}, id: orderData?.id!});
            if (response?.data) {
                dispatch(setOrderDataForPost({...response.data}));
                setTempOrderData({...response.data});
            } else if (response?.error) {
                HELP.alertError(response?.error);
            }
        } else {
            HELP.alertError(undefined, `Cant Reject`, `Order cart is empty`);
        }
    };

    const actionContainerColor = useMemo(() => {
        const colors = {
            [OrderStatus.COMPLETED]: Colors.COMPLETED_COLOR,
            [OrderStatus.DECLINED]: Colors.DECLINED_COLOR,
            [OrderStatus.PENDING]: Colors.INPROGRESS_COLOR
        };
        return orderData.status && colors[orderData.status];
    }, [orderStatus]);


    const handleProjectSelection = (data: Project) => {
        dispatch(setProjectId(data.id));
    };

    const hanldeOnPressClient = useCallback((data: Project) => {
        dispatch(setClientInfoData(data.client));
        dispatch(setIsOpenClientInfoModal(true));
    }, []);


    const projectListItem = useCallback(({item, index}: {item: Project; index: number;}) => {
        return (
            <ProjectCard data={item} hanldeOnPressClient={hanldeOnPressClient} handleOnPressSelect={handleProjectSelection} />
        );
    }, [activeProjects]);

    const renderProjectSelection = useMemo(() => {
        return (
            <View style={style.projectSelectionContainer}>
                <View style={style.projectSelectionHeaderContainer}>
                    <View>
                        <InputItem height={40} isSearch inputValue={projectCodeValue} setValue={setProjectCodeValue} />
                    </View>
                </View>
                <View style={style.projectListContainer}>
                    <FlatList
                        data={activeProjects}
                        renderItem={projectListItem}
                        keyExtractor={(item) => item.id!.toString()}
                        columnWrapperStyle={{gap: 5}}
                        numColumns={4}
                        contentContainerStyle={{padding: 10, gap: 5}}
                    />
                </View>
                <View style={style.projectSelectionBottomContainer}>
                    <PrimaryButton onHoverOpacity onPress={() => setIsSkipProjectSlection(true)} title={'Skip'} width={200} borderRadius={3} height={40} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                </View>
            </View>
        );

    }, [activeProjects, isSkipProjectSlection, projectCodeValue]);

    return (
        <View style={style.container}>
            <ClientInfoModal />
            {
                ((projectId || isSkipProjectSlection)) ?
                    <>
                        {orderStatus.inProgress && <View style={style.searchContainer}>
                            <ItemsForOrderSearch />
                        </View>}
                        <View style={style.orderContentContainer}>
                            <View style={style.orderListHeaderContainer}>
                                <ItemsForOrderListHeader projectId={projectId} />
                            </View>
                            <View style={style.orderListContainer}>
                                {isLoading ? <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} />
                                    : <ItemsForOrderList orderItems={orderData.orderItems ?? []} projectsData={projectsData ?? []} projectId={projectId} />}
                            </View>
                        </View>
                        <View style={[style.orderActionsContainer, {borderColor: actionContainerColor}]}>
                            <Text style={style.orderStatusText}>
                                {`ORDER STATUS: ${orderData.status}`.toUpperCase()}
                            </Text>
                            {tempOrderData && <View style={style.orderActionButtonsContainer}>
                                {(!orderStatus.confirmed && !orderStatus.rejected) && <PrimaryButton onHoverOpacity title={'CONFIRM'} onPress={handleOrderConfirm} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.METALLIC_GOLD} />}
                                {(!orderStatus.rejected && orderStatus.confirmed) && <PrimaryButton onHoverOpacity title={'REJECT'} onPress={handleOrderReject} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.INFRA_RED} />}
                            </View>}
                        </View>
                        <View style={style.orderDetailContainer}>
                            <InputItem
                                inputTitle={'ORDER DETAIL'}
                                setValue={orderDetailSetValue}
                                inputValue={orderData.detail ?? ''}
                                isMultiLine
                                disabledForEdit={!orderStatus.inProgress}
                                height={60}
                            />
                        </View>
                        <View style={style.orderFooterContainer}>
                            {orderStatus.inProgress && <View style={style.orderFooterButtonContainer}>
                                <PrimaryButton onHoverOpacity title={'RESET'} onPress={handleClearOrderData} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                                {tempOrderData ? <PrimaryButton onHoverOpacity title={'UPDATE'} onPress={handleUpdateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                                    : <PrimaryButton onHoverOpacity title={'CREATE'} onPress={handleCreateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                                }
                            </View>}
                        </View>
                    </> :
                    <>
                        {renderProjectSelection}
                    </>
            }
        </View>
    );
};

export default memo(AddOrderCntainer);