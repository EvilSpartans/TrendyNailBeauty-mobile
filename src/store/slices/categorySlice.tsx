import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Category } from '../../models/category';

// const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const BASE_URL = 'http://localhost:3000/api';

// Types
interface CategoryState {
    status: string;
    error: string | null;
    categories: Category[];
}

interface APIResponse {
  categories: Category[];
}

interface APIError {
    message: string;
    detail?: string;
}

const initialState: CategoryState = {
    status: '',
    error: null,
    categories: [],
};

// Thunks
export const getAllCategories = createAsyncThunk<
  APIResponse,
  Partial<Category>,
  {rejectValue: APIError}
>('api/categories', async (params, {rejectWithValue}) => {
  try {
    const url = `${BASE_URL}/categories`;
    console.log('API Route:', url); // Log de la route API
    const {data} = await axios.get<APIResponse>(url, {params});
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<APIError>;
    return rejectWithValue(
      axiosError.response?.data || {message: 'Unknown error'},
    );
  }
});


// Slice
export const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<APIResponse>) => {
                state.status = 'succeeded';
                state.error = null;
                state.categories = action.payload.categories;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch categories';
            });
    },
});

export const { changeStatus } = categorySlice.actions;
export default categorySlice.reducer;
