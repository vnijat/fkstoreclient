import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import {ProjectStatus} from "../../../../enums/projectStatus";
import {useAddProjectTypeMutation, useDeleteProjectMutation, useDeleteProjectTypeMutation, useEditProjectMutation, useEditProjectTypeMutation, useRecoverProjectsMutation} from "../../../../modules/api/projects.api";
import {setProjectsQueryParams} from "../../../../modules/redux/projectQuerySlicer";
import {clearProjectTypeForPost, setClientInfoData, setIsOpenClientInfoModal, setIsProjectForEdit, setIsShowOtherExpensesModal, setIsShowProjectAddEditModal, setIsShowProjectOrdersModal, setIsShowProjectTypesModal, setProjectDataForPost, setProjectIdForRequest, setProjectIdForRequestOrders, setProjectTypeDataForPost} from "../../../../modules/redux/projectSlicer";
import {useAppDispatch} from "../../../../modules/redux/store";
import {resetTable, setNewTableConfigs} from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import {Imeta} from "../../../../types/common/common";
import {IProjectType, Project} from "../../../../types/project";



function ProjectLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeleteProject] = useDeleteProjectMutation();
    const [apiEditProject] = useEditProjectMutation();
    const [apiRecoverProject] = useRecoverProjectsMutation();
    const [apiAddProjectType] = useAddProjectTypeMutation();
    const [apiEditProjectType] = useEditProjectTypeMutation();
    const [apiDeleteProjectType] = useDeleteProjectTypeMutation();

    function handlePagination(data: Imeta) {
        dispatch(setProjectsQueryParams(data));
    }

    function handleSearchInput(value: string) {
        dispatch(setProjectsQueryParams({page: 1, search: value}));

    }
    function handleFilterSelection(dtoKey: string, value: any) {
        dispatch(setProjectsQueryParams({page: 1, [dtoKey]: value}));
    }

    function handleButtonCreateProject() {
        dispatch(setIsShowProjectAddEditModal(true));

    }

    function handleNewTableData(data: ITableDataConfig<Project>[]) {
        dispatch(setNewTableConfigs({tableName: 'project', data}));
    }

    function handleResetTableConfig() {
        dispatch(resetTable({tableName: 'project'}));
    }


    function handleClearProjectTypeDataForPost() {
        dispatch(clearProjectTypeForPost());
    }


    function handleOnCloseProjectTypesModal() {
        dispatch(setIsShowProjectTypesModal(false));
        handleClearProjectTypeDataForPost();
    }

    function handleOnOpenProjectTypesModal() {
        dispatch(setIsShowProjectTypesModal(true));
    }

    function handleProjectTypesInput(data?: {[K in keyof IProjectType]: IProjectType[K]}) {
        dispatch(setProjectTypeDataForPost(data));
    }

    async function hanldeProjectRecover(data: Project) {
        try {
            const response = await apiRecoverProject([data?.id!]);
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project Recovered`.toUpperCase(), 'Recovered');
        } catch (error) {
            HELP.alertError(error);
        }
    }


    async function handleAddProjectType(data: IProjectType) {
        try {
            const response = await apiAddProjectType(data);
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project Type Added`.toUpperCase(), 'Added');
        } catch (error) {
            HELP.alertError(error);
        }
    }

    async function handleEditProjectType(data: IProjectType) {
        try {
            const response = await apiEditProjectType({body: data, id: data?.id!});
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project Type Updated`.toUpperCase(), 'Updated');
        } catch (error) {
            HELP.alertError(error);
        }
    }


    function handleOnPressRow(data: Project) {
        const {client, paid, price, ...restProject} = data;
        dispatch(setProjectDataForPost({clientId: client?.id!, paid: Number(paid).toString(), price: Number(price).toString(), ...restProject}));
        dispatch(setIsProjectForEdit(true));
        dispatch(setIsShowProjectAddEditModal(true));
    }

    async function handleDeleteProject(data: Project, softDelete: boolean = false) {
        try {
            const response = await apiDeleteProject({Ids: [data?.id!], softDelete: softDelete});
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project ${softDelete ? 'Archived' : 'Deleted'}`.toUpperCase(), `${softDelete ? 'Archived' : 'Deleted'}`);
        } catch (error) {
            HELP.alertError(error);
        }
    }

    async function handleDeleteProjectType(typeId: number, softDelete: boolean = false) {
        try {
            const response = await apiDeleteProjectType({Ids: [typeId], softDelete: softDelete});
            console.log("handleDeleteProjectType", response);
            if (response.error) {
                throw response.error;
            }
            HELP.showToast('success', `Project Type Deleted`.toUpperCase(), `Deleted`);
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
    function handleOnCloseOtherExpensesModal() {
        dispatch(setIsShowOtherExpensesModal(false));
    }

    function handleOnPressOrdersCounts(data: Project) {
        dispatch(setProjectIdForRequest(data.id!));
        dispatch(setIsShowProjectOrdersModal(true));
    }
    function handleOnPressOtherExpenses(data: Project) {
        dispatch(setProjectIdForRequest(data.id!));
        dispatch(setIsShowOtherExpensesModal(true));
    }

    async function handleProjectStatusChange(projectId: number, status: ProjectStatus) {
        try {
            const response = await apiEditProject({id: projectId, body: {status: status}});
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
        handleOnPressOrdersCounts,
        handleOnPressOtherExpenses,
        handleOnCloseOtherExpensesModal,
        handleFilterSelection,
        hanldeProjectRecover,
        handleOnCloseProjectTypesModal,
        handleOnOpenProjectTypesModal,
        handleProjectTypesInput,
        handleAddProjectType,
        handleEditProjectType,
        handleClearProjectTypeDataForPost,
        handleDeleteProjectType
    };


}

export default ProjectLogicProvider;