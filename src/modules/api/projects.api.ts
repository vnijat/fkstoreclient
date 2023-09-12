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
          url: '/client/projects/all',
          params: filter,
        };
      },
    }),
    getProjectTypes: build.query<any, undefined>({
      providesTags: ['projectTypes'],
      query: () => {
        return {
          url: '/client/project/type/all'
        };
      }
    }),
    addProjectType: build.mutation<IProjectType, any>({
      query: body => {
        return {
          url: '/client/project/type/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['projectTypes'],
    }),
    recoverProjects: build.mutation<undefined, number[]>({
      query: Ids => {
        return {
          url: '/client/project/recover/',
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
          url: '/client/projects/picker',
        };
      },
    }),
    getProjectOrders: build.query<OrderItem[], number | undefined | string>({
      providesTags: ['projectOrders'],
      query: projectId => {
        return {
          url: `/client/project/orders/${projectId}`,
        };
      },
    }),
    getOtherExpenses: build.query<OrderItem[], number | undefined | string>({
      providesTags: ['otherExpenses'],
      query: projectId => {
        return {
          url: `/client/project/otherExpenses/${projectId}`,
        };
      },
    }),
    addProject: build.mutation<Project, AddClientProject>({
      query: body => {
        return {
          url: '/client/project/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['projects', 'projectsForPicker', 'otherExpenses', 'clients'],
    }),
    editProject: build.mutation<Project, {id: number; body: AddClientProject;}>({
      query: ({id, body}) => {
        return {
          url: `/client/project/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'projects', id: arg.id},
        'projectsForPicker',
        'clients',
        'otherExpenses',
      ],
    }),
    deleteProject: build.mutation<undefined, {Ids: number[], softDelete: boolean;}>({
      query: body => {
        return {
          url: `/client/project/delete`,
          body: body,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        ...arg['Ids'].map(id => ({type: 'projects' as const, id})),
        'projectsForPicker',
        'clients',
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
} = ProjectsApi;
