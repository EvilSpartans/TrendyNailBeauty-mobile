import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { loginUser, registerUser, updateUser } from '../../services/auth.service';

// Types
interface UserState {
    status: string;
    error: string | null;
    user: User;
}

export interface APIResponse {
    token: string;
    message: string;
    data: User;
}

const initialState: UserState = {
    status: '',
    error: null,
    user: {
        id: '',
        username: '',
        email: '',
        token: '',
        phone: '',
        gender: '',
        street: '',
        zipCode: '',
        city: '',
        country: '',
        roles: [],
        ordersCount: 0,
    },
};

// Slice
export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = '';
            state.error = null;
            state.user = {
                id: '',
                username: '',
                email: '',
                token: '',
                phone: '',
                gender: '',
                street: '',
                zipCode: '',
                city: '',
                country: '',
                roles: [],
                ordersCount: 0,
            };
        },
        changeStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<APIResponse>) => {
                state.status = 'succeeded';
                state.error = null;
                state.user = {
                    ...action.payload.data,
                    token: action.payload.token,
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to register';
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<APIResponse>) => {
                // console.log('Payload:', action.payload);
                state.status = 'succeeded';
                state.error = action.payload.message || null;
                state.user = {
                    ...action.payload.data,
                    token: action.payload.token,
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to login';
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.error = null;
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
                // console.log("État de l'utilisateur mis à jour :", state.user);
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to update user';
            });
    },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
