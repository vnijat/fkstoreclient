import {
  AddClientProject,
  IProjectType,
  IProjectsForPicker,
  Project,
  ProjectsQueryParams,
  ProjectsResponse,
} from '../../types/project';
import {OrderItem} from '../../types/projectOrder';
import {InventoryApi} from './apiSlice';

export const ProjectsApi = InventoryApi.injectEndpoints({
  endpoints: build => ({
    getProjects: build.query<ProjectsResponse, ProjectsQueryParams>({
      providesTags: result =>
        result
          ? [
            ...result.projects.map(({id}) => ({
              type: 'projects' as const,
              id,
            })),
            'projects',
          ]
          : ['projects'],
      query: filter => {
        return {
          url: '/project/all',
          params: filter,
        };
      },
    }),
    getProjectTypes: build.query<{label: string; value: number, prefix: string;}[], undefined>({
      providesTags: ['projectTypes'],
      query: () => {
        return {
          url: '/project/type/all'
        };
      }
    }),
    addProjectType: build.mutation<undefined, IProjectType>({
      query: body => {
        return {
          url: '/project/type/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['projectTypes'],
    }),
    editProjectType: build.mutation<undefined, {id: number; body: IProjectType;}>({
      query: ({body, id}) => {
        return {
          url: `/project/type/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['projectTypes'],
    }),
    recoverProjects: build.mutation<undefined, number[]>({
      query: Ids => {
        return {
          url: '/project/recover/',
          body: Ids,
          method: 'POST',
        };
      },
      invalidatesTags: ['projects', 'projectsForPicker', 'clients'],
    }),
    getProjectsForPicker: build.query<IProjectsForPicker[], undefined>({
      providesTags: ['projectsForPicker'],
      query: () => {
        return {
          url: '/project/active/all/picker',
        };
      },
    }),
    getActiveProjects: build.query<Project[], string>({
      providesTags: ['activeProjects'],
      query: (projectCode) => {
        return {
          url: `/project/active/all/`,
          params: {projectCode},
        };
      },
    }),
    getProjectOrders: build.query<OrderItem[], number | undefined | string>({
      providesTags: ['projectOrders'],
      query: projectId => {
        return {
          url: `/project/orders/${projectId}`,
        };
      },
    }),
    getOtherExpenses: build.query<OrderItem[], number | undefined | string>({
      providesTags: ['otherExpenses'],
      query: projectId => {
        return {
          url: `/project/otherExpenses/${projectId}`,
        };
      },
    }),
    addProject: build.mutation<Project, AddClientProject>({
      query: body => {
        return {
          url: '/project/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['projects', 'projectsForPicker', 'otherExpenses', 'clients'],
    }),
    editProject: build.mutation<Project, {id: number; body: AddClientProject;}>({
      query: ({id, body}) => {
        return {
          url: `/project/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
      invalidatesTags: (result, error, arg) => [
        'projects',
        'projectsForPicker',
        'clients',
        'otherExpenses',
      ],
    }),
    deleteProject: build.mutation<undefined, {Ids: number[], softDelete: boolean;}>({
      query: body => {
        return {
          url: `/project/delete`,
          body: body,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        'projects',
        'projectsForPicker',
        'clients',
      ],
    }),
    deleteProjectType: build.mutation<undefined, {Ids: number[], softDelete: boolean;}>({
      query: body => {
        return {
          url: `/project/type/delete`,
          body: body,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        'projectTypes',
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsForPickerQuery,
  useGetProjectOrdersQuery,
  useGetOtherExpensesQuery,
  useGetProjectTypesQuery,
  useRecoverProjectsMutation,
  useAddProjectTypeMutation,
  useEditProjectTypeMutation,
  useDeleteProjectTypeMutation,
  useGetActiveProjectsQuery
} = ProjectsApi;
