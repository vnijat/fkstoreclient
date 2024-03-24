import {User} from "../../types/user.type";
import {IUserDataForPost} from "../../views/loginView";
import {InventoryApi} from "./apiSlice";




export const UserApi = InventoryApi.injectEndpoints({
    endpoints: build => ({
        getUser: build.query({
            providesTags: ['user'],
            query: () => ({
                url: '/user'
            })
        }),
        createUserWithMasterPassword: build.mutation<{message: string, status: number;}, IUserDataForPost>({
            query: (body) => ({
                url: '/auth/master/create',
                method: 'POST',
                body
            })
        }),
        loginUser: build.mutation<{tokens: {accessToken: string, refreshToken: string;}; status: number; user: User;}, {email: string, password: string;}>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),
        editUser: build.mutation<{message: string, status: number;}, User>({
            query: (body) => ({
                url: '/user',
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['user'],
        }),
        uploadAvatar: build.mutation<{message: string, status: number;}, FormData>({
            query: (body) => ({
                url: '/user/avatar',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['user'],
        }),
        removeAvatar: build.mutation<{message: string, status: number;}, undefined>({
            query: () => ({
                url: '/user/avatar',
                method: 'DELETE',
            }),
            invalidatesTags: ['user'],
        })
    }),
    overrideExisting: true,
});

export const {
    useLoginUserMutation,
    useGetUserQuery,
    useCreateUserWithMasterPasswordMutation,
    useEditUserMutation,
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
} = UserApi

