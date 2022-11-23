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
      providesTags: ['projects'],
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
      invalidatesTags: ['projects'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
} = ProjectsApi;
