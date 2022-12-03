import {AddClient} from '../../types/client';
import {ClientsQueryParams, ClientsResponse} from '../../types/clientsQuery';
import {AddClientProject} from '../../types/project';
import {
  Project,
  ProjectsQueryParams,
  ProjectsResponse,
} from '../../types/projectsQuery';
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
    addProject: build.mutation<Project, AddClientProject>({
      query: body => {
        return {
          url: '/client/project/',
          body: body,
          method: 'POST',
        };
      },
      invalidatesTags: ['projects'],
    }),
    editProject: build.mutation<Project, {id: number; body: AddClientProject}>({
      query: ({id, body}) => {
        return {
          url: `/client/project/${id}`,
          body: body,
          method: 'PATCH',
        };
      },
      invalidatesTags: (result, error, arg) => [{type: 'projects', id: arg.id}],
    }),
    deleteProject: build.mutation<undefined, number[]>({
      query: Ids => {
        return {
          url: `/client/project/delete`,
          body: Ids,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        ...arg.map(id => ({type: 'projects' as const, id})),
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
} = ProjectsApi;
