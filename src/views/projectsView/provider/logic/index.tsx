import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { ProjectStatus } from "../../../../enums/projectStatus";
import { useDeleteProjectMutation, useEditProjectMutation } from "../../../../modules/api/projects.api";
import { setProjectsQueryParams } from "../../../../modules/redux/projectQuerySlicer";
import { setClientInfoData, setIsOpenClientInfoModal, setIsProjectForEdit, setIsShowProjectAddEditModal, setIsShowProjectOrdersModal, setProjectDataForPost, setProjectIdForRequestOrders } from "../../../../modules/redux/projectSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import { Imeta } from "../../../../types/common/common";
import { Project } from "../../../../types/project";



function ProjectLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeleteProject] = useDeleteProjectMutation();
    const [apiEditProject] = useEditProjectMutation();


    function handlePagination(data: Imeta) {
        dispatch(setProjectsQueryParams(data));
    }

    function handleSearchInput(value: string) {
        dispatch(setProjectsQueryParams({ page: 1, search: value }));

    }

    function handleButtonCreateProject() {
        dispatch(setIsShowProjectAddEditModal(true));

    }

    function handleNewTableData(data: ITableDataConfig<Project>[]) {
        dispatch(setNewTableConfigs({ tableName: 'project', data }));
    }

    function handleResetTableConfig() {
        dispatch(resetTable({ tableName: 'project' }));
    }


    function handleOnPressRow(data: Project) {
        const { client, paid, price, ...restProject } = data;
        dispatch(setProjectDataForPost({ clientId: client?.id!, paid: Number(paid).toString(), price: Number(price).toString(), ...restProject }));
        dispatch(setIsProjectForEdit(true));
        dispatch(setIsShowProjectAddEditModal(true));
    }

    async function handleDeleteProject(data: Project) {
        try {
            await HELP.alertPromise('are you sure to delete Project?', 'all the other expenses will deletet too');
            const response = await apiDeleteProject([data?.id!]);
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project deleted`.toUpperCase(), 'Deleted');
        } catch (error) {
            HELP.alertError(error);
        }
    }

    function handleOnPressClient(data: Project) {
        if (data?.client) {
            dispatch(setClientInfoData(data?.client));
            dispatch(setIsOpenClientInfoModal(true));
        } else {
            HELP.alertError(undefined, 'Client is Unknown', 'Please Set Client For Project');
        }
    };

    function handleOnCloseProjectOrdersModal() {
        dispatch(setIsShowProjectOrdersModal(false));
    }

    function handleOnPressOrdersCounts(data: Project) {
        dispatch(setProjectIdForRequestOrders(data.id!));
        dispatch(setIsShowProjectOrdersModal(true));
    }

    async function handleProjectStatusChange(projectId: number, status: ProjectStatus) {
        try {
            const response = await apiEditProject({ id: projectId, body: { status: status } });
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project Status Changed`.toUpperCase(), 'Status Change');
        }
        catch (error) {
            HELP.alertError(error);
        }

    }

    return {
        handlePagination,
        handleSearchInput,
        handleButtonCreateProject,
        handleResetTableConfig,
        handleNewTableData,
        handleDeleteProject,
        handleOnPressRow,
        handleProjectStatusChange,
        handleOnPressClient,
        handleOnCloseProjectOrdersModal,
        handleOnPressOrdersCounts
    };


}

export default ProjectLogicProvider;