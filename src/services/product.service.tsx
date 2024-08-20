import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { Product } from "../models/Product";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIError {
    message: string;
    detail?: string;
}

interface ProductQueryParams {
  sortBy?: string;
  [key: string]: any; 
}

interface ProductResponse {
  products: Product[];
  page: number;
  countPage: number;
  totalItems: number;
}

export const getAllProducts = createAsyncThunk<
  ProductResponse,
  ProductQueryParams,
  { rejectValue: APIError }
>('api/products', async (params, { rejectWithValue }) => {
  try {
    const url = `${BASE_URL}/products`;
    // console.log('API Route:', url);
    const { data } = await axios.get<ProductResponse>(url, { params }); 
    // console.log("DATA :", JSON.stringify(data, null, 2)); 
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<APIError>;
    return rejectWithValue(
      axiosError.response?.data || { message: 'Unknown error' },
    );
  }
});
