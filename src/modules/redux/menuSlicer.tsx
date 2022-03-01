import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    expanded: boolean;
}

const initialState = { expanded: false } as MenuState;

const menuSlicer = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        expandMenu: (state) => {
            state.expanded = !state.expanded;
        }
    },
});

export const { expandMenu } = menuSlicer.actions;
export default menuSlicer.reducer;