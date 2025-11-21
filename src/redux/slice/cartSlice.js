import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/cart/list`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    success: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        resetCartState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            // Get Cart Items
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.result || [];
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Gagal mengambil data keranjang';
            })
    }
});

export const { clearError, clearSuccess, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;