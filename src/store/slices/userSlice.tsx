import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

// Types
interface User {
    id: string;
    username: string;
    email: string;
    token: string;
    phone: string;
    gender: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
    roles: string;
    ordersCount: string;
}

interface UserState {
    status: string;
    error: string | null;
    user: User;
}

interface APIResponse {
    data: {
        user: User;
        token: string;
        message?: string;
    };
}

interface APIError {
    message: string;
    detail?: string;
}

// Initial State
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
        roles: '',
        ordersCount: '',
    },
};

// Thunks
export const registerUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/signup',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/signup`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const loginUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/signin',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/signin`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

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
                roles: '',
                ordersCount: '',
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
                    ...action.payload.data.user,
                    token: action.payload.data.token,
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
                state.status = 'succeeded';
                state.error = action.payload.data.message || null;
                state.user = {
                    ...action.payload.data.user,
                    token: action.payload.data.token,
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to login';
            });
    },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
