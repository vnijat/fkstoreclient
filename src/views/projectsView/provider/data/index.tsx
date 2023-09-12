import {useSelector} from "react-redux";
import {useGetOtherExpensesQuery, useGetProjectOrdersQuery, useGetProjectTypesQuery, useGetProjectsQuery} from "../../../../modules/api/projects.api";
import {RootState} from "../../../../modules/redux/store";



function ProjectDataProvider() {
    const projectTableDataConfig = useSelector((state: RootState) => state.tableConfigs.project);
    const projectsQueryParams = useSelector((state: RootState) => state.projectQuery);
    const isShowProjectOrdersModal = useSelector((state: RootState) => state.projectSlicer.isShowProjectOrdersModal);
    const isShowOtherExpensesModal = useSelector((state: RootState) => state.projectSlicer.isShowOtherExpensesModal);
    const projectId = useSelector((state: RootState) => state.projectSlicer.projectIdForRequest);
    const {data: projectTypeData} = useGetProjectTypesQuery(undefined, {
        selectFromResult: ({data}) => ({
            data,
        }
        ),
    });
    const {data: queryData, isLoading} = useGetProjectsQuery(projectsQueryParams, {
        selectFromResult: ({data, isLoading, isUninitialized, error}) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        pollingInterval: 5000
    });

    const {data: projectOrders, isLoading: isProjectOrdersLoading} = useGetProjectOrdersQuery(projectId, {
        selectFromResult: ({data, isLoading, isUninitialized}) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        skip: !isShowProjectOrdersModal
    });

    const {data: otherExpenses, isLoading: otherExpensesLoading} = useGetOtherExpensesQuery(projectId, {
        selectFromResult: ({data, isLoading, isUninitialized}) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        skip: !isShowOtherExpensesModal
    });



    return {
        projectTableDataConfig,
        projectsQueryParams,
        queryData: {
            data: queryData,
            isLoading
        },
        projectOrdersData: {
            data: projectOrders,
            isLoading: isProjectOrdersLoading
        },
        otherExpensesData: {
            data: otherExpenses,
            isLoading: otherExpensesLoading
        },
        isShowProjectOrdersModal,
        isShowOtherExpensesModal,
        projectTypeData,
    };


}

export default ProjectDataProvider;