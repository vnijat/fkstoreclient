import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { useToast } from "react-native-rooster";
import { Alert } from "react-native-windows";
import CustomContextMenu from "../../../../components/customContextMenu";
import CustomPressable from "../../../../components/customPressable";
import { useDeleteProjectMutation } from "../../../../modules/api/projects.api";
import { setClientInfoData, setIsOpenClientInfoModal, setIsProjectForEdit, setIsShowProjectAddEditModal, setIsShowProjectOrdersModal, setProjectDataForPost, setProjectIdForRequestOrders } from "../../../../modules/redux/projectSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import { Client } from "../../../../types/client";
import { Project } from "../../../../types/project";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency.windows";
import StatusColumn from "./statusColumn";
import { getStyle } from "./styles";


interface IProjectslistItem {
    project: Project;
}

interface ICompundData {
    data: any,
    title: string;
    clickable?: boolean;
}

const ProjectListItem = ({ project }: IProjectslistItem) => {
    const style = useMemo(() => getStyle(), []);
    const { addToast } = useToast();
    const dispatch = useAppDispatch();
    const [apiDeleteProject] = useDeleteProjectMutation();
    const rowData = useMemo(() => [
        { data: project?.client, title: 'client' },
        project.title.toUpperCase(),
        project.description?.toUpperCase(),
        currency.format(project.price),
        { data: Number(project.totalOrders), title: 'orders', clickable: true },
        currency.format(project.ordersTotalCost),
        currency.format(project.otherExpensesTotalCost),
        currency.format(project.totalPrice),
        currency.format(project.paid),
        currency.format(project.unPaid),
        { data: project.deadline, title: 'deadline' },
        { data: project.status, title: 'status', clickable: true },
    ], [project]);

    const onPressClient = () => {
        if (project?.client) {
            dispatch(setClientInfoData(project?.client));
            dispatch(setIsOpenClientInfoModal(true));
        } else {
            HELP.alertError(undefined, 'Client is Unknown', 'Please Set Client For Project');
        }
    };






    const RenderOrdersColumn = ({ data }: { data: any; }) => {
        const onPressOrdersCount = () => {
            dispatch(setProjectIdForRequestOrders(project.id!));
            dispatch(setIsShowProjectOrdersModal(true));
        };

        return <CustomPressable
            onPress={onPressOrdersCount}
            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.DEFAULT_TEXT_COLOR, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 }}
        >
            <Text style={{ fontSize: 10, textAlign: 'center', justifyContent: 'center' }}>
                {data}
            </Text>
        </CustomPressable>;
    };



    const RenderClientColumn = useMemo(() => ({ client }: { client: Client; }) => {
        const clientInfo = client === null ? 'Unknown' : client?.companyName || `${client?.firstName} ${client?.lastName}`;
        return (
            <>
                <CustomPressable
                    style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 3 }}
                    disabled
                >
                    <View style={style.clientIconContainer} tooltip={client?.type}>
                        {HELP.getClientTypeIcons(client?.type, 18)}
                    </View>
                    <View tooltip={clientInfo} >
                        <Text style={style.columContentText} >
                            {clientInfo.toUpperCase()}
                        </Text>
                    </View>
                </CustomPressable>
            </>
        );

    }, [project.client]);



    const RenderDeadlineColumn = ({ date }: { date: Date | null; }) => {
        const deadlineDate = date ? new Date(date).toLocaleDateString() : '';
        if (deadlineDate.length) {
            return (
                <View style={style.dateColumnContainer}>
                    < Text style={style.dateText}>
                        {deadlineDate}
                    </Text>
                </View >
            );
        }
        else {
            return null;
        }
    };


    const compoundDataModifier = useMemo(() => (data: any, title: string) => {
        const compoundData: { [key: string]: JSX.Element; } = {
            client: <RenderClientColumn client={data} />,
            status: <StatusColumn status={data} projectId={project.id} />,
            deadline: <RenderDeadlineColumn date={data} />,
            orders: <RenderOrdersColumn data={data} />
        };
        return compoundData[title];
    }, [project.client, project.status, project.id]);


    const RenderColumnContent = ({ content, id }: { content: string | number | ICompundData; id: string; }) => {
        const isClickable = (typeof content === 'object') && content?.clickable;
        return (
            <>
                <CustomPressable key={id} style={[style.columContent, isClickable && { zIndex: 3 }]}
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
            return <RenderColumnContent content={content!} id={`${project.id}-${i}`} key={i} />;
        });

    }, [rowData]);

    const onPressEdit = () => {
        const { client, paid, price, ...restProject } = project;
        dispatch(setProjectDataForPost({ clientId: client?.id.toString(), paid: Number(paid).toString(), price: Number(price).toString(), ...restProject }));
        dispatch(setIsProjectForEdit(true));
        dispatch(setIsShowProjectAddEditModal(true));
    };


    const onPressDelete = async () => {
        try {
            await HELP.alertPromise('are you sure to delete Project?', 'all the other expenses will deletet too');
            const response = await apiDeleteProject([project?.id]);
            if (response.error) {
                throw response.error;
            }
            await addToast({
                type: 'success',
                message: `Project deleted`.toUpperCase(),
                title: "Success"
            });
        } catch (error) {
            await addToast({
                type: 'error',
                message: `${error?.data?.message?.toString() || error?.toString()}`.toUpperCase(),
                title: "CANCEL"
            });
        }

    };

    const contextActionButtons = [
        {
            title: 'EDIT', onPress: onPressEdit
        },
        {
            title: 'DELETE', onPress: onPressDelete
        },
        {
            title: 'CLIENT INFO', onPress: onPressClient
        },
    ];


    const contextMenuContent = useMemo(() => {
        return (
            <View style={style.contextMenuContainer}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={style.contexMenuItem}
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
    }, [project]);


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

export default memo(ProjectListItem);