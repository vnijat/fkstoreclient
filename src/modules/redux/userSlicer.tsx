import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user.type';

interface IUserSlicer {
    user: User | null;
    tokens: {
        accessToken: string,
        refreshToken: string;
    } | null;
}

const initialState = {
    user: null,
    tokens: null
} as IUserSlicer;

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUserSlicer>) => {
            Object.assign(state, action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user ? Object.assign(state.user, action.payload) : state.user = action.payload;
        },
        clearUserData: (state) => {
            state.user = null;
            state.tokens = null;
        }
    },
});

export const {setUserData, clearUserData, updateUser} = userSlicer.actions;
export default userSlicer.reducer;