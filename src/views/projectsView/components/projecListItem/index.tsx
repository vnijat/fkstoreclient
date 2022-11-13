import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { PopUpICon } from "../../../../assets/icons/clientCardIcons";
import CustomPressable from "../../../../components/customPressable";
import { ProjectStatus } from "../../../../enums/projectStatus";
import { setClientInfoData, setIsOpenClientInfoModal } from "../../../../modules/redux/projectSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import { Client } from "../../../../types/clientsQuery";
import { Project } from "../../../../types/projectsQuery";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency";
import { getStyle } from "./styles";


interface IProjectslistItem {
    project: Project;
}

interface ICompundData {
    data: any,
    title: string;
}

const ProjectListItem = ({ project }: IProjectslistItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const rowData = useMemo(() => [
        { data: project.client, title: 'client' },
        project.title.toUpperCase(),
        project.description?.toUpperCase(),
        currency.format(project.price),
        currency.format(project.paid),
        project.deadline,
        { data: project.status, title: 'status' },
    ], [project]);

    const RenderClientColumn = useMemo(() => ({ client }: { client: Client; }) => {

        const onPressClient = () => {
            dispatch(setClientInfoData(project?.client));
            dispatch(setIsOpenClientInfoModal(true));
        };

        return (
            <>
                <CustomPressable
                    onPress={onPressClient}
                    style={{ flexDirection: 'row', alignItems: 'center', width: 200, borderRadius: 3 }}
                    pressedStyle={{ backgroundColor: Colors.DEFAULT_TEXT_COLOR }}
                >
                    <View style={style.clientIconContainer} tooltip={client?.type}>
                        {HELP.getClientTypeIcons(client?.type, 25)}
                    </View>
                    <Text style={style.columContentText}>
                        {client?.companyName.toUpperCase() || `${client?.firstName} ${client.lastName}`.toUpperCase()}
                    </Text>
                    <View style={{ paddingRight: 10, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10 }}>
                        <PopUpICon size={15} color={Colors.DEFAULT_TEXT_COLOR} />
                    </View>
                </CustomPressable>
            </>
        );

    }, [project.client]);


    const RenderProjectStatus = useMemo(() => ({ status }: { status: ProjectStatus; }) => {

        return (
            <View style={{ borderColor: Colors.CARD_HEADER_COLOR, borderRadius: 30, borderWidth: 2, justifyContent: 'center', width: 30, height: 30 }} tooltip={status}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {HELP.getProjectStatusIcons(status, 20)}
                </View>
            </View>
        );

    }, [project.status]);


    const compoundDataModifier = (data: any, title: string) => {
        const compoundData: { [key: string]: JSX.Element; } = {
            client: <RenderClientColumn client={data} />,
            status: <RenderProjectStatus status={data} />,
        };

        return compoundData[title];

    };




    const RenderColumnContent = ({ content, id }: { content: string | number | ICompundData; id: string; }) => {
        return (
            <>
                <CustomPressable key={id} style={[style.columContent]} >
                    {
                        (typeof content === 'object') && content !== null
                            ?
                            compoundDataModifier(content.data, content.title)
                            :
                            < Text key={`${content}-${id}`} style={style.columContentText}>
                                {content}
                            </Text>
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



    return (
        <CustomPressable style={style.rowItem}
            onHoverOpacity
        >
            {renderRow}
        </CustomPressable>
    );
};

export default memo(ProjectListItem);;;;;