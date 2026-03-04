import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IState} from './store';
import {ILang} from '@/i18n/locale';


const initialState: IState = {
    loader: false,
    navMenu: false,
    staticContent: null,
    user: null,
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLoader: (state: IState, action: PayloadAction<boolean>) => {
            state.loader = action.payload;
        },
        toggleNavMenu: (state: IState) => {
            state.navMenu = !state.navMenu;
        },
        setStaticContent: (state: IState, action: PayloadAction<ILang>) => {
            state.staticContent = action.payload;
        },
        setUser: (state: IState, action: PayloadAction<string>) => {
            // state.user = jwtDecode(action.payload);
            state.user = 'user';
        },
    },
});

export const {setLoader, toggleNavMenu, setUser} = rootSlice.actions;

export default rootSlice.reducer;
